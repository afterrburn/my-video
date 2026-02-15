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
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const OutroScene: React.FC<{ username: string }> = ({ username }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 200 } });

  const ctaSpring = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 200 },
  });

  const handleSpring = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
  });

  const shareSpring = spring({
    frame,
    fps,
    delay: 38,
    config: { damping: 200 },
  });

  const arrowBounce = Math.sin(frame * 0.2) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%)",
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FoodEmojis opacity={0.1} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          zIndex: 1,
        }}
      >
        {/* Question */}
        <div
          style={{
            opacity: mainSpring,
            transform: `scale(${interpolate(mainSpring, [0, 1], [1.2, 1])})`,
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 60px",
          }}
        >
          Did we get yours right?
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaSpring,
            fontSize: 44,
            fontWeight: 700,
            color: "#F97316",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Comment your food! 👇
        </div>

        {/* Share prompt */}
        <div
          style={{
            opacity: shareSpring,
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "#F97316",
            borderRadius: 50,
            padding: "20px 44px",
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            Share with friends
          </span>
          <span
            style={{
              fontSize: 32,
              transform: `translateX(${arrowBounce}px)`,
              display: "inline-block",
            }}
          >
            →
          </span>
        </div>

        {/* TikTok handle */}
        <div
          style={{
            opacity: handleSpring,
            fontSize: 36,
            fontWeight: 700,
            color: "#F97316",
            marginTop: 24,
          }}
        >
          @{username}
        </div>
      </div>
    </AbsoluteFill>
  );
};
