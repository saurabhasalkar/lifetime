import React, { useState } from 'react';

export default function MetroTrackAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="metro-animation-lane" role="img" aria-label="पुणे मेट्रो धावताना">
      {/* Rails */}
      <div className="metro-rail-metal top" />
      <div className="metro-rail-metal bottom" />
      <div className="metro-rail-lines" />

      {/* Sleek Pune Metro Train */}
      <div className={`metro-train-sprite ${isPlaying ? 'running' : ''}`}>
        <svg viewBox="0 0 120 40" width="120" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Train Main Body */}
          <rect x="8" y="6" width="104" height="28" rx="6" fill="#F4F4F6" stroke="#2D181D" strokeWidth="1.5" />
          
          {/* Aerodynamic Front Nose */}
          <path d="M112 12C116 16 117 22 112 30H108V12H112Z" fill="#E65100" />
          
          {/* Pune Metro Saffron & Teal Accent Stripes */}
          <rect x="8" y="24" width="104" height="4" fill="#E65100" />
          <rect x="8" y="28" width="104" height="2" fill="#00838F" />
          
          {/* Windows with Warm Light */}
          <rect x="14" y="10" width="14" height="11" rx="2" fill="#3B2A45" />
          <rect x="34" y="10" width="16" height="11" rx="2" fill="#FFE57F" opacity="0.9" />
          <rect x="56" y="10" width="16" height="11" rx="2" fill="#FFE57F" opacity="0.9" />
          <rect x="78" y="10" width="16" height="11" rx="2" fill="#FFE57F" opacity="0.9" />
          <rect x="99" y="10" width="10" height="11" rx="2" fill="#3B2A45" />
          
          {/* Silhouette of two people holding hands in middle window */}
          <circle cx="61" cy="14" r="2" fill="#9B1B30" />
          <circle cx="67" cy="14" r="2" fill="#9B1B30" />
          <path d="M59 18C59 16 63 16 63 18" stroke="#9B1B30" strokeWidth="1.2" />
          <path d="M65 18C65 16 69 16 69 18" stroke="#9B1B30" strokeWidth="1.2" />
          
          {/* Headlight Beam */}
          <circle cx="114" cy="22" r="2.5" fill="#FFF59D" />
          
          {/* Wheels */}
          <circle cx="24" cy="35" r="3" fill="#424242" />
          <circle cx="36" cy="35" r="3" fill="#424242" />
          <circle cx="82" cy="35" r="3" fill="#424242" />
          <circle cx="94" cy="35" r="3" fill="#424242" />
        </svg>
      </div>
    </div>
  );
}

