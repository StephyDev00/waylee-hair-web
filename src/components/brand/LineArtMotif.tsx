export function LineArtMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 340"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M150 60c-14 0-24 10-24 22 0 8 6 14 6 22" />
      <path d="M150 60c14 0 24 10 24 22 0 8-6 14-6 22" />
      <path d="M100 110c-6-28 16-58 50-58s56 30 50 58c8 10 8 26 0 40-4 32-4 66-14 92-8 20-24 32-36 32s-28-12-36-32c-10-26-10-60-14-92-8-14-8-30 0-40Z" />
      <path d="M112 150c4-6 12-9 18-4" />
      <path d="M170 150c4-6 12-9 18-4" />
      <path d="M126 176c8 5 18 5 24 0" />
      <path d="M115 118c-14 30-8 70 6 100" />
      <path d="M185 118c14 30 8 70-6 100" />
      <circle cx="120" cy="163" r="4" />
      <path d="M120 167v14" />
      <circle cx="180" cy="163" r="4" />
      <path d="M180 167v14" />
      <path d="M96 96c-18 6-30 26-24 48 4 16 2 34-8 46" />
      <path d="M204 96c18 6 30 26 24 48-4 16-2 34 8 46" />
    </svg>
  );
}
