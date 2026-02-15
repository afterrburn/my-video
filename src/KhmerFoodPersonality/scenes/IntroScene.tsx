import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { FoodEmojis } from "../FoodEmojis";
import { LightLeak } from "@remotion/light-leaks";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "900"],
  subsets: ["latin"],
});

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title SLAM: 200% → 100% with Easing.back overshoot
  const titleProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.5)),
  });
  const titleScale = interpolate(titleProgress, [0, 1], [2, 1]);
  const titleOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Plate emoji bounces in with Easing.elastic
  const emojiProgress = interpolate(frame, [4, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.elastic(3)),
  });

  // Pulsing radial background
  const bgPulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

  // Subtitle
  const subtitleSpring = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });

  // Scene zoom: 1.05 → 1.0
  const sceneZoom = interpolate(frame, [0, 75], [1.05, 1.0], {
    extrapolateRight: "clamp",
  });

  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)",
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${sceneZoom})`,
      }}
    >
      {/* Pulsing radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(249,115,22,${0.12 * bgPulse}) 0%, transparent 60%)`,
        }}
      />

      <FoodEmojis opacity={0.15} speed={1.3} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 1,
        }}
      >
        {/* Plate emoji with elastic bounce */}
        <div
          style={{
            fontSize: 90,
            marginBottom: 20,
            filter: `drop-shadow(0 0 25px rgba(255,255,255,0.4))`,
            transform: `scale(${emojiProgress})`,
            opacity: interpolate(frame, [4, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          🍽️
        </div>

        {/* Title SLAM */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 60px",
            textShadow: `0 0 ${40 * glowPulse}px rgba(255,255,255,0.3)`,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
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

      {/* Light leak overlay */}
      <AbsoluteFill style={{ opacity: 0.4, mixBlendMode: "screen" }}>
        <LightLeak seed={42} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
