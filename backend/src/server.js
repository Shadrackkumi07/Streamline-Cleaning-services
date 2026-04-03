import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';

// Multer loaded via createRequire so it works with ES modules and multer 1.x
const require = createRequire(import.meta.url);
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

const frontendOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const adminToken = process.env.ADMIN_TOKEN || '';

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || frontendOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    }
  })
);
app.use(express.json({ limit: '50kb' }));

// -- Zoho Mail Secrets --
const required = [
  'ZOHO_CLIENT_ID',
  'ZOHO_CLIENT_SECRET',
  'ZOHO_REFRESH_TOKEN',
  'ZOHO_ACCOUNT_ID',
  'ZOHO_FROM_ADDRESS',
  'ZOHO_TO_ADDRESS'
];
const hasAllSecrets = required.every((key) => Boolean(process.env[key]));

// -- Helpers --
const sanitize = (value) =>
  String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

const formatPhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '').slice(-10);
  if (digits.length !== 10) return value || '';
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const requireAdmin = (req, res, next) => {
  const provided = req.headers['x-admin-token'];
  if (
    !adminToken ||
    !provided ||
    provided.length !== adminToken.length ||
    !crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(adminToken))
  ) {
    res.status(403).json({ error: 'Unauthorized.' });
    return;
  }
  next();
};

// -- Reviews File --
const reviewsFile = path.join(process.cwd(), 'data', 'reviews.json');

async function ensureReviewsFile() {
  try {
    await fs.access(reviewsFile);
  } catch {
    await fs.mkdir(path.dirname(reviewsFile), { recursive: true });
    await fs.writeFile(reviewsFile, JSON.stringify({ reviews: [] }, null, 2));
  }
}

async function readReviews() {
  await ensureReviewsFile();
  const content = await fs.readFile(reviewsFile, 'utf8');
  const parsed = JSON.parse(content || '{}');
  return Array.isArray(parsed.reviews) ? parsed.reviews : [];
}

async function writeReviews(reviews) {
  await fs.writeFile(reviewsFile, JSON.stringify({ reviews }, null, 2));
}

// -- Image Upload (multer) --
const uploadsDir = path.join(process.cwd(), 'data', 'uploads');

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (_req, file, cb) => {
    // Sanitize original name and prefix with a collision-safe random hex
    const safeName = file.originalname
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.{2,}/g, '_')
      .slice(0, 80);
    const unique = crypto.randomBytes(6).toString('hex');
    cb(null, `${unique}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE, files: 10 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed.'));
    }
  }
});

// Serve uploaded images as static files
app.use('/images/uploads', express.static(uploadsDir));

// -- Zoho Mail --
async function getAccessToken() {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token'
  });

  const response = await fetch(`https://accounts.zoho.com/oauth/v2/token?${params.toString()}`, {
    method: 'POST'
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Zoho token error: ${text}`);
  }
  return (await response.json()).access_token;
}

async function sendZohoMail({ subject, htmlContent }) {
  const accessToken = await getAccessToken();
  const payload = {
    fromAddress: process.env.ZOHO_FROM_ADDRESS,
    toAddress: process.env.ZOHO_TO_ADDRESS,
    subject,
    content: htmlContent
  };

  const response = await fetch(
    `https://mail.zoho.com/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );
  if (!response.ok) {
    const text = await response.text();
    console.error('Zoho mail error:', text);
    throw new Error(`Zoho mail error: ${text}`);
  }
  return response.json();
}

// -- Routes --

app.get('/health', (_req, res) => {
  res.json({ ok: true, mailConfigured: hasAllSecrets });
});

app.get('/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// -- Admin Auth (server-side passcode verification) --
app.post('/admin/verify', (req, res) => {
  const { passcode } = req.body || {};
  if (!adminToken || !passcode || String(passcode) !== adminToken) {
    // Use consistent delay to prevent timing attacks
    setTimeout(() => res.status(403).json({ error: 'Invalid passcode.' }), 300);
    return;
  }
  res.json({ ok: true });
});

// -- Reviews CRUD actions --
app.get('/reviews', async (_req, res) => {
  try {
    const reviews = await readReviews();
    res.json({ reviews });
  } catch {
    res.status(500).json({ error: 'Failed to load reviews.' });
  }
});

app.post('/reviews', async (req, res) => {
  const { name, rating, text, service } = req.body || {};
  if (!name || !rating || !text || !service) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const parsedRating = Math.min(Math.max(Number(rating), 1), 5);
  if (!Number.isFinite(parsedRating)) {
    res.status(400).json({ error: 'Invalid rating.' });
    return;
  }

  const entry = {
    id: Date.now(),
    name: sanitize(name).slice(0, 80),
    rating: parsedRating,
    text: sanitize(text).slice(0, 800),
    service: sanitize(service).slice(0, 80),
    date: new Date().toISOString().slice(0, 10),
    source: 'user'
  };

  try {
    const reviews = await readReviews();
    reviews.unshift(entry);
    await writeReviews(reviews);
    res.json({ ok: true, review: entry });
  } catch {
    res.status(500).json({ error: 'Failed to save review.' });
  }
});

app.delete('/reviews/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) { res.status(400).json({ error: 'Invalid id.' }); return; }
  try {
    const reviews = await readReviews();
    await writeReviews(reviews.filter((r) => r.id !== id));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete review.' });
  }
});

app.delete('/reviews', requireAdmin, async (_req, res) => {
  try {
    const reviews = await readReviews();
    await writeReviews(reviews.filter((r) => r.source !== 'user'));
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to clear reviews.' });
  }
});

// -- Image Endpoints --

// List all uploaded images
app.get('/images', async (_req, res) => {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    const files = await fs.readdir(uploadsDir);
    const images = files
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .map((f) => ({ filename: f, url: `/images/uploads/${f}` }));
    res.json({ images });
  } catch {
    res.status(500).json({ error: 'Failed to list images.' });
  }
});

// Upload images (admin only)
app.post('/images', requireAdmin, (req, res) => {
  upload.array('images', 10)(req, res, (err) => {
    if (err) {
      const msg = err.message || 'Upload failed.';
      res.status(400).json({ error: msg });
      return;
    }
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ error: 'No files uploaded.' });
      return;
    }
    const uploaded = req.files.map((f) => ({
      filename: f.filename,
      url: `/images/uploads/${f.filename}`
    }));
    res.json({ ok: true, uploaded });
  });
});

// Delete a single uploaded image (admin only)
app.delete('/images/:filename', requireAdmin, async (req, res) => {
  // Prevent path traversal - filename must match safe pattern
  const safe = req.params.filename.replace(/[^a-zA-Z0-9._-]/g, '');
  if (safe !== req.params.filename || safe.includes('..')) {
    res.status(400).json({ error: 'Invalid filename.' });
    return;
  }
  const filePath = path.join(uploadsDir, safe);
  // Confirm the resolved path is still under uploadsDir
  if (!filePath.startsWith(uploadsDir + path.sep) && filePath !== uploadsDir) {
    res.status(400).json({ error: 'Invalid filename.' });
    return;
  }
  try {
    await fs.unlink(filePath);
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: 'File not found.' });
  }
});

// -- Booking Notification Email --

function buildBookingEmail(d) {
  const addOnsHtml = d.addOns.length
    ? d.addOns.map(a =>
        `<span style="display:inline-block;background:#fce7f3;color:#ec4899;padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:700;margin:3px 4px 3px 0">${a}</span>`
      ).join('')
    : `<span style="color:#9ca3af;font-size:13px;font-style:italic">None selected</span>`;

  const notesSection = d.notes ? `
      <tr>
        <td style="padding:0 40px 24px;">
          <div style="background:#fffbeb;border-radius:12px;padding:20px 24px;border-left:4px solid #f59e0b;">
            <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#d97706;margin-bottom:10px;">Special Notes</div>
            <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${d.notes}</p>
          </div>
        </td>
      </tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

  <!-- Header -->
  <tr>
    <td style="background:#1f2937;padding:36px 40px;text-align:center;">
      <div style="font-size:26px;font-weight:900;letter-spacing:0.15em;color:#ffffff;line-height:1;">STREAMLINE</div>
      <div style="font-size:10px;letter-spacing:0.2em;color:#f472b6;font-weight:700;margin-top:6px;text-transform:uppercase;">Clean Spaces, Clear Minds.</div>
    </td>
  </tr>

  <!-- Gradient accent bar -->
  <tr><td style="height:4px;background:linear-gradient(90deg,#f472b6 0%,#ec4899 100%);"></td></tr>

  <!-- Title row -->
  <tr>
    <td style="padding:32px 40px 20px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td>
            <div style="font-size:22px;font-weight:900;color:#1f2937;line-height:1.2;">New Booking Request</div>
            <div style="margin-top:6px;color:#9ca3af;font-size:13px;">Submitted ${d.submittedAt}</div>
          </td>
          <td align="right" style="vertical-align:top;">
            <div style="display:inline-block;background:#fce7f3;color:#ec4899;padding:6px 14px;border-radius:9999px;font-size:12px;font-weight:700;white-space:nowrap;">${d.frequency}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Customer Information -->
  <tr>
    <td style="padding:0 40px 20px;">
      <div style="background:#fdf2f8;border-radius:12px;padding:22px 24px;border-left:4px solid #f472b6;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#ec4899;margin-bottom:14px;">Customer Information</div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:5px 0;font-size:13px;color:#9ca3af;width:110px;font-weight:600;">Name</td>
            <td style="padding:5px 0;font-size:15px;font-weight:700;color:#1f2937;">${d.name}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;font-size:13px;color:#9ca3af;font-weight:600;">Email</td>
            <td style="padding:5px 0;font-size:14px;font-weight:700;">
              <a href="mailto:${d.email}" style="color:#ec4899;text-decoration:none;">${d.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:5px 0;font-size:13px;color:#9ca3af;font-weight:600;">Phone</td>
            <td style="padding:5px 0;font-size:14px;font-weight:700;color:#1f2937;">${d.phone}</td>
          </tr>
        </table>
      </div>
    </td>
  </tr>

  <!-- Service Type Banner -->
  <tr>
    <td style="padding:0 40px 20px;">
      <div style="background:#1f2937;border-radius:12px;padding:18px 24px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;margin-bottom:4px;">Service Type</div>
        <div style="font-size:22px;font-weight:900;color:#f472b6;">${d.service}</div>
      </div>
    </td>
  </tr>

  <!-- Home Details Stats Grid -->
  <tr>
    <td style="padding:0 40px 20px;">
      <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin-bottom:10px;">Home Details</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="25%" style="padding-right:6px;vertical-align:top;">
            <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:14px 10px;text-align:center;">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:4px;">SQ FT</div>
              <div style="font-size:22px;font-weight:900;color:#f472b6;line-height:1.2;">${Number(d.sqft).toLocaleString()}</div>
            </div>
          </td>
          <td width="25%" style="padding:0 3px;vertical-align:top;">
            <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:14px 10px;text-align:center;">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:4px;">BEDS</div>
              <div style="font-size:22px;font-weight:900;color:#f472b6;line-height:1.2;">${d.beds}</div>
            </div>
          </td>
          <td width="25%" style="padding:0 3px;vertical-align:top;">
            <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:14px 10px;text-align:center;">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:4px;">BATHS</div>
              <div style="font-size:22px;font-weight:900;color:#f472b6;line-height:1.2;">${d.baths}</div>
            </div>
          </td>
          <td width="25%" style="padding-left:6px;vertical-align:top;">
            <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:14px 10px;text-align:center;">
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin-bottom:4px;">FLOORS</div>
              <div style="font-size:22px;font-weight:900;color:#f472b6;line-height:1.2;">${d.floors}</div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Add-ons -->
  <tr>
    <td style="padding:0 40px 20px;">
      <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:12px;padding:18px 24px;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin-bottom:10px;">Add-Ons Selected</div>
        <div>${addOnsHtml}</div>
      </div>
    </td>
  </tr>

  <!-- Notes (conditional) -->
  ${notesSection}

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 40px;text-align:center;">
      <div style="font-size:12px;color:#9ca3af;line-height:1.6;">
        Sent automatically by the Streamline Cleaning Services booking form.<br/>
        Reply directly to <a href="mailto:${d.email}" style="color:#ec4899;text-decoration:none;">${d.email}</a>
      </div>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

app.post('/booking', async (req, res) => {
  const { firstName, lastName, email, phone, service, squareFootage, bedrooms, bathrooms, floors, frequency, addOns, notes } = req.body || {};

  if (!firstName || !lastName || !email || !phone || !service) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  const name = `${sanitize(firstName)} ${sanitize(lastName)}`.trim().slice(0, 100);
  const safeEmail = sanitize(email).toLowerCase().slice(0, 200);
  const safePhone = sanitize(phone).slice(0, 30);
  const safeService = sanitize(service).slice(0, 80);
  const safeSqft = Math.min(50000, Math.max(0, Number(squareFootage) || 0));
  const safeBeds = Math.min(20, Math.max(0, Number(bedrooms) || 0));
  const safeBaths = Math.min(20, Math.max(0, Number(bathrooms) || 0));
  const safeFloors = Math.min(10, Math.max(0, Number(floors) || 0));
  const safeFrequency = sanitize(frequency || 'One-Time Visit').slice(0, 50);
  const safeAddOns = Array.isArray(addOns)
    ? addOns.map(a => sanitize(String(a)).slice(0, 50)).filter(Boolean).slice(0, 10)
    : [];
  const safeNotes = sanitize(notes || '').slice(0, 800);

  const submittedAt = new Date().toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
  });

  if (!hasAllSecrets) {
    console.log('Booking received (Zoho mail not configured):', { name, safeEmail, safeService });
    res.json({ ok: true });
    return;
  }

  try {
    await sendZohoMail({
      subject: `New Booking – ${safeService} – ${name}`,
      htmlContent: buildBookingEmail({
        name, email: safeEmail, phone: safePhone,
        service: safeService, sqft: safeSqft, beds: safeBeds,
        baths: safeBaths, floors: safeFloors, frequency: safeFrequency,
        addOns: safeAddOns, notes: safeNotes, submittedAt
      })
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Booking email failed:', err.message);
    // Always return ok so the booking flow is never blocked by an email failure
    res.json({ ok: true, warning: 'Notification email could not be sent.' });
  }
});

// -- Contact Form --
app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body || {};
  if (!firstName || !lastName || !email || !message) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }
  if (!hasAllSecrets) {
    res.status(500).json({ error: 'Zoho mail is not configured on the server.' });
    return;
  }

  const safeName = `${sanitize(firstName)} ${sanitize(lastName)}`.trim().slice(0, 100);
  const safeEmail = sanitize(email).toLowerCase().slice(0, 200);
  const safeMessage = sanitize(message).slice(0, 2000);
  const submittedAt = new Date().toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  try {
    await sendZohoMail({
      subject: 'New Contact Message - Streamline Cleaning Services',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; color: #1f2937;">
          <h2 style="margin: 0 0 12px; color: #ec4899;">Contact Form Submission</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 520px;">
            <tr><td style="padding: 6px 0; font-weight: 600;">Name</td><td>${safeName}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Email</td><td>${safeEmail}</td></tr>
          </table>
          <div style="margin-top: 12px;">
            <div style="font-weight: 600; margin-bottom: 6px;">Message</div>
            <p style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">${safeMessage}</p>
          </div>
          <div style="margin-top: 12px; font-size: 12px; color: #6b7280;">Submitted ${submittedAt}</div>
        </div>
      `
    });
    res.json({ ok: true, message: 'Contact message sent.' });
  } catch (error) {
    console.error('Contact submission failed:', error.message);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// -- Start --
app.listen(port, () => {
  console.log(`Streamline backend running on port ${port}`);
});
