import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { AnimatedCounter } from "../AnimatedCounter";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const FireEmoji: React.FC<{ delay: number; x: number; scale: number }> = ({
  delay,
  x,
  scale: baseScale,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, delay, config: { damping: 10 } });
  const float = Math.sin((frame - delay) * 0.1) * 8;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: 0,
        fontSize: 80 * baseScale,
        transform: `scale(${s}) translateY(${float}px)`,
        transformOrigin: "bottom center",
      }}
    >
      🔥
    </div>
  );
};

export const StreakScene: React.FC<{
  longestStreak: number;
  accentColor: string;
}> = ({ longestStreak, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });

  const labelSpring = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
  });

  const fires = [
    { delay: 5, x: 15, scale: 0.8 },
    { delay: 10, x: 30, scale: 1.2 },
    { delay: 8, x: 50, scale: 1 },
    { delay: 12, x: 70, scale: 1.1 },
    { delay: 6, x: 85, scale: 0.9 },
  ];

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
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          height: 120,
        }}
      >
        {fires.map((fire, i) => (
          <FireEmoji key={i} {...fire} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          zIndex: 1,
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
          Longest Streak
        </div>

        <div style={{ marginTop: 20 }}>
          <AnimatedCounter
            value={longestStreak}
            fontSize={180}
            color={accentColor}
            delay={10}
          />
        </div>

        <div
          style={{
            opacity: labelSpring,
            fontSize: 48,
            color: "#fff",
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          CONSECUTIVE DAYS
        </div>

        <div
          style={{
            opacity: labelSpring,
            fontSize: 28,
            color: "#8b949e",
            marginTop: 10,
          }}
        >
          You were on fire! 🔥
        </div>
      </div>
    </AbsoluteFill>
  );
};
