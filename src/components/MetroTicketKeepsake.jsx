import React, { useState } from 'react';
import { downloadTicketAsImage, downloadTicketAsSVG } from '../utils/ticketGenerator';

export default function MetroTicketKeepsake() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      await downloadTicketAsImage();
    } catch (e) {
      console.error('Error generating ticket image', e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="paper-card" style={{ padding: '24px 20px', marginTop: '28px' }} aria-label="पुणे मेट्रो आठवण तिकीट">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '32px' }}>🎟️</span>
        <h3
          className="marathi-heading"
          style={{ fontSize: '1.3rem', color: '#9B1B30', marginTop: '6px' }}
        >
          आपलं खास मेट्रो तिकीट 🤍
        </h3>
        <p style={{ fontSize: '0.86rem', color: '#8E777B' }}>
          आयुष्यभराच्या प्रवासाचा हा एक सुंदर साक्षीदार
        </p>
      </div>

      {/* Visual Ticket on Screen */}
      <div className="metro-ticket">
        <div className="ticket-notch-left" aria-hidden="true" />
        <div className="ticket-notch-right" aria-hidden="true" />

        {/* Top Header */}
        <div
          style={{
            background: 'var(--rose-primary)',
            color: '#FFFFFF',
            padding: '10px 14px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.5px' }}>
            पुणे मेट्रो • PUNE METRO
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
            एकत्रित विशेष प्रवास तिकीट 💌
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <div
            className="marathi-heading"
            style={{ fontSize: '1.5rem', color: '#9B1B30', fontWeight: 700 }}
          >
            अनु + सौरभ
          </div>
          <div style={{ fontSize: '0.9rem', color: '#6B5559', marginTop: '2px' }}>
            प्रारंभ: दगडूशेठ (पुणे) 🛕
          </div>
          <div style={{ color: '#C59B27', fontSize: '1.2rem', margin: '4px 0' }}>↓</div>
          <div
            className="marathi-heading"
            style={{ fontSize: '1.25rem', color: '#7D1124', fontWeight: 700 }}
          >
            पुढचं स्टेशन — आपलं आयुष्य ❤️
          </div>
        </div>

        <hr className="ticket-divider-line" />

        {/* Details List */}
        <div
          style={{
            background: '#FDFBF7',
            padding: '14px 16px',
            borderRadius: '10px',
            border: '1px solid #E8D399',
            fontSize: '0.92rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6B5559' }}>प्रवासी:</span>
            <strong style={{ color: '#2D181D' }}>आपण दोघं 🤍</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6B5559' }}>प्रवास प्रकार:</span>
            <strong style={{ color: '#2D181D' }}>Non-stop प्रेमाचा प्रवास</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6B5559' }}>आसन:</span>
            <strong style={{ color: '#2D181D' }}>हातात हात घालून</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6B5559' }}>वैधता:</span>
            <strong style={{ color: '#9B1B30' }}>आयुष्यभर ♾️</strong>
          </div>
        </div>

        <hr className="ticket-divider-line" />

        {/* Simulated Barcode */}
        <div style={{ textAlign: 'center', opacity: 0.75, margin: '8px 0' }}>
          <div
            style={{
              height: '24px',
              background: 'repeating-linear-gradient(90deg, #2D181D 0, #2D181D 2px, transparent 2px, transparent 4px, #2D181D 4px, #2D181D 7px, transparent 7px, transparent 9px)',
              maxWidth: '240px',
              margin: '0 auto',
            }}
          />
          <div style={{ fontSize: '0.72rem', color: '#8E777B', marginTop: '4px', letterSpacing: '1px' }}>
            TKT: PUNE-AS-FOREVER-2026
          </div>
        </div>
      </div>

      {/* Download Action Buttons */}
      <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <button
          type="button"
          className="btn-primary"
          onClick={handleDownloadImage}
          disabled={downloading}
          aria-label="तिकीट फोटो स्वरूपात सेव्ह करा"
          style={{ width: '100%', maxWidth: '280px' }}
        >
          {downloading ? 'तिकीट तयार होत आहे...' : 'तिकीट सेव्ह कर 📥'}
        </button>

        <button
          type="button"
          onClick={downloadTicketAsSVG}
          style={{
            fontSize: '0.82rem',
            color: '#8E777B',
            textDecoration: 'underline',
            padding: '4px 8px',
          }}
          aria-label="तिकीट SVG स्वरूपात सेव्ह करा"
        >
          (किंवा SVG स्वरूपात सेव्ह करा)
        </button>
      </div>

      {/* Note below ticket */}
      <div
        style={{
          marginTop: '22px',
          padding: '16px',
          background: 'var(--rose-light)',
          borderRadius: '12px',
          border: '1px solid var(--rose-border)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.96rem',
            lineHeight: 1.8,
            color: '#7D1124',
            fontWeight: 600,
          }}
        >
          “पुढच्या वेळी पुण्यात भेटलो की पुन्हा मेट्रोने दगडूशेठला जाऊया? यावेळी तुझा हात मी आधी धरेन. ❤️”
        </p>
      </div>
    </section>
  );
}

