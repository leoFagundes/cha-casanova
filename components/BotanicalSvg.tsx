interface BotanicalProps {
  color?: string;
  strokeColor?: string;
  className?: string;
}

export default function BotanicalSvg({
  color = "#c9866d",
  strokeColor = "#a05c47",
  className = "",
}: BotanicalProps) {
  return (
    <svg
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 280 C80 220 20 180 10 100 C5 60 30 20 60 30 C90 40 100 80 100 120 C100 80 110 40 140 30 C170 20 195 60 190 100 C180 180 120 220 100 280Z"
        fill={color}
      />
      <line
        x1="100"
        y1="280"
        x2="100"
        y2="50"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M100 160 C70 140 40 150 20 140"
        stroke={strokeColor}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M100 200 C130 180 160 190 180 175"
        stroke={strokeColor}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
