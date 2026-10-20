export type Product = {
  slug: string;
  name: string;
  price: number;
  was?: number;
  image: string;
};

export const products: Product[] = [
  { slug: "nidek-handyref-k-and-handyref-handheld-refractometer", name: "Nidek HandyRef-K and HandyRef Handheld Refractometer", price: 3456, was: 5678, image: "Nidek-HandyRef-K-and-HandyRef-a-300x300.jpg" },
  { slug: "tomey-oa-2000-optical-biometer", name: "Tomey OA-2000 Optical Biometer", price: 2150, image: "tomey-oa-2000-a-300x300.jpg" },
  { slug: "zeiss-iolmaster-700-swept-source-oct", name: "ZEISS IOLMaster 700 SWEPT Source OCT", price: 25999, image: "Zeiss-IOL-Master-700-for-sale-9.jpg" },
  { slug: "topcon-cl300-lensmeter", name: "Topcon CL300 Lensmeter", price: 2200, image: "topcon-computerized-lensmeter-cl-300-300x300.jpg" },
  { slug: "zeiss-opmi-lumera-700-surgical-microscope", name: "Zeiss OPMI LUMERA 700 Surgical Microscope", price: 11999, was: 21999, image: "OPMI-LUMERA-700-300x300.jpeg" },
  { slug: "oculus-pentacam-axl-corneal-topography", name: "OCULUS Pentacam AXL Corneal Topography", price: 10799, was: 19799, image: "Pentacam-AXL-300x300.jpeg" },
  { slug: "soct-copernicus-revo-with-angio-oct", name: "SOCT Copernicus REVO with Angio OCT", price: 9000, was: 17900, image: "copernicus-revo-300x300.jpg" },
  { slug: "topcon-3d-oct-1-maestro2-robotic-oct-and-fundus-camera", name: "Topcon 3D OCT-1 Maestro2 Robotic OCT and Fundus Camera", price: 15999, was: 25999, image: "Topcon-Maestro2-300x300.jpeg" },
  { slug: "heidelberg-hrt-3-tomograph", name: "Heidelberg hrt 3 Tomograph", price: 2222, was: 6666, image: "Heidelberg-hrt-3-price-300x300.jpg" },
  { slug: "topcon-kr-1-automatic-keratometer-refractometer", name: "TOPCON KR-1 Automatic Keratometer Refractometer", price: 4999, image: "Topcon-KR-1-Auto-Refractor-Keratometer-300x300.jpg" },
  { slug: "oculus-pentacam-hr", name: "OCULUS Pentacam HR", price: 14999, was: 19999, image: "OCULUS_PENTACAM_HR_FOR_SALE_1.png" },
  { slug: "zeiss-iolmaster-500-optical-biometer", name: "ZEISS IOLMaster 500 Optical Biometer", price: 8777, was: 17777, image: "IOLMaster-500-300x300.png" },
  { slug: "reichert-ipac-handheld-pachymeter", name: "Reichert iPac Handheld Pachymeter", price: 2145, was: 2645, image: "Reichert-iPac-Handheld-Pachymeter--300x300.jpeg" },
  { slug: "topcon-3d-oct-2000-optical-coherence-tomography", name: "Topcon 3D OCT 2000 Optical Coherence Tomography", price: 7500, was: 12500, image: "Topcon-3D-OCT-2000-300x300.jpg" },
  { slug: "tracey-itrace-wavefront-aberrometer-and-corneal-topography", name: "Tracey iTrace Wavefront Aberrometer and Corneal Topography", price: 6999, was: 9999, image: "Tracey-iTrace-300x300.jpg" },
  { slug: "topcon-dri-oct-triton-swept-source-oct", name: "Topcon DRI OCT Triton Swept source OCT", price: 12900, was: 22900, image: "Topcon-DRI-OCT-Triton-300x300.png" },
  { slug: "carl-zeiss-humphrey-fdt", name: "Carl Zeiss Humphrey FDT", price: 4950, was: 7950, image: "Zeiss-Humphrey-FDT.png" },
  { slug: "topcon-kr-1-automatic-keratometer-refractometer-home", name: "TOPCON KR-1 Automatic Keratometer Refractometer", price: 4999, image: "Topcon-KR-1-Auto-Refractor-Keratometer-300x300.jpg" },
  { slug: "optovue-iscan-automated-oct-system", name: "OPTOVUE iScan Automated OCT System", price: 12000, was: 22000, image: "OPTOVUE-iScan-300x300.jpg" },
  { slug: "tomey-al-100-a-scan-biometer", name: "Tomey AL-100 A-Scan Biometer", price: 3295, image: "tomey-al-100.png" },
  { slug: "zeiss-atlas-9000-corneal-topographer", name: "Zeiss Atlas 9000 Corneal Topographer", price: 6666, was: 9999, image: "Zeiss-Atlas-9000-300x300.jpg" },
  { slug: "tomey-tms-5-corneal-topographer", name: "TOMEY TMS-5 Corneal Topographer", price: 3999, was: 13999, image: "Tomey-TMS-5-300x300.jpg" },
  { slug: "canon-cx-1-hybrid-retinal-camera", name: "Canon CX-1 Hybrid Retinal Camera", price: 10999, was: 16999, image: "CX-1-Hybrid-Digital-Mydriatic-300x300.jpg" },
  { slug: "topcon-3d-oct-1-maestro", name: "Topcon 3D OCT-1 Maestro", price: 19999, was: 35999, image: "topcon-3d-oct-1-maestro-for-sale-300x300.jpg" },
  { slug: "tomey-casia-2-anterior-segment-oct", name: "Tomey Casia 2 Anterior Segment OCT", price: 4600, was: 8600, image: "Tomey-casia-2.jpg" },
  { slug: "zeiss-cirrus-5000-optical-coherence-tomography", name: "Zeiss Cirrus 5000 Optical Coherence Tomography (OCT)", price: 12999, was: 25999, image: "CIRRUS-HD-OCT-5000-500-300x300.jpg" },
  { slug: "nidek-marco-opd-scan-iii-corneal-topographer", name: "Nidek Marco OPD Scan III Corneal Topographer", price: 9999, was: 16999, image: "OPD-Scan-III-300x300.png" },
];

export const discountSlugs = [
  "canon-cx-1-hybrid-retinal-camera",
  "topcon-3d-oct-1-maestro",
  "tomey-casia-2-anterior-segment-oct",
  "nidek-handyref-k-and-handyref-handheld-refractometer",
  "zeiss-cirrus-5000-optical-coherence-tomography",
  "nidek-marco-opd-scan-iii-corneal-topographer",
];

export const featuredSlugs = [
  "carl-zeiss-humphrey-fdt",
  "topcon-kr-1-automatic-keratometer-refractometer-home",
  "optovue-iscan-automated-oct-system",
  "tomey-al-100-a-scan-biometer",
  "heidelberg-hrt-3-tomograph",
  "zeiss-iolmaster-700-swept-source-oct",
  "tomey-oa-2000-optical-biometer",
  "zeiss-atlas-9000-corneal-topographer",
  "tomey-tms-5-corneal-topographer",
];

export const articles = [
  { title: "5 Major Challenges In Ophthalmology In Developing Countries", date: "October 13, 2022", image: "Ophthalmology-In-Developing-Countries.jpeg", category: "Ophthalmology" },
  { title: "How Coronavirus COVID-19 Can Impact Optical Practices", date: "March 25, 2020", image: "coronavirus-1024x683.jpeg", category: "Optical Practices" },
  { title: "How to Choose the Right OCT Machine for Ophthalmologist", date: "April 5, 2019", image: "oct-machine-1024x683.jpg", category: "Equipment" },
  { title: "Revealing the Retina with Optometry Corneal Topography Machines", date: "February 12, 2019", image: "Corneal-topography-1024x681.jpg", category: "Equipment" },
];

export const formatPrice = (price: number) => `$${price.toLocaleString("en-US")}`;
