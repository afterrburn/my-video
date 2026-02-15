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

const GlitchText: React.FC<{ text: string; fontSize: number }> = ({
  text,
  fontSize,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 200 } });

  const glitchIntensity =
    frame > 5 && frame < 15
      ? Math.sin(frame * 3) * 4
      : frame > 40 && frame < 45
        ? Math.sin(frame * 5) * 3
        : 0;

  return (
    <div
      style={{
        position: "relative",
        opacity: entrance,
        transform: `scale(${entrance})`,
      }}
    >
      {glitchIntensity !== 0 && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              fontSize,
              fontWeight: 900,
              color: "#ff0040",
              transform: `translate(${glitchIntensity}px, ${-glitchIntensity / 2}px)`,
              clipPath: "inset(10% 0 60% 0)",
            }}
          >
            {text}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              fontSize,
              fontWeight: 900,
              color: "#00ffff",
              transform: `translate(${-glitchIntensity}px, ${glitchIntensity / 2}px)`,
              clipPath: "inset(50% 0 10% 0)",
            }}
          >
            {text}
          </div>
        </>
      )}
      <div
        style={{
          fontSize,
          fontWeight: 900,
          color: "#fff",
          position: "relative",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const TopRepoScene: React.FC<{
  topRepoName: string;
  topRepoStars: number;
  accentColor: string;
}> = ({ topRepoName, topRepoStars, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });

  const starsSpring = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });

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
          gap: 40,
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
          Top Repository
        </div>

        <div
          style={{
            background: "#21262d",
            borderRadius: 20,
            padding: "50px 60px",
            border: `2px solid ${accentColor}44`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            boxShadow: `0 0 80px ${accentColor}22`,
            maxWidth: 800,
          }}
        >
          <div style={{ fontSize: 60, lineHeight: 1 }}>📦</div>

          <GlitchText text={topRepoName} fontSize={56} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: starsSpring,
              transform: `scale(${starsSpring})`,
            }}
          >
            <span style={{ fontSize: 50 }}>⭐</span>
            <AnimatedCounter
              value={topRepoStars}
              fontSize={64}
              color={accentColor}
              delay={25}
            />
            <span
              style={{ fontSize: 32, color: "#8b949e", fontWeight: 400 }}
            >
              stars
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
