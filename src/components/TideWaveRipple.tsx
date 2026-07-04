import type { FC } from 'react';

export const TideWaveRipple: FC = () => {
  return (
    <div className="w-full bg-bg-surface border border-border rounded-lg p-6 my-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-text mb-4">Tide, Wave, and Ripple</h3>
      <svg
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl h-auto"
      >
        {/* Grid Background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-border" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grid)" />

        {/* Primary Trend (The Tide) - Wide, smooth sine wave */}
        <path
          d="M 50,300 Q 250,50 450,200 T 750,50"
          fill="none"
          stroke="var(--bull)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="12 12"
          className="opacity-70"
        />

        {/* Secondary Trend (The Wave) - Medium frequency */}
        <path
          d="M 50,300 Q 150,150 250,160 T 450,200 Q 550,250 650,120 T 750,50"
          fill="none"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
          className="opacity-90"
        />

        {/* Minor Trend (The Ripple) - High frequency, jagged */}
        <path
          d="M 50,300 L 70,270 L 90,285 L 110,230 L 130,245 L 150,180 L 170,150 L 190,175 L 210,130 L 230,165 L 250,160 L 270,195 L 290,170 L 310,210 L 330,180 L 350,225 L 370,195 L 390,240 L 410,210 L 430,230 L 450,200 L 470,225 L 490,250 L 510,220 L 530,245 L 550,210 L 570,180 L 590,205 L 610,150 L 630,175 L 650,120 L 670,145 L 690,100 L 710,115 L 730,70 L 750,50"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Labels */}
        <text x="350" y="70" fill="var(--bull)" fontSize="18" fontWeight="bold">Primary Trend (Tide)</text>
        <text x="500" y="140" fill="#F97316" fontSize="16" fontWeight="bold">Secondary Trend (Wave)</text>
        <text x="120" y="220" fill="#e5e5e5" fontSize="14" fontWeight="bold">Minor Trend (Ripple)</text>
      </svg>
      <p className="text-sm text-text-muted mt-4 text-center max-w-xl">
        Dow's ocean analogy: The tide represents the multi-year macro trend. The waves are the intermediate corrections (secondary trends), and the ripples are the daily price fluctuations (minor trends).
      </p>
    </div>
  );
};
