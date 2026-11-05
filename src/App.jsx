import React, { useState, useRef, useEffect } from 'react';
import AmbientHearts from './components/AmbientHearts';
import SealedEnvelope from './components/SealedEnvelope';
import MetroTimeline from './components/MetroTimeline';
import VoiceReveal from './components/VoiceReveal';
import ProposalNote from './components/ProposalNote';
import MetroTicketKeepsake from './components/MetroTicketKeepsake';
import HerReply from './components/HerReply';
import { triggerRoseCelebration } from './utils/confetti';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isProposalRevealed, setIsProposalRevealed] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  const storySectionRef = useRef(null);
  const proposalSectionRef = useRef(null);
  const ticketSectionRef = useRef(null);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      storySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleRevealProposal = () => {
    setIsProposalRevealed(true);
    setTimeout(() => {
      proposalSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleAcceptProposal = () => {
    setHasAccepted(true);
    triggerRoseCelebration();
    setTimeout(() => {
      ticketSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="app-container">
      {/* Subtle Floating Hearts Background */}
      <AmbientHearts />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Step 1: Sealed Letter / Envelope */}
        <SealedEnvelope
          isOpen={isEnvelopeOpen}
          onOpen={handleOpenEnvelope}
        />

        {/* Step 2: Our Story (Timeline) - Unfolded after envelope opens */}
        {isEnvelopeOpen && (
          <div ref={storySectionRef} style={{ animation: 'fadeIn 0.6s ease forwards' }}>
            <header style={{ textAlign: 'center', margin: '20px 0 28px 0' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--gold-border)',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  color: 'var(--rose-deep)',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}
              >
                🚇 पुढचं स्टेशन: आपलं आयुष्य 🤍
              </div>
              <h2
                className="marathi-heading"
                style={{ fontSize: '1.5rem', color: '#9B1B30', fontWeight: 700 }}
              >
                आपल्या प्रेमाचा प्रवास 💌
              </h2>
            </header>

            {/* Visual Timeline of Stops */}
            <MetroTimeline />

            {/* Step 3: Voice Reveal Audio Note */}
            <VoiceReveal
              onAudioEnded={handleRevealProposal}
              isProposalRevealed={isProposalRevealed}
            />

            {/* Step 4: The Proposal Note */}
            {isProposalRevealed && (
              <div ref={proposalSectionRef} style={{ animation: 'fadeIn 0.7s ease forwards' }}>
                <ProposalNote
                  onAccept={handleAcceptProposal}
                  hasAccepted={hasAccepted}
                />

                {/* Step 5: Metro Ticket Keepsake after "हो ❤️" */}
                {hasAccepted && (
                  <div ref={ticketSectionRef} style={{ animation: 'fadeIn 0.8s ease forwards' }}>
                    <MetroTicketKeepsake />
                  </div>
                )}

                {/* Step 6: Her Reply (reachable with or without "हो") */}
                <HerReply />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Discreet Footer */}
      <footer
        style={{
          textAlign: 'center',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          fontSize: '0.82rem',
          color: '#8E777B',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p>फक्त तुझ्यासाठी, अनु 💕 • कायमस्वरूपी ♾️</p>
      </footer>
    </div>
  );
}

