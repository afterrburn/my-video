import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { FoodEmojis } from "../FoodEmojis";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "900"],
  subsets: ["latin"],
});

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);

  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  const subtitleSpring = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)",
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FoodEmojis opacity={0.15} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 1,
          transform: `translateY(${titleY}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
            filter: `drop-shadow(0 0 20px rgba(255,255,255,0.3))`,
          }}
        >
          🍽️
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 60px",
            textShadow: `0 0 ${40 * glowPulse}px rgba(255,255,255,0.3)`,
          }}
        >
          Which Khmer food matches your personality?
        </div>

        <div
          style={{
            opacity: subtitleSpring,
            fontSize: 32,
            color: "#F97316",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Think of your answer... 🤔
        </div>
      </div>
    </AbsoluteFill>
  );
};
