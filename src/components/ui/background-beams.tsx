// Adapted from manuarora700 / Aceternity, 21st.dev demo 1152.
// Deterministic paths, CSS-only animation and one gradient keep this lightweight.
export function BackgroundBeams() {
  return (
    <svg className="background-beams" viewBox="0 0 1000 600" fill="none" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d={`M${-200 + i * 24} -120 C${-100 + i * 24} 350 ${550 + i * 12} 120 ${600 + i * 24} 750`}
          stroke="currentColor"
          strokeOpacity={0.06 + i * 0.004}
        />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <path
          className="beam-pulse"
          key={i}
          style={{ animationDelay: `${i * -3}s` }}
          d={`M${-200 + i * 100} -120 C${-100 + i * 100} 350 ${550 + i * 48} 120 ${600 + i * 100} 750`}
          stroke="currentColor"
          strokeOpacity=".45"
          strokeDasharray="65 1000"
        />
      ))}
    </svg>
  );
}
