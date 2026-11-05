import React, { useState, useRef, useEffect } from 'react';

export default function VoiceReveal({ onAudioEnded, isProposalRevealed }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(74); // ~74s from metadata
  const [hasEnded, setHasEnded] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      onAudioEnded();
    };

    const handleError = () => {
      console.warn('Audio playback error occurred.');
      setAudioError(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [onAudioEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Play prevented or failed:', err);
        setAudioError(true);
      });
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = Number(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.play().then(() => {
      setIsPlaying(true);
      setHasEnded(false);
    }).catch(console.warn);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="audio-player-card" aria-label="सौरभचा आवाज">
      {/* Hidden real HTML audio element */}
      <audio
        ref={audioRef}
        src="/assets/audio/proposal-recording.m4a"
        preload="metadata"
        playsInline
      />

      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2
          className="marathi-heading"
          style={{
            fontSize: '1.28rem',
            color: '#9B1B30',
            lineHeight: 1.5,
            fontWeight: 700,
          }}
        >
          पुढचं वाचण्याआधी… अनु, माझं थोडंसं ऐकशील? 🎧
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#8E777B', marginTop: '4px' }}>
          (सौरभने मनापासून रेकॉर्ड केलेला एक छोटासा संदेश)
        </p>
      </div>

      {audioError && (
        <div
          style={{
            background: '#FDF2F4',
            border: '1px solid #F3CCD3',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.88rem',
            color: '#9B1B30',
            marginBottom: '14px',
            textAlign: 'center',
          }}
        >
          काही कारणास्तव ऑडिओ प्ले होत नसेल, तर काळजी करू नकोस. खालील बटण दाबून पुढे वाचू शकतेस 🤍
        </div>
      )}

      {/* Audio Controls UI */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          alignItems: 'center',
          maxWidth: '380px',
          margin: '0 auto',
        }}
      >
        {/* Progress Bar & Timestamps */}
        <div style={{ width: '100%' }}>
          <input
            type="range"
            min={0}
            max={duration || 74}
            value={currentTime}
            onChange={handleSeek}
            className="audio-slider"
            aria-label="ऑडिओ प्रोग्रेस बार"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: '#8E777B',
              marginTop: '6px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Buttons Row: Play/Pause and Replay */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={togglePlay}
            aria-label={isPlaying ? 'ऑडिओ थांबवा (Pause)' : 'सौरभचा आवाज ऐका (Play)'}
            style={{ minWidth: '150px' }}
          >
            {isPlaying ? (
              <>
                <span style={{ fontSize: '1.2rem' }}>⏸️</span> थांबवा
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.2rem' }}>▶️</span> {currentTime > 0 ? 'चालू ठेवा' : 'ऐका ❤️'}
              </>
            )}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleReplay}
            aria-label="रेकॉर्डिंग पुन्हा ऐका (Replay)"
            title="पुन्हा ऐका"
            style={{ padding: '10px 16px' }}
          >
            🔄 पुन्हा
          </button>
        </div>
      </div>

      {/* Manual Continue / Skip option */}
      <div style={{ textAlign: 'center', marginTop: '22px', borderTop: '1px solid #F0E6D8', paddingTop: '14px' }}>
        {!isProposalRevealed ? (
          <button
            type="button"
            onClick={onAudioEnded}
            style={{
              fontSize: '0.88rem',
              color: '#9B1B30',
              textDecoration: 'underline',
              padding: '6px 12px',
              fontWeight: 500,
            }}
            aria-label="रेकॉर्डिंग ऐकण्याऐवजी थेट पुढे वाचा"
          >
            पुढे वाच ➔
          </button>
        ) : (
          <p style={{ fontSize: '0.82rem', color: '#8E777B', fontStyle: 'italic' }}>
            {hasEnded ? '✨ रेकॉर्डिंग पूर्ण झाले. खालील चिठ्ठी वाचा!' : '💌 खालील चिठ्ठी उघडली आहे.'}
          </p>
        )}
      </div>
    </section>
  );
}

