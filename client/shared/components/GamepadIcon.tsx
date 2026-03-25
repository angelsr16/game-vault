export const GamepadIcon = ({ size }: { size?: number }) => (
  <svg
    width={size ? size : 20}
    height={size ? size : 20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    <path d="M6 9h12a3 3 0 0 1 3 3v1a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1a3 3 0 0 1 3-3z" />
  </svg>
);
