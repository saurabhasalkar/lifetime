/**
 * Ticket Generator for Pune Metro Keepsake
 * Generates and downloads the commemorative ticket as a high-resolution PNG image or SVG.
 */

export async function downloadTicketAsImage() {
  if (typeof document === 'undefined') return;

  // Wait for Devanagari fonts to be ready
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn('Fonts ready check skipped', e);
    }
  }

  const canvas = document.createElement('canvas');
  const scale = 2; // High-res retina scale
  const width = 420;
  const height = 640;

  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(scale, scale);

  // Background - Warm Parchment Paper
  ctx.fillStyle = '#FFFDF9';
  ctx.fillRect(0, 0, width, height);

  // Outer Border with Golden Accents
  ctx.strokeStyle = '#C59B27';
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  // Inner Subtle Border
  ctx.strokeStyle = '#F0DFC0';
  ctx.lineWidth = 1;
  ctx.strokeRect(18, 18, width - 36, height - 36);

  // Top Header Banner
  ctx.fillStyle = '#9B1B30';
  ctx.fillRect(20, 20, width - 40, 68);

  // Pune Metro Header Text
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = 'bold 20px "Noto Sans Devanagari", "Rozha One", "Kohinoor Devanagari", sans-serif';
  ctx.fillText('पुणे मेट्रो • PUNE METRO', width / 2, 50);

  ctx.fillStyle = '#FCEBEF';
  ctx.font = '12px "Noto Sans Devanagari", sans-serif';
  ctx.fillText('एकत्रित विशेष प्रवास तिकीट 💌', width / 2, 72);

  // Ticket Number & Decorative Line
  ctx.fillStyle = '#8E777B';
  ctx.font = '11px monospace';
  ctx.fillText('TKT NO: PN-AS-FOREVER-♾️', width / 2, 108);

  // Perforated Dashed Line
  ctx.beginPath();
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = '#C59B27';
  ctx.lineWidth = 1.5;
  ctx.moveTo(25, 122);
  ctx.lineTo(width - 25, 122);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash

  // Side Cutout Notches (ticket style)
  ctx.fillStyle = '#FAF6F0';
  ctx.beginPath();
  ctx.arc(12, 122, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width - 12, 122, 12, 0, Math.PI * 2);
  ctx.fill();

  // Route Info
  ctx.fillStyle = '#9B1B30';
  ctx.font = 'bold 22px "Noto Sans Devanagari", "Rozha One", serif';
  ctx.fillText('अनु + सौरभ', width / 2, 165);

  ctx.fillStyle = '#6B5559';
  ctx.font = '500 13px "Noto Sans Devanagari", sans-serif';
  ctx.fillText('प्रारंभ: दगडूशेठ (पुणे) 🛕', width / 2, 196);

  // Arrow
  ctx.fillStyle = '#C59B27';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('↓', width / 2, 222);

  // Destination (The Core Theme)
  ctx.fillStyle = '#7D1124';
  ctx.font = 'bold 21px "Noto Sans Devanagari", "Rozha One", serif';
  ctx.fillText('पुढचं स्टेशन — आपलं आयुष्य ❤️', width / 2, 256);

  // Details Box
  const boxX = 35;
  const boxY = 280;
  const boxW = width - 70;
  const boxH = 175;

  ctx.fillStyle = '#FDFBF7';
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = '#E8D399';
  ctx.lineWidth = 1;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Key-Value Rows
  const details = [
    { label: 'प्रवासी:', val: 'आपण दोघं 🤍' },
    { label: 'प्रवास प्रकार:', val: 'Non-stop प्रेमाचा प्रवास' },
    { label: 'आसन:', val: 'हातात हात घालून' },
    { label: 'वैधता:', val: 'आयुष्यभर ♾️' }
  ];

  let currentY = boxY + 34;
  details.forEach(item => {
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6B5559';
    ctx.font = '13px "Noto Sans Devanagari", sans-serif';
    ctx.fillText(item.label, boxX + 16, currentY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#2D181D';
    ctx.font = '600 14px "Noto Sans Devanagari", sans-serif';
    ctx.fillText(item.val, boxX + boxW - 16, currentY);

    currentY += 36;
  });

  // Second Perforated Line
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#C59B27';
  ctx.lineWidth = 1;
  ctx.moveTo(25, 480);
  ctx.lineTo(width - 25, 480);
  ctx.stroke();
  ctx.setLineDash([]);

  // Barcode / Verification aesthetic
  ctx.fillStyle = '#2D181D';
  ctx.textAlign = 'center';
  const barY = 502;
  const barWidths = [3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 3, 1, 2, 4, 1, 3];
  let startX = (width - barWidths.reduce((a, b) => a + b + 2, 0)) / 2;
  barWidths.forEach(bw => {
    ctx.fillRect(startX, barY, bw, 32);
    startX += bw + 2;
  });

  // Footer Note
  ctx.fillStyle = '#9B1B30';
  ctx.font = '600 12px "Noto Sans Devanagari", sans-serif';
  ctx.fillText('पुणे मेट्रो • आपलं आयुष्य ❤️', width / 2, 560);

  ctx.fillStyle = '#8E777B';
  ctx.font = '10px "Noto Sans Devanagari", sans-serif';
  ctx.fillText('हे तिकीट म्हणजे आपल्या नव्या प्रवासाची सुंदर सुरुवात!', width / 2, 584);

  // Convert to high-res PNG and trigger download
  const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
  if (!imageBlob) return;

  const url = URL.createObjectURL(imageBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pune-metro-ticket-anu-saurabh.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadTicketAsSVG() {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="420" height="640" viewBox="0 0 420 640" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&amp;family=Rozha+One&amp;display=swap');
      .heading { font-family: 'Rozha One', 'Noto Sans Devanagari', serif; font-weight: bold; fill: #9B1B30; }
      .text-marathi { font-family: 'Noto Sans Devanagari', -apple-system, sans-serif; }
      .header-title { font-family: 'Noto Sans Devanagari', sans-serif; font-weight: bold; font-size: 20px; fill: #FFFFFF; }
      .header-sub { font-family: 'Noto Sans Devanagari', sans-serif; font-size: 12px; fill: #FCEBEF; }
      .names { font-family: 'Rozha One', 'Noto Sans Devanagari', serif; font-size: 24px; fill: #9B1B30; font-weight: bold; }
      .station { font-family: 'Rozha One', 'Noto Sans Devanagari', serif; font-size: 20px; fill: #7D1124; font-weight: bold; }
      .label { font-family: 'Noto Sans Devanagari', sans-serif; font-size: 13px; fill: #6B5559; }
      .val { font-family: 'Noto Sans Devanagari', sans-serif; font-size: 14px; font-weight: 600; fill: #2D181D; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="420" height="640" rx="14" fill="#FFFDF9" stroke="#C59B27" stroke-width="3" />
  <rect x="8" y="8" width="404" height="624" rx="10" fill="none" stroke="#F0DFC0" stroke-width="1" />

  <!-- Top Banner -->
  <rect x="16" y="16" width="388" height="68" rx="8" fill="#9B1B30" />
  <text x="210" y="44" text-anchor="middle" class="header-title">पुणे मेट्रो • PUNE METRO</text>
  <text x="210" y="66" text-anchor="middle" class="header-sub">एकत्रित विशेष प्रवास तिकीट 💌</text>

  <!-- Perforated Line -->
  <line x1="20" y1="110" x2="400" y2="110" stroke="#C59B27" stroke-width="1.5" stroke-dasharray="6,5" />
  <!-- Cutout Notches -->
  <circle cx="8" cy="110" r="10" fill="#FAF6F0" stroke="#C59B27" stroke-width="2" />
  <circle cx="412" cy="110" r="10" fill="#FAF6F0" stroke="#C59B27" stroke-width="2" />

  <!-- Names -->
  <text x="210" y="155" text-anchor="middle" class="names">अनु + सौरभ</text>
  <text x="210" y="185" text-anchor="middle" class="label">प्रारंभ: दगडूशेठ (पुणे) 🛕</text>
  <text x="210" y="210" text-anchor="middle" fill="#C59B27" font-size="18">↓</text>
  <text x="210" y="245" text-anchor="middle" class="station">पुढचं स्टेशन — आपलं आयुष्य ❤️</text>

  <!-- Details Card -->
  <rect x="30" y="270" width="360" height="175" rx="8" fill="#FDFBF7" stroke="#E8D399" stroke-width="1" />
  
  <text x="50" y="305" class="label">प्रवासी:</text>
  <text x="370" y="305" text-anchor="end" class="val">आपण दोघं 🤍</text>

  <text x="50" y="342" class="label">प्रवास प्रकार:</text>
  <text x="370" y="342" text-anchor="end" class="val">Non-stop प्रेमाचा प्रवास</text>

  <text x="50" y="379" class="label">आसन:</text>
  <text x="370" y="379" text-anchor="end" class="val">हातात हात घालून</text>

  <text x="50" y="416" class="label">वैधता:</text>
  <text x="370" y="416" text-anchor="end" class="val">आयुष्यभर ♾️</text>

  <!-- Second Perforated Line -->
  <line x1="20" y1="475" x2="400" y2="475" stroke="#C59B27" stroke-width="1.5" stroke-dasharray="5,5" />

  <!-- Barcode Simulation -->
  <g fill="#2D181D">
    <rect x="70" y="500" width="4" height="30" />
    <rect x="80" y="500" width="2" height="30" />
    <rect x="86" y="500" width="6" height="30" />
    <rect x="96" y="500" width="3" height="30" />
    <rect x="105" y="500" width="8" height="30" />
    <rect x="118" y="500" width="2" height="30" />
    <rect x="125" y="500" width="5" height="30" />
    <rect x="135" y="500" width="3" height="30" />
    <rect x="145" y="500" width="7" height="30" />
    <rect x="160" y="500" width="2" height="30" />
    <rect x="170" y="500" width="5" height="30" />
    <rect x="180" y="500" width="3" height="30" />
    <rect x="190" y="500" width="6" height="30" />
    <rect x="205" y="500" width="4" height="30" />
    <rect x="215" y="500" width="2" height="30" />
    <rect x="225" y="500" width="5" height="30" />
    <rect x="235" y="500" width="7" height="30" />
    <rect x="250" y="500" width="3" height="30" />
    <rect x="260" y="500" width="4" height="30" />
    <rect x="270" y="500" width="2" height="30" />
    <rect x="280" y="500" width="6" height="30" />
    <rect x="295" y="500" width="3" height="30" />
    <rect x="305" y="500" width="5" height="30" />
    <rect x="315" y="500" width="8" height="30" />
    <rect x="330" y="500" width="3" height="30" />
    <rect x="340" y="500" width="4" height="30" />
  </g>

  <text x="210" y="560" text-anchor="middle" class="val" fill="#9B1B30">पुणे मेट्रो • आपलं आयुष्य ❤️</text>
  <text x="210" y="585" text-anchor="middle" class="label">हे तिकीट म्हणजे आपल्या नव्या प्रवासाची सुंदर सुरुवात!</text>
</svg>`;

  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pune-metro-ticket-anu-saurabh.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

