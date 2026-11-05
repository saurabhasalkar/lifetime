import React, { useState } from 'react';

export default function HerReply() {
  const [replyText, setReplyText] = useState('');
  const [attemptedEmpty, setAttemptedEmpty] = useState(false);

  const handleSendWhatsApp = () => {
    const trimmed = replyText.trim();
    if (!trimmed) {
      setAttemptedEmpty(true);
      return;
    }

    setAttemptedEmpty(false);
    // WhatsApp direct link with user-written text verbatim
    const whatsappUrl = `https://wa.me/917304422022?text=${encodeURIComponent(replyText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="paper-card" style={{ padding: '24px 20px', marginTop: '28px' }} aria-label="अनुचा संदेश">
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <h3
          className="marathi-heading"
          style={{ fontSize: '1.25rem', color: '#9B1B30', lineHeight: 1.5 }}
        >
          आता तुझ्या मनातलंही ऐकायचंय… 💌
        </h3>
        <p style={{ fontSize: '0.86rem', color: '#8E777B', marginTop: '4px' }}>
          तुझ्या भावना, तुझ्या शब्दात. हवं तेव्हा लिही.
        </p>
      </div>

      {/* Multiline reply textarea */}
      <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
        <textarea
          rows={4}
          value={replyText}
          onChange={(e) => {
            setReplyText(e.target.value);
            if (attemptedEmpty && e.target.value.trim()) {
              setAttemptedEmpty(false);
            }
          }}
          placeholder="इथे काहीही लिही… तुझ्या भावना, किंवा फक्त एक स्माईल 😊"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: attemptedEmpty ? '1.5px solid #E63956' : '1.5px solid #E8D399',
            background: '#FDFBF7',
            fontSize: '0.98rem',
            lineHeight: 1.6,
            color: '#2D181D',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
          }}
          aria-label="सौरभसाठी तुझा संदेश"
        />

        {attemptedEmpty && (
          <p style={{ fontSize: '0.82rem', color: '#E63956', marginTop: '4px', textAlign: 'center' }}>
            कृपया WhatsApp वर पाठवण्याआधी दोन ओळी लिही 💌
          </p>
        )}

        {/* WhatsApp Send Button */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              boxShadow: '0 6px 20px -2px rgba(37, 211, 102, 0.35)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              width: '100%',
              maxWidth: '260px',
            }}
            aria-label="WhatsApp वर संदेश पाठवा"
          >
            WhatsApp वर पाठव 💚
          </button>
        </div>

        {/* Clarifying reassurance note */}
        <p
          style={{
            fontSize: '0.8rem',
            color: '#8E777B',
            textAlign: 'center',
            marginTop: '12px',
            lineHeight: 1.5,
          }}
        >
          टीप: या बटणावर टॅप केल्यावर WhatsApp उघडेल आणि तुझा संदेश तिथे ड्राफ्ट झालेला दिसेल. तिथून तू तो पाठवू शकतेस. 🤍
        </p>
      </div>
    </section>
  );
}

