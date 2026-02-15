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
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const OutroScene: React.FC<{ username: string }> = ({ username }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text SLAM from 200% with Easing.back
  const mainProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.5)),
  });
  const mainScale = interpolate(mainProgress, [0, 1], [2, 1]);
  const mainOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: "clamp",
  });

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

  // Share button continuous pulse
  const shareOpacity = interpolate(frame, [30, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sharePulse = 1 + Math.sin(frame * 0.15) * 0.06;

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
      <FoodEmojis opacity={0.1} speed={1.2} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          zIndex: 1,
        }}
      >
        {/* Question — SLAM */}
        <div
          style={{
            opacity: mainOpacity,
            transform: `scale(${mainScale})`,
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

        {/* Share prompt — continuous pulse */}
        <div
          style={{
            opacity: shareOpacity,
            transform: `scale(${sharePulse})`,
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

      {/* Light leak overlay */}
      <AbsoluteFill style={{ opacity: 0.35, mixBlendMode: "screen" }}>
        <LightLeak seed={99} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
