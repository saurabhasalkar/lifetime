import React, { useState } from 'react';
import MetroTrackAnimation from './MetroTrackAnimation';
import CandidModal from './CandidModal';

export default function MetroTimeline() {
  const [activeModalPhoto, setActiveModalPhoto] = useState(null);
  const [revealedNotes, setRevealedNotes] = useState({ 1: false, 2: false });

  const toggleNote = (id) => {
    setRevealedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const candidPhotos = [
    {
      id: 1,
      src: '/assets/images/family-visit-candid-1.jpeg',
      alt: 'घरच्यांच्या भेटीतील अनपेक्षित सुंदर क्षण - फोटो १',
      title: 'बघण्याचा कार्यक्रम • क्षण १',
      caption: 'अजाणतेपणी टिपलेला पहिला क्षण 🤍',
    },
    {
      id: 2,
      src: '/assets/images/family-visit-candid-2.jpeg',
      alt: 'घरच्यांच्या भेटीतील अनपेक्षित सुंदर क्षण - फोटो २',
      title: 'बघण्याचा कार्यक्रम • क्षण २',
      caption: 'आपल्या नकळत काढलेला दुसरा फोटो ✨',
    },
  ];

  return (
    <section className="timeline-track" aria-label="आपल्या आठवणींची मेट्रो यात्रा">
      <div className="timeline-line" aria-hidden="true" />

      {/* STOP 1: आपली पहिली भेट */}
      <article className="timeline-station" aria-labelledby="stop-1-title">
        <div className="station-node" aria-hidden="true">
          <span style={{ fontSize: '10px' }}>📍</span>
        </div>
        <div className="station-badge">स्टेशन १ • पहिली भेट</div>

        <div className="paper-card" style={{ padding: '20px 18px' }}>
          <h2
            id="stop-1-title"
            className="marathi-heading"
            style={{ fontSize: '1.25rem', color: '#9B1B30', marginBottom: '10px' }}
          >
            आपली पहिली भेट
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#2D181D',
            }}
          >
            “अनु, तुझ्या भावाच्या घरी आपण पहिल्यांदा भेटलो. तेव्हाच तू मला आवडली होतीस.”
          </p>
        </div>
      </article>

      {/* STOP 2: घरच्यांच्या भेटी */}
      <article className="timeline-station" aria-labelledby="stop-2-title">
        <div className="station-node" aria-hidden="true">
          <span style={{ fontSize: '10px' }}>🏡</span>
        </div>
        <div className="station-badge">स्टेशन २ • घरच्यांच्या भेटी</div>

        <div className="paper-card" style={{ padding: '20px 18px' }}>
          <h2
            id="stop-2-title"
            className="marathi-heading"
            style={{ fontSize: '1.25rem', color: '#9B1B30', marginBottom: '8px' }}
          >
            घरच्यांच्या भेटी
          </h2>
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#3A262B',
              marginBottom: '16px',
            }}
          >
            तुझ्या आई-बाबांनी आपल्या घरी दोनदा भेट दिली. मग मी पूर्ण फॅमिलीसोबत तुमच्या घरी आलो — तो औपचारिक बघण्याचा कार्यक्रम! घरच्यांनाही तू पहिल्याच भेटीत खूप आवडलीस.
          </p>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#8E777B',
              marginBottom: '12px',
              fontStyle: 'italic',
            }}
          >
            (दोन्ही फोटोंवर टॅप करून पाठीमागची खास टीप वाचू शकतेस 💌)
          </p>

          {/* Candid Photos Album Grid */}
          <div className="album-grid">
            {candidPhotos.map((photo) => {
              const isNoteRevealed = revealedNotes[photo.id];
              return (
                <div
                  key={photo.id}
                  className="polaroid-card"
                  tabIndex={0}
                  role="button"
                  aria-label={`${photo.title} - टीप वाचण्यासाठी टॅप करा`}
                  onClick={() => toggleNote(photo.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleNote(photo.id);
                    }
                  }}
                >
                  {isNoteRevealed ? (
                    <div
                      style={{
                        aspectRatio: '3 / 4',
                        background: '#FAF5ED',
                        border: '1px dashed #C59B27',
                        borderRadius: '4px',
                        padding: '16px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: '24px', marginBottom: '8px' }}>🤍</span>
                      <p
                        style={{
                          fontSize: '0.88rem',
                          lineHeight: 1.7,
                          color: '#2D181D',
                          fontWeight: 500,
                        }}
                      >
                        “कुणीतरी आपल्याला कळू न देता हे फोटो काढले, ते बरंच झालं. आता तो दिवस पुन्हा आठवायला आपल्याकडे हे दोन फोटो आहेत. 🤍”
                      </p>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{
                          marginTop: '12px',
                          padding: '6px 14px',
                          fontSize: '0.8rem',
                          minHeight: '34px',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNote(photo.id);
                        }}
                        aria-label="फोटो पुन्हा पहा"
                      >
                        🖼️ फोटो पुन्हा पहा
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="polaroid-photo-frame">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="polaroid-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="polaroid-caption">{photo.caption}</div>
                      <div style={{ textAlign: 'center', marginTop: '6px' }}>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: '#9B1B30',
                            fontWeight: 600,
                            textDecoration: 'underline',
                          }}
                        >
                          टीप उघडा 💌
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </article>

      {/* STOP 3: पुण्यातली पहिली भेट */}
      <article className="timeline-station" aria-labelledby="stop-3-title">
        <div className="station-node" aria-hidden="true">
          <span style={{ fontSize: '10px' }}>🚇</span>
        </div>
        <div className="station-badge">स्टेशन ३ • पुण्यातली पहिली भेट</div>

        <div className="paper-card" style={{ padding: '22px 18px' }}>
          <h2
            id="stop-3-title"
            className="marathi-heading"
            style={{ fontSize: '1.25rem', color: '#9B1B30', marginBottom: '8px' }}
          >
            पुण्यातली पहिली भेट
          </h2>

          {/* Animated Metro Train across the screen */}
          <MetroTrackAnimation />

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.85,
              color: '#2D181D',
              margin: '14px 0 20px 0',
            }}
          >
            “दगडूशेठला जाताना मेट्रोमध्ये तू पहिल्यांदा माझा हात धरलास. अनु, आजही तो क्षण आठवला की आपोआप हसू येतं. ❤️”
          </p>

          {/* Dagdusheth Ganpati Selfie with Caption */}
          <div
            className="polaroid-card"
            style={{ maxWidth: '380px', margin: '0 auto', cursor: 'default' }}
          >
            <div
              className="polaroid-photo-frame"
              style={{
                borderRadius: '6px',
                aspectRatio: '3 / 4',
                background: '#111',
              }}
            >
              <img
                src="/assets/images/dagdusheth-selfie.jpeg"
                alt="सौरभ आणि अनु - दगडूशेठ गणपती समोरचा सेल्फी"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div
              className="polaroid-caption"
              style={{
                fontSize: '0.98rem',
                color: '#9B1B30',
                fontWeight: 600,
                padding: '4px 0',
              }}
            >
              एकत्र घेतलेलं दगडूशेठ गणपतीचं दर्शन 🤍
            </div>
          </div>
        </div>
      </article>

      {/* Accessible Full Photo / Note Modal if triggered */}
      {activeModalPhoto && (
        <CandidModal
          photo={activeModalPhoto}
          onClose={() => setActiveModalPhoto(null)}
        />
      )}
    </section>
  );
}

