import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Particles } from "../Particles";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "900"],
  subsets: ["latin"],
});

export const IntroScene: React.FC<{
  username: string;
  avatarUrl: string;
  accentColor: string;
}> = ({ username, avatarUrl, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarScale = spring({ frame, fps, config: { damping: 12 } });
  const avatarRotation = interpolate(avatarScale, [0, 1], [-180, 0]);

  const titleSpring = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 15 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);

  const yearSpring = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const yearOpacity = yearSpring;

  const subtitleSpring = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0d1117 0%, #161b22 50%, ${accentColor}22 100%)`,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Particles />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          zIndex: 1,
        }}
      >
        <Sequence premountFor={fps}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: `4px solid ${accentColor}`,
              overflow: "hidden",
              transform: `scale(${avatarScale}) rotate(${avatarRotation}deg)`,
              boxShadow: `0 0 60px ${accentColor}66`,
            }}
          >
            <Img
              src={avatarUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Sequence>

        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleSpring,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#8b949e",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            @{username}
          </div>
        </div>

        <div
          style={{
            opacity: yearOpacity,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            2025
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: 12,
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Year in Review
          </div>
        </div>

        <div
          style={{
            opacity: subtitleSpring,
            fontSize: 28,
            color: "#8b949e",
            marginTop: 20,
          }}
        >
          Let's see what you built...
        </div>
      </div>
    </AbsoluteFill>
  );
};
