import React from 'react';

import uitmLogoPng from '../../assets/LogoUiTM.png';
const USE_PNG_LOGO = true;

const sizeMap = {
  sm: { width: 80, height: 96, fontSize: 8, subFontSize: 3.5 },
  md: { width: 120, height: 144, fontSize: 12, subFontSize: 5 },
  lg: { width: 160, height: 192, fontSize: 16, subFontSize: 6.5 },
  xl: { width: 240, height: 288, fontSize: 24, subFontSize: 10 },
};

function UiTMLogo({ size = 'md', className = '' }) {
  const dims = sizeMap[size] || sizeMap.md;

  // When USE_PNG_LOGO is true, render the PNG image instead
  if (USE_PNG_LOGO) {
    return (
      <img
        src={uitmLogoPng}
        alt="UiTM Logo"
        width={dims.width}
        height={dims.height}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  return (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 120 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="UiTM Logo"
    >
      {/* Shield / Crest Shape */}
      <path
        d="M60 2 L114 28 L114 80 Q114 120 60 142 Q6 120 6 80 L6 28 Z"
        fill="#0F4C81"
        stroke="#0A3A66"
        strokeWidth="2"
      />

      {/* Inner shield highlight */}
      <path
        d="M60 10 L106 32 L106 78 Q106 114 60 134 Q14 114 14 78 L14 32 Z"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />

      {/* Decorative horizontal band */}
      <rect x="20" y="58" width="80" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="30" y="63" width="60" height="1" rx="0.5" fill="rgba(255,255,255,0.15)" />

      {/* Crown / top accent */}
      <path
        d="M46 24 L52 18 L56 22 L60 16 L64 22 L68 18 L74 24"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* UiTM text - main */}
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fill="white"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="2"
      >
        UiTM
      </text>

      {/* UNIVERSITI TEKNOLOGI MARA - subtitle */}
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="6.5"
        letterSpacing="1"
      >
        UNIVERSITI
      </text>
      <text
        x="60"
        y="92"
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="6.5"
        letterSpacing="1"
      >
        TEKNOLOGI
      </text>
      <text
        x="60"
        y="102"
        textAnchor="middle"
        fill="rgba(255,255,255,0.85)"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        fontSize="6.5"
        letterSpacing="1"
      >
        MARA
      </text>

      {/* Bottom decorative element */}
      <circle cx="60" cy="118" r="3" fill="#F59E0B" opacity="0.8" />
    </svg>
  );
}

export default UiTMLogo;
