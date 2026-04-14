export const services = [
  {
    id: 'standard',
    name: 'Standard Clean',
    description: 'Regular maintenance cleaning covering all main living areas, bathrooms, and kitchen surfaces. Perfect for weekly or bi-weekly visits.',
    icon: 'broom'
  },
  {
    id: 'deep',
    name: 'Deep Clean',
    description: 'A thorough top-to-bottom clean including inside appliances, baseboards, window sills, and all hard-to-reach areas.',
    icon: 'sparkles'
  },
  {
    id: 'move',
    name: 'Move-In / Move-Out',
    description: 'Get your old home sparkling for the next owners, or arrive to a fresh clean space. Includes full appliance and cabinet cleaning.',
    icon: 'box'
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'Office and commercial space cleaning tailored to your business hours. Flexible scheduling including evenings and weekends.',
    icon: 'building'
  }
];

export const addOns = [
  'Inside Fridge',
  'Inside Oven',
  'Laundry',
  'Window Washing'
];

export const homeSizes = [
  'Studio / 1BR',
  '2 Bedroom',
  '3 Bedroom',
  '4+ Bedroom'
];

export const beforeAfterCases = [
  {
    id: 'case-1',
    title: 'Case 1',
    before: [
      {
        id: 'case-1-before-1',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170740/IMG_0644_w2cjl0.jpg',
        alt: 'Before cleaning image 1',
        title: 'Case 1 - Before',
        tag: 'Before'
      },
      {
        id: 'case-1-before-2',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170740/IMG_0642_cds8lr.jpg',
        alt: 'Before cleaning image 2',
        title: 'Case 1 - Before',
        tag: 'Before'
      }
    ],
    after: [
      {
        id: 'case-1-after-1',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170741/IMG_0702_jdyt3h.jpg',
        alt: 'After cleaning image 1',
        title: 'Case 1 - After',
        tag: 'After'
      },
      {
        id: 'case-1-after-2',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170741/IMG_0676_uidein.jpg',
        alt: 'After cleaning image 2',
        title: 'Case 1 - After',
        tag: 'After'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Case 2',
    before: [
      {
        id: 'case-2-before-1',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170735/IMG_8670_bjuyue.jpg',
        alt: 'Before cleaning image 4',
        title: 'Case 2 - Before',
        tag: 'Before'
      }
    ],
    after: [
      {
        id: 'case-2-after-1',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_8695_f7yrt7.jpg',
        alt: 'After cleaning image 3',
        title: 'Case 2 - After',
        tag: 'After'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Case 3',
    before: [
      {
        id: 'case-3-before-1',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170738/IMG_0717_pf3igw.jpg',
        alt: 'Before cleaning image 5',
        title: 'Case 3 - Before',
        tag: 'Before'
      }
    ],
    after: [
      {
        id: 'case-3-after-1',
        src: 'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170738/IMG_0716_qtldkk.jpg',
        alt: 'After cleaning image 5',
        title: 'Case 3 - After',
        tag: 'After'
      }
    ]
  }
];

const featuredBeforeAfterUrls = new Set(
  beforeAfterCases.flatMap((c) => [...c.before, ...c.after].map((img) => img.src))
);

// Add every Cloudinary folder URL below. Featured before/after URLs are excluded automatically.
export const cloudinaryFolderUrls = [
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170729/IMG_0541_rtalmb.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170730/IMG_0548_k8syxw.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170730/IMG_0550_fuprqu.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170730/IMG_0551_mujsd0.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170730/IMG_0552_sxt9ae.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170730/IMG_0556_ljrkg1.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170730/IMG_0557_tuic1p.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0463_nc6mkr.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0467_kupbqt.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0468_cr4y6c.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0474_pidzxe.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0519_p6tlct.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0520_b4yo6w.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0521_jixcqd.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170731/IMG_0558_xvlmsl.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170733/IMG_0522_onl9hh.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_0440_d9otrt.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_0454_ghj05r.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_0476_lzw2gm.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_2696_o6zxgq.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_2697_fy0zuw.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170734/IMG_2698_vggaep.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170735/IMG_8670_bjuyue.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170735/IMG_8693_nngnvv.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_2693_onvjsn.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_8695_f7yrt7.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_9280_x21n7l.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_9282_k7h3oc.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170736/IMG_9284_ss1ngl.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170737/IMG_0710_kdkqch.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170737/IMG_2695_mdcpi3.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170737/IMG_9283_mu3ovo.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170737/IMG_9286_osstx9.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170738/IMG_0713_epb1dj.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170738/IMG_0716_qtldkk.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170738/IMG_0717_pf3igw.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170740/IMG_0642_cds8lr.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170740/IMG_0644_w2cjl0.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170741/IMG_0676_uidein.jpg',
  'https://res.cloudinary.com/dfeedwjpf/image/upload/v1776170741/IMG_0702_jdyt3h.jpg'
];

const extractTitleFromUrl = (url) => {
  const fileName = String(url || '').split('/').pop() || '';
  const withoutExt = fileName.replace(/\.[^.]+$/, '');
  const cleaned = withoutExt.replace(/_[a-z0-9]+$/i, '').replace(/_/g, ' ').trim();
  return cleaned || 'Gallery Image';
};

export const fullGalleryItems = cloudinaryFolderUrls
  .filter((src) => !featuredBeforeAfterUrls.has(src))
  .map((src, index) => ({
    id: `folder-${index + 1}`,
    src,
    alt: extractTitleFromUrl(src),
    title: extractTitleFromUrl(src),
    tag: 'Our Work'
  }));

// Backward-compatible flattened list for components expecting galleryItems.
export const galleryItems = beforeAfterCases.flatMap((c) => [...c.before, ...c.after]);
