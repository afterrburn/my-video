import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Particles } from "../Particles";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const OutroScene: React.FC<{
  username: string;
  avatarUrl: string;
  totalCommits: number;
  accentColor: string;
}> = ({ username, avatarUrl, totalCommits, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 200 } });

  const statsSpring = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });

  const taglineSpring = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });

  const scale = interpolate(mainSpring, [0, 1], [1.3, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0d1117 0%, ${accentColor}22 50%, #0d1117 100%)`,
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
          transform: `scale(${scale})`,
          opacity: mainSpring,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: `3px solid ${accentColor}`,
            overflow: "hidden",
            boxShadow: `0 0 40px ${accentColor}66`,
          }}
        >
          <Img
            src={avatarUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          @{username}
        </div>

        <div
          style={{
            opacity: statsSpring,
            fontSize: 72,
            fontWeight: 900,
            color: accentColor,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          {totalCommits.toLocaleString()} commits
        </div>

        <div
          style={{
            opacity: statsSpring,
            fontSize: 36,
            color: "#8b949e",
            fontWeight: 400,
          }}
        >
          in 2025
        </div>

        <div
          style={{
            opacity: taglineSpring,
            marginTop: 40,
            fontSize: 40,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Keep shipping. 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};
