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
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Pre and post-event cleaning services to ensure your venue is perfectly prepared and spotless.',
    icon: 'calendar'
  },
  {
    id: 'organization',
    name: 'Organization',
    description: 'Professional organizing and tidying services to help declutter and optimize your living space.',
    icon: 'organization'
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

// Public gallery images (served from `frontend/public/Photos/**`).
// Keep these flattened as requested (no folder UI), but paths can include subfolders.
export const localGalleryPaths = [
  'Photos/129 Kitchen_Dining_Front Room/collage_export_53BDF4C1-E0AC-4026-B59B-561BDDB7AB1A.JPG',
  'Photos/129 Bedrooms/collage_export_611624C5-E5EA-4180-84A0-8E3E2AF7F13F.JPG',
  'Photos/100 Move Out/IMG_2693.jpg',
  'Photos/100 Move Out/IMG_2698.jpg',
  'Photos/129 Bathrooms/collage_export_34835E10-DA21-460F-B790-DCBA3EF9A248.JPG',
  'Photos/129 Bathrooms/collage_export_541079D8-E8E6-4561-ACF4-6D7E874CB8CC.JPG',
  'Photos/R3 Bathroom/collage_export_171695D3-CCBB-42A3-A631-6791AC42A06B.JPG',
  'Photos/R3 Bathroom/collage_export_A7B9BC32-22CE-466F-9CEE-9B34C88CA4F3.JPG',
  'Photos/R3 Bathroom/collage_export_F25CE3B2-9F2D-439B-A1AA-8090E45706F7.JPG',
  'Photos/100 Move Out/collage_export_5F81F4C1-4AA4-4426-A09A-06EBB396A959.JPG',
  'Photos/R3 Kitchen/collage_export_3CFDDB39-5104-4850-9202-A0A9C491BFD7.JPG',
  'Photos/129 Kitchen_Dining_Front Room/collage_export_30A723FF-3D6D-4371-90DD-E63F4A115856.JPG',
  'Photos/129 Bedrooms/collage_export_D14BF56A-B1DD-4F38-9857-947DAD1F5C4F.JPG',
  'Photos/R3 Kitchen/collage_export_22296F44-3808-46BB-B994-0CB299019B20.JPG',
  'Photos/129 Bedrooms/collage_export_E0457393-A2B7-4551-B54E-4FE86E04ADB3.JPG',
  'Photos/R3 Kitchen/collage_export_F30B6395-11B7-47ED-9026-D2736B99E085.JPG',
  'Photos/129 Kitchen_Dining_Front Room/collage_export_C96BCEE9-4B93-4839-9203-30B9C14CE5DF.JPG',
  'Photos/R3 Bathroom/collage_export_92190775-5D63-492D-9732-F902259AA381.JPG',
  'Photos/129 Bathrooms/collage_export_61637C50-01E9-4F5F-BECF-1B0C5B3C032E.JPG',
  'Photos/100 Move Out/IMG_2695.jpg',
  'Photos/100 Move Out/collage_export_611ADBC5-0861-41A3-9B2A-2E1827B31EED.JPG',
  'Photos/R3 Bathroom/collage_export_9361A468-F409-48A2-8323-14FFA12B7DA5.JPG',
  'Photos/100 Move Out/IMG_2696.jpg',
  'Photos/R3 Kitchen/collage_export_A86AF4A4-23B5-4CAB-BB37-E5CE99274618.JPG',
  'Photos/R3 Bathroom/collage_export_EC6287F8-5C0F-426E-8C06-747101DF4223.JPG',
  'Photos/R3 Bathroom/collage_export_913505BB-B327-47ED-88BC-BEBF3A2F0A30.JPG',
  'Photos/129 Bathrooms/collage_export_7CBC7233-4E77-4B3B-A368-E8A558244EBF.JPG',
  'Photos/R3 Bathroom/collage_export_F493452C-2211-45FE-8480-914497CC6066.JPG',
  'Photos/100 Move Out/IMG_2697.jpg',
  'Photos/100 Move Out/IMG_8645.jpg',
  'Photos/R3 Bathroom/collage_export_2ECD852D-D39A-412F-A705-A377EEEEB781.JPG'
];

const extractTitleFromUrl = (url) => {
  const fileName = String(url || '').split('/').pop() || '';
  const withoutExt = fileName.replace(/\.[^.]+$/, '');
  const cleaned = withoutExt.replace(/_[a-z0-9]+$/i, '').replace(/_/g, ' ').trim();
  return cleaned || 'Gallery Image';
};

export const fullGalleryItems = localGalleryPaths.map((path, index) => {
  const normalized = String(path).replace(/\\/g, '/').replace(/^\/+/, '');
  const publicSrc = `/${encodeURI(normalized)}`;
  const title = extractTitleFromUrl(normalized);
  return {
    id: `local-${index + 1}`,
    src: publicSrc,
    alt: title,
    title,
    tag: 'Our Work'
  };
});
