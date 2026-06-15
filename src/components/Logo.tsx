import React from 'react';

interface LogoProps {
  className?: string; // height or custom classes
  iconOnly?: boolean;  // whether to only show the LW symbol or with text
  isDark?: boolean;    // dynamic styling for light vs dark theme
}

export default function Logo({ className = "h-10", iconOnly = false, isDark = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Precision Vector Representation of the Lumora Web Studio Logo from the uploaded image */}
      <svg
        viewBox={iconOnly ? "0 15 130 105" : "0 15 380 105"}
        className="h-full w-auto max-w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Logo Mark Gradients as observed in the image */}
          {/* L: Dark Rich Indigo/Navy in light mode, bright white/silver/blue in dark mode to ensure high visibility */}
          <linearGradient id="logo-l-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? "#ffffff" : "#0d213a"} />
            <stop offset="100%" stopColor={isDark ? "#93c5fd" : "#1e40af"} />
          </linearGradient>

          {/* W: Bright Sky Blue to Royal Blue Gradient */}
          <linearGradient id="logo-w-gradient" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#00cbfd" />
            <stop offset="50%" stopColor="#0076f6" />
            <stop offset="100%" stopColor="#0046be" />
          </linearGradient>

          {/* Swoosh: Vibrant light-to-dark blue gradient */}
          <linearGradient id="logo-swoosh-gradient" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#00cbfd" />
            <stop offset="70%" stopColor="#005bf5" />
            <stop offset="100%" stopColor="#003594" />
          </linearGradient>
        </defs>

        {/* --- ICON PART (LW monogram, Swoosh, Star) --- */}
        <g id="lw-monogram-symbol">
          {/* Stylized custom Letter "L" with sharp geometric layout and clean thickness */}
          <path
            d="M 33 25 V 102 H 82 C 85 102 86 98 84 95 L 49 90 V 25 H 33 Z"
            fill="url(#logo-l-gradient)"
          />

          {/* Stylized custom Letter "W" intersecting behind L */}
          <path
            d="M 53 52 L 67 106 H 75 L 85 70 L 95 106 H 103 L 118 52 H 107 L 99 87 L 90 55 H 81 L 71 87 L 63 52 Z"
            fill="url(#logo-w-gradient)"
          />

          {/* Precise Crescent Swoosh wrapping under L and crossing W */}
          <path
            d="M 14 90 C 14 90 2 112 40 114 C 75 116 105 102 125 76 C 105 88 80 98 55 100 Q 30 102 24 95 Z"
            fill="url(#logo-swoosh-gradient)"
          />

          {/* Elegant 4-Point Sparkle Star */}
          <path
            d="M 106 18 Q 106 28 96 28 Q 106 28 106 38 Q 106 28 116 28 Q 106 28 106 18"
            fill="#00cbfd"
          />
        </g>

        {/* --- CUSTOM WORDMARK PART (Only when not iconOnly) --- */}
        {!iconOnly && (
          <g id="wordmark">
            {/* Custom vector letters for "LUMORA" to ensure 100% vector accuracy and custom 'A' */}
            {/* Letters fill depends on the current theme (isDark) */}
            <g id="lumora-letters" fill={isDark ? "#ffffff" : "#0f2142"}>
              {/* L */}
              <path d="M 152 39 H 159 V 68 H 172 V 75 H 152 Z" />
              {/* U */}
              <path d="M 182 39 H 189 V 67 C 189 70 191 71 194 71 C 197 71 199 70 199 67 V 39 H 206 V 67 C 206 72.5 200.5 75.5 194 75.5 C 187.5 75.5 182 72.5 182 67 Z" />
              {/* M */}
              <path d="M 218 75 V 39 H 225.5 L 234 60 L 242.5 39 H 250 V 75 H 243 V 49.5 L 236.5 66 H 231.5 L 225 49.5 V 75 Z" />
              {/* O */}
              <path d="M 279 40 C 288.4 40 296 47.6 296 57 C 296 66.4 288.4 74 279 74 C 269.6 74 262 66.4 262 57 C 262 47.6 269.6 40 279 40 Z M 279 47 C 273.5 47 269 51.5 269 57 C 269 62.5 273.5 67 279 67 C 284.5 67 289 62.5 289 57 C 289 51.5 284.5 47 279 47 Z" />
              {/* R */}
              <path d="M 308 75 V 39 H 322 C 328 39 332 42.5 332 48 C 332 53.5 328 57 322 57 H 315 V 75 H 308 Z M 315 50.5 H 321 C 323.5 50.5 325 49.5 325 48 C 325 46.5 323.5 45.5 321 45.5 H 315 Z M 318 57 L 329.5 75 H 321 L 311 58.5 Z" />
              {/* A (Custom triangle shape with open center) */}
              <path d="M 342 75 L 358 39 L 374 75 H 365.5 L 358 58 L 350.5 75 Z" />
            </g>

            {/* Custom Dot nested inside the triangle of the letter 'A' of LUMORA */}
            <circle cx="358" cy="65" r="4.5" fill="#00a2ff" />

            {/* Dash separator line Left */}
            <path d="M 152 92.5 H 191" stroke="#005bf5" strokeWidth="2" strokeLinecap="round" />

            {/* "WEB STUDIO" spacing and typography */}
            <text
              x="262"
              y="97"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
              fontSize="12.5"
              letterSpacing="5.5"
              fill="#005bf5"
            >
              WEB STUDIO
            </text>

            {/* Dash separator line Right */}
            <path d="M 333 92.5 H 372" stroke="#005bf5" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
}
