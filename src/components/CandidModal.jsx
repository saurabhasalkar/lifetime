import React, { useEffect, useRef } from 'react';

export default function CandidModal({ photo, onClose, defaultShowNote = false }) {
  const [showNote, setShowNote] = React.useState(defaultShowNote);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // Focus close button on mount
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="candid-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2
            id="candid-modal-title"
            style={{ fontSize: '1.05rem', color: '#9B1B30', fontWeight: 600 }}
          >
            {showNote ? 'एक हळवी आठवण 🤍' : photo.title}
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="खिडकी बंद करा"
            style={{
              fontSize: '1.2rem',
              color: '#8E777B',
              padding: '4px 8px',
              borderRadius: '6px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        {showNote ? (
          <div
            style={{
              padding: '24px 18px',
              background: '#FDFBF7',
              borderRadius: '12px',
              border: '1px solid #E8D399',
              textAlign: 'center',
              margin: '8px 0',
            }}
          >
            <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>💌</span>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#2D181D',
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              “कुणीतरी आपल्याला कळू न देता हे फोटो काढले, ते बरंच झालं. आता तो दिवस पुन्हा आठवायला आपल्याकडे हे दोन फोटो आहेत. 🤍”
            </p>
          </div>
        ) : (
          <div
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#111',
              aspectRatio: '3 / 4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '8px 0',
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* Modal Controls */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowNote(!showNote)}
            aria-label={showNote ? 'फोटो पहा' : 'टीप वाचा'}
          >
            {showNote ? '🖼️ फोटो पहा' : '💌 खास टीप वाचा'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            style={{ background: '#F8F4EE' }}
          >
            बंद करा
          </button>
        </div>
      </div>
    </div>
  );
}

