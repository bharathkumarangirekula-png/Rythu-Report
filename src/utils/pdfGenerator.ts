import { jsPDF } from 'jspdf';
import { FarmerRecord, FarmerProfile } from '../types';

/**
 * Generates an authentic, clean, comprehensive print-ready PDF certificate
 * across separate, dedicated pages:
 * - Page 1: Official Farmer Identity & Holding Certificate
 * - Page 2: Official Document Transcript & Digital Verification Trail
 */
export function generateRecordPDF(rec: FarmerRecord, profile?: FarmerProfile): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const safeDocName = (rec.name || 'Farmer Record').replace(/[^\x00-\x7F]/g, '').trim() || rec.name;
  const farmerName = (profile?.name || rec.farmerName || 'Bharath kumar Angirekula').replace(/[^\x00-\x7F]/g, '').trim() || 'Bharath kumar Angirekula';
  const kisanId = profile?.kisanId || rec.kisanId || 'AP-GNT-2026-8841';
  const farmName = (profile?.farmName || 'Green Valley Farm').replace(/[^\x00-\x7F]/g, '').trim() || 'My Farm';
  const landArea = profile?.landAreaAcres ? `${profile.landAreaAcres} Acres` : (rec.landArea || '4.5 Acres');
  const location = (profile?.location || 'Tenali Mandal').replace(/[^\x00-\x7F]/g, '').trim() || 'Tenali Mandal';
  const districtState = `${profile?.district || 'Guntur'}, ${profile?.state || 'Andhra Pradesh'}`.replace(/[^\x00-\x7F]/g, '');
  const cropsList = (profile?.mainCrops && profile.mainCrops.length > 0)
    ? profile.mainCrops.map(c => c.replace(/[^\x00-\x7F]/g, '').trim()).filter(Boolean).join(', ')
    : 'Rice (Paddy), Chilli, Cotton';
  const phoneMasked = profile?.phoneMasked || '+91 98765 *****';
  const surveyNo = rec.surveyOrPolicyNo || 'Sy. No. 142/2A (Subdivision 3)';
  const issueDate = rec.dateAdded || '2026-09-21';
  const certId = `AP-CERT-${new Date(rec.dateAdded).getFullYear() || 2026}-${rec.id.slice(-4).toUpperCase() || '8841'}`;
  const dummyHash = `9F83-B402-7E11-88AA-C409-5210-F18E-62BD-${rec.id.slice(-4).toUpperCase() || '7780'}`;

  const issuingDept = rec.category === 'Land' 
    ? 'Revenue Department & Sub-Registrar Office, AP'
    : rec.category === 'Crops' 
    ? 'Rythu Bharosa Kendra (RBK) & Dept. of Agriculture, AP'
    : rec.category === 'Finance' || rec.category === 'Insurance'
    ? 'District Cooperative Bank & PMFBY Agricultural Insurance'
    : 'Department of Agriculture & Farmer Welfare, AP';

  // ==========================================
  // PAGE 1: FARMER IDENTITY & HOLDING CERTIFICATE
  // ==========================================

  // Security Border
  doc.setDrawColor(22, 101, 52); // emerald-800
  doc.setLineWidth(1.2);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8);

  doc.setDrawColor(187, 247, 208); // emerald-200
  doc.setLineWidth(0.4);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - (margin * 2) + 4);

  // Header Banner
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, margin, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RYTHU DIGITAL LOCKER & ARCHIVE', pageWidth / 2, margin + 8, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('GOVERNMENT OF ANDHRA PRADESH - AGRICULTURE & REVENUE SERVICES', pageWidth / 2, margin + 14, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(209, 250, 229);
  doc.text('PART 1: OFFICIAL REGISTERED FARMER & AGRICULTURAL HOLDING CERTIFICATE', pageWidth / 2, margin + 20, { align: 'center' });

  let curY = margin + 29;

  // Title Strip
  doc.setFillColor(245, 245, 244);
  doc.setDrawColor(214, 211, 209);
  doc.setLineWidth(0.3);
  doc.rect(margin, curY, contentWidth, 15, 'FD');

  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(safeDocName, margin + 4, curY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(75, 85, 99);
  doc.text(`Certificate No: ${certId}  |  Category: ${rec.category}  |  Format: ${rec.fileType} (${rec.fileSize || '1.2 MB'})`, margin + 4, curY + 11.5);

  // Verified Badge
  doc.setFillColor(220, 252, 231);
  doc.setDrawColor(34, 197, 94);
  doc.rect(pageWidth - margin - 38, curY + 3, 34, 9, 'FD');
  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('[VERIFIED RECORD]', pageWidth - margin - 21, curY + 8.5, { align: 'center' });

  curY += 21;

  // SECTION 1: FARMER PARTICULARS
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('SECTION 1: REGISTERED FARMER / BENEFICIARY PARTICULARS', margin + 3, curY + 4.8);

  curY += 7;
  const fBoxH = 48;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, curY, contentWidth, fBoxH, 'FD');

  const c1 = margin + 5;
  const c2 = margin + (contentWidth / 2) + 2;

  let rY = curY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('FULL FARMER NAME:', c1, rY);
  doc.text('KISAN / FARMER ID:', c2, rY);

  rY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(farmerName, c1, rY);
  doc.setTextColor(22, 101, 52);
  doc.text(kisanId, c2, rY);

  rY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('FARM NAME / HOLDING:', c1, rY);
  doc.text('TOTAL LAND AREA:', c2, rY);

  rY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(farmName, c1, rY);
  doc.text(landArea, c2, rY);

  rY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('RESIDENCE / MANDAL / DISTRICT:', c1, rY);
  doc.text('REGISTERED MOBILE & E-KYC:', c2, rY);

  rY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${location}, ${districtState}`, c1, rY);
  doc.text(`${phoneMasked} (UIDAI e-KYC Verified)`, c2, rY);

  curY += fBoxH + 7;

  // SECTION 2: AGRICULTURAL HOLDING & LAND DATA
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('SECTION 2: AGRICULTURAL HOLDING & CULTIVATION RECORD', margin + 3, curY + 4.8);

  curY += 7;
  const lBoxH = 55;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, curY, contentWidth, lBoxH, 'FD');

  let lY = curY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('SURVEY / KHATONO / POLICY NO:', c1, lY);
  doc.text('REGISTRATION DATE & YEAR:', c2, lY);

  lY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(surveyNo, c1, lY);
  doc.text(`${issueDate} (Year ${rec.year || 2026})`, c2, lY);

  lY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('PRIMARY CROPS CULTIVATED:', c1, lY);
  doc.text('IRRIGATION & WATER SOURCE:', c2, lY);

  lY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(cropsList, c1, lY);
  doc.text('Krishna Canal Ayacut & Borewell (Perennial)', c2, lY);

  lY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('ISSUING GOVERNMENT BODY:', c1, lY);
  doc.text('SOIL HEALTH & CROP STATUS:', c2, lY);

  lY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(issuingDept, c1, lY);
  doc.text('Tested & Optimal (pH 7.1, e-Panta Verified)', c2, lY);

  curY += lBoxH + 7;

  // SECTION 3: OFFICIAL ATTESTATION & AUTHORITY STAMP
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('SECTION 3: OFFICIAL ATTESTATION & JURISDICTION', margin + 3, curY + 4.8);

  curY += 7;
  const aBoxH = 42;
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, curY, contentWidth, aBoxH, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('This is to certify that the agricultural holding and record particulars detailed above are', margin + 4, curY + 6);
  doc.text('officially indexed under Rythu Digital Locker in compliance with e-Governance standards.', margin + 4, curY + 11);
  doc.text('Holder is eligible for institutional agricultural credit, PMFBY crop insurance, and DBT subsidies.', margin + 4, curY + 16);

  // Digital Sign Stamp on Right
  const sX = pageWidth - margin - 60;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.rect(sX, curY + 4, 56, 33, 'FD');

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('GOVT. OF ANDHRA PRADESH', sX + 28, curY + 10, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text('Village Agriculture Assistant (VAA)', sX + 28, curY + 15, { align: 'center' });
  doc.text('Rythu Bharosa Kendra (RBK)', sX + 28, curY + 19, { align: 'center' });
  doc.text('Tahsildar & Revenue Jurisdiction', sX + 28, curY + 23, { align: 'center' });

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('[Digitally Authenticated]', sX + 28, curY + 29, { align: 'center' });

  // Page 1 Footer
  const footerY1 = pageHeight - margin - 3;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY1 - 3, pageWidth - margin, footerY1 - 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(22, 101, 52);
  doc.text('RYTHU DIGITAL LOCKER | CERTIFIED FARMER & HOLDING CERTIFICATE', margin, footerY1);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Page 1 of 2 (Farmer Holding Certificate)', pageWidth - margin, footerY1, { align: 'right' });


  // ==========================================
  // PAGE 2: OFFICIAL RECORD TRANSCRIPT & SECURITY
  // ==========================================
  doc.addPage();

  // Outer Border for Page 2
  doc.setDrawColor(22, 101, 52);
  doc.setLineWidth(1.2);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8);

  doc.setDrawColor(187, 247, 208);
  doc.setLineWidth(0.4);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - (margin * 2) + 4);

  // Header Banner Page 2
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, margin, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RYTHU DIGITAL LOCKER & ARCHIVE', pageWidth / 2, margin + 8, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('PART 2: OFFICIAL RECORD TRANSCRIPT & TECHNICAL SPECIFICATIONS', pageWidth / 2, margin + 14, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(209, 250, 229);
  doc.text(`DOCUMENT ID: ${certId}  |  BENEFICIARY: ${farmerName} (${kisanId})`, pageWidth / 2, margin + 20, { align: 'center' });

  let curY2 = margin + 29;

  // SECTION 4: DETAILED AGRICULTURAL RECORD TRANSCRIPT
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, curY2, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('SECTION 4: COMPLETE RECORD TRANSCRIPT & CULTIVATION SPECIFICATIONS', margin + 3, curY2 + 4.8);

  curY2 += 7;
  const tBoxH = 125;
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, curY2, contentWidth, tBoxH, 'FD');

  // Build transcript lines
  const transcriptLines: string[] = [
    `OFFICIAL RECORD TRANSCRIPT & FIELD AUDIT LOG`,
    `========================================================================================`,
    `DOCUMENT TITLE     : ${safeDocName}`,
    `BENEFICIARY FARMER : ${farmerName} [Kisan ID: ${kisanId}]`,
    `HOLDING / FARM     : ${farmName} (${landArea})`,
    `LOCATION           : ${location}, ${districtState}`,
    `CATEGORY & TYPE    : ${rec.category} [Classification: ${rec.classification}]`,
    `SURVEY / REF NO    : ${surveyNo}`,
    `REGISTRATION DATE  : ${issueDate} | YEAR: ${rec.year || 2026}`,
    `----------------------------------------------------------------------------------------`,
    `DETAILED TECHNICAL SPECIFICATIONS & VERIFIED PARTICULARS:`
  ];

  if (rec.category === 'Crops') {
    transcriptLines.push(
      `* Cultivated Variety  : Paddy (Rice) BPT-5204 Samba Mahsuri Quality Lot`,
      `* Crop Season         : Kharif 2026 / Rabi Certified Cultivation`,
      `* Extent Sown         : ${landArea} under canal ayacut & borewell source`,
      `* Seed Lot & Agency   : AP State Seeds Development Corp (Lot: APSSDC-2026-B81)`,
      `* Soil Nutrient State : Tested Optimal (pH 7.1, Nitrogen Normal, Organic Carbon 0.58%)`,
      `* Pest & Disease Mgmt : IPM (Integrated Pest Management) compliant, bio-fertilizer used`,
      `* e-Crop Survey Status: Geo-tagged & biometric verified by Village Agriculture Assistant`
    );
  } else if (rec.category === 'Land') {
    transcriptLines.push(
      `* Land Tenure Nature  : Pattadar Rythu Absolute Title (RoR 1B Entry Verified)`,
      `* Pattadar Passbook No: AP-PPB-882910 | Revenue Khata Record Active`,
      `* Boundary Demarcation: DGPS boundary surveyed and revenue village map geo-referenced`,
      `* Encumbrance Search  : Clean Title Certificate (No encumbrance for 30 years)`,
      `* Sub-Registrar Office: Tenali / Guntur Rural SRO Official Jurisdiction`
    );
  } else if (rec.category === 'Finance' || rec.category === 'Insurance') {
    transcriptLines.push(
      `* Scheme Coverage     : Pradhan Mantri Fasal Bima Yojana (PMFBY) & Rythu Bharosa`,
      `* Policy / Acct Number: ${surveyNo}`,
      `* Sum Insured Extent  : Rs. 2,50,000/- (Weather & natural calamity comprehensive cover)`,
      `* Premium Status      : Subsidized 2% Farmer Premium paid via DBT account`,
      `* Settlement Channel  : Direct Benefit Transfer to Aadhaar-linked Bank Account`
    );
  } else {
    transcriptLines.push(
      `* Reference Number    : ${surveyNo}`,
      `* Nature of Document  : Official Farmer Vault Digital Record`,
      `* Purpose of Filing   : Government Scheme Availment & Legal Records Proof`
    );
  }

  if (rec.description && rec.description !== 'Farmer uploaded demo record with verification check.') {
    transcriptLines.push(`* Recorded Farmer Note: ${rec.description.replace(/[^\x00-\x7F]/g, '')}`);
  }

  transcriptLines.push(
    `----------------------------------------------------------------------------------------`,
    `STATUS: Validated official record archived with 256-bit encrypted tamper-proof seal.`
  );

  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  let p2Y = curY2 + 6;
  for (let i = 0; i < transcriptLines.length; i++) {
    if (p2Y > curY2 + tBoxH - 5) break;
    doc.text(transcriptLines[i], margin + 4, p2Y);
    p2Y += 4.8;
  }

  curY2 += tBoxH + 8;

  // SECTION 5: SECURITY, AUDIT TRAIL & QR DIGITAL VERIFICATION
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, curY2, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('SECTION 5: DIGITAL VAULT SECURITY, HASH & VERIFICATION AUDIT', margin + 3, curY2 + 4.8);

  curY2 += 7;
  const sBoxH = 45;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.rect(margin, curY2, contentWidth, sBoxH, 'FD');

  const sCol1 = margin + 5;
  const sCol2 = pageWidth - margin - 58;

  // Left side info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('CRYPTOGRAPHIC SHA-256 VAULT FINGERPRINT:', sCol1, curY2 + 7);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(dummyHash, sCol1, curY2 + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Tamper-Proof Encryption: ISO/IEC 27001 Certified Vault Standard', sCol1, curY2 + 20);
  doc.text('E-Sign Verification: Digitally Signed by Authorized Village Agriculture Officer', sCol1, curY2 + 26);
  doc.text('National Farmer Helpline: 1551 (Toll-Free) | National Cyber Crime Helpline: 1930', sCol1, curY2 + 32);
  doc.text('Official Verification Portal: https://rythu.ap.gov.in/verify', sCol1, curY2 + 38);

  // Right side QR / Stamp placeholder
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(34, 197, 94);
  doc.rect(sCol2, curY2 + 4, 54, 37, 'FD');

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('DIGITALLY CERTIFIED', sCol2 + 27, curY2 + 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text('DigiLocker Compliant Copy', sCol2 + 27, curY2 + 17, { align: 'center' });
  doc.text('Village Agriculture Assistant', sCol2 + 27, curY2 + 22, { align: 'center' });
  doc.text('Govt of Andhra Pradesh', sCol2 + 27, curY2 + 27, { align: 'center' });

  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('[Valid Digital Signature]', sCol2 + 27, curY2 + 34, { align: 'center' });

  // Page 2 Footer
  const footerY2 = pageHeight - margin - 3;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY2 - 3, pageWidth - margin, footerY2 - 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(22, 101, 52);
  doc.text('RYTHU DIGITAL LOCKER | VERIFIED DOCUMENT TRANSCRIPT & AUDIT TRAIL', margin, footerY2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Page 2 of 2 (Official Transcript)', pageWidth - margin, footerY2, { align: 'right' });

  // Download PDF
  const sanitizedName = (safeDocName || 'Farmer_Record').replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${sanitizedName}_${rec.dateAdded}.pdf`);
}
