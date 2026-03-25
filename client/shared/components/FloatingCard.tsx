export const FloatingCard = ({
  title,
  score,
  genre,
  top,
  left,
  right,
  bottom,
  rotate,
  delay,
}: {
  title: string;
  score: number;
  genre: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate: number;
  delay: number;
}) => {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top,
        left,
        right,
        bottom,
        transform: `rotate(${rotate}deg)`,
        animation: `floatCard 6s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.06))",
          border: "1px solid rgba(108,99,255,0.25)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow:
            "0 0 20px rgba(108,99,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
          padding: "12px 14px",
          width: "160px",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(108,99,255,0.6), transparent)",
          }}
        />
        <div className="flex items-center justify-between mb-2">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "#5a6478",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
            }}
          >
            {genre}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#6c63ff",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
            }}
          >
            {score}
          </span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#9ba4b8",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          {title}
        </div>
        <div
          className="relative h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(42,47,62,0.8)" }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${score}%`,
              background: "linear-gradient(90deg, #4b44c0, #6c63ff)",
              boxShadow: "0 0 6px rgba(108,99,255,0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
