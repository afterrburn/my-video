import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const PIE_SIZE = 360;
const RADIUS = 140;
const CENTER = PIE_SIZE / 2;
const STROKE_WIDTH = 50;

export const TopLanguagesScene: React.FC<{
  languages: { name: string; percentage: number; color: string }[];
  accentColor: string;
}> = ({ languages, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });
  const circumference = 2 * Math.PI * RADIUS;

  let cumulativeOffset = 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
            fontSize: 32,
            color: "#8b949e",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          Top Languages
        </div>

        <svg width={PIE_SIZE} height={PIE_SIZE}>
          {languages.map((lang, i) => {
            const segmentLength = (lang.percentage / 100) * circumference;
            const progress = spring({
              frame,
              fps,
              delay: 10 + i * 8,
              config: { damping: 200 },
            });

            const dashOffset = interpolate(
              progress,
              [0, 1],
              [segmentLength, 0],
            );

            const rotation = (cumulativeOffset / circumference) * 360 - 90;
            cumulativeOffset += segmentLength;

            return (
              <circle
                key={i}
                r={RADIUS}
                cx={CENTER}
                cy={CENTER}
                fill="none"
                stroke={lang.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={dashOffset}
                transform={`rotate(${rotation} ${CENTER} ${CENTER})`}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 500,
          }}
        >
          {languages.map((lang, i) => {
            const entrySpring = spring({
              frame,
              fps,
              delay: 15 + i * 8,
              config: { damping: 200 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: entrySpring,
                  transform: `translateX(${interpolate(entrySpring, [0, 1], [40, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: lang.color,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    fontSize: 30,
                    color: "#fff",
                    fontWeight: 700,
                    flex: 1,
                  }}
                >
                  {lang.name}
                </div>
                <div
                  style={{
                    fontSize: 30,
                    color: "#8b949e",
                    fontWeight: 400,
                  }}
                >
                  {lang.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
