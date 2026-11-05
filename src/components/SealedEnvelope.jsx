import React, { useState } from 'react';

export default function SealedEnvelope({ onOpen, isOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || opening) return;
    setOpening(true);
    // Slight pause to allow flap opening animation before scrolling
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <section className="envelope-wrapper" aria-label="अनुसाठी पत्र">
      <div className={`envelope ${isOpen || opening ? 'is-open' : ''}`}>
        {/* Envelope Top Flap */}
        <div className="envelope-flap" />

        {/* Vintage Stamp */}
        <div className="envelope-stamp">
          <span>पुणे</span>
          <span style={{ fontSize: '13px' }}>💌</span>
          <span style={{ fontSize: '8px', letterSpacing: '0.5px' }}>POST</span>
        </div>

        {/* Wax / Heart Seal */}
        <div className="envelope-seal" aria-hidden="true">
          <span style={{ fontSize: '26px' }}>❤️</span>
        </div>

        {/* Envelope Body / Pockets */}
        <div className="envelope-sides" />
        <div className="envelope-pocket" />

        {/* Address Card */}
        <div className="envelope-address">
          <p style={{ fontSize: '0.82rem', color: '#8E777B', marginBottom: '2px' }}>
            विशेष टपाल • प्रेम संदेश
          </p>
          <h1
            className="marathi-heading"
            style={{
              fontSize: '1.35rem',
              color: '#9B1B30',
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            फक्त तुझ्यासाठी, अनु 💌
          </h1>
        </div>
      </div>

      {/* Action button beneath envelope */}
      {!isOpen && (
        <div className="text-center mt-6" style={{ position: 'relative', zIndex: 10 }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handleOpen}
            aria-label="पत्र उघडून पहा"
            disabled={opening}
          >
            {opening ? 'उघडत आहे... 💕' : 'उघडून बघ ❤️'}
          </button>
        </div>
      )}
    </section>
  );
}

