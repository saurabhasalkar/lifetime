import React, { useState } from 'react';

export default function ProposalNote({ onAccept, hasAccepted }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);

  const playfulMessages = [
    'नाही 🙈',
    'अरे देवा! 🏃',
    'पकडून दाखव 😜',
    'नाही म्हणता येत नाही! 🤭',
    'अजिबात नाही! 💖',
  ];

  const handleNoApproach = (e) => {
    // Avoid default touch action so it doesn't trigger tap
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    // Calculate a random displacement strictly within the wrapper bounds (-24px to +24px)
    // ensuring it never intersects or covers the "हो" button
    const randomX = (Math.random() * 40 - 20); // -20 to +20 px
    const randomY = (Math.random() * 30 - 15); // -15 to +15 px
    setNoPosition({ x: randomX, y: randomY });
    setNoAttempts((prev) => prev + 1);
  };

  return (
    <section className="proposal-parchment" aria-label="सौरभचा प्रेम प्रस्ताव">
      {/* Decorative top ribbon */}
      <div
        style={{
          display: 'inline-block',
          background: 'var(--rose-light)',
          color: 'var(--rose-primary)',
          padding: '4px 16px',
          borderRadius: '9999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '24px',
          border: '1px solid var(--rose-border)',
        }}
      >
        फक्त तुझ्यासाठी एक वचन 🤍
      </div>

      {/* Proposal Lines */}
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
        <p className="proposal-line">
          आपली भेट घरच्यांनी ठरवली… पण प्रेम आपोआप झालं.
        </p>

        <p className="proposal-line highlight">
          I love you, अनु. ❤️
        </p>

        <p className="proposal-line">
          त्या दिवशी तू माझा हात धरलास… आता आयुष्यभर तुझ्या हातात हात घालून चालायचंय.
        </p>

        <p className="proposal-line question">
          अनु, माझ्याशी लग्न करशील का?
        </p>

        <div className="proposal-signature">
          — तुझा सौरभ
        </div>
      </div>

      {/* Interactive Response Buttons */}
      {!hasAccepted ? (
        <div className="proposal-actions-row">
          {/* "हो ❤️" Button */}
          <button
            type="button"
            className="btn-yes"
            onClick={onAccept}
            aria-label="हो, मी तयार आहे (स्वीकारा)"
          >
            हो ❤️
          </button>

          {/* Playful "नाही 🙈" Button (strictly constrained) */}
          <div className="playful-no-wrapper">
            <button
              type="button"
              className="btn-no-playful"
              onPointerEnter={handleNoApproach}
              onTouchStart={handleNoApproach}
              onFocus={handleNoApproach}
              onClick={(e) => {
                e.preventDefault();
                handleNoApproach(e);
              }}
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
              }}
              aria-label="नाही (गमतीदार बटण)"
              tabIndex={0}
            >
              {playfulMessages[noAttempts % playfulMessages.length]}
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            margin: '28px 0 10px 0',
            padding: '14px 20px',
            background: 'var(--rose-light)',
            borderRadius: '16px',
            border: '1.5px solid var(--rose-border)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--rose-primary)',
            fontWeight: 700,
            fontSize: '1.15rem',
          }}
        >
          <span>🎉</span> तू “हो” म्हणालीस! आपलं पुढचं स्टेशन नक्की झालं! ❤️
        </div>
      )}

      {/* Reassurance text */}
      <p
        style={{
          fontSize: '0.86rem',
          color: '#8E777B',
          marginTop: '16px',
          fontStyle: 'italic',
        }}
      >
        उत्तर तुझ्या मनातलं दे. तुला हवं तेव्हा. 🤍
      </p>
    </section>
  );
}

