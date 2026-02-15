import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { AnimatedCounter } from "../AnimatedCounter";
import { MONTHS } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const STAGGER_DELAY = 3;
const BAR_WIDTH = 56;
const CHART_HEIGHT = 400;

export const CommitStatsScene: React.FC<{
  totalCommits: number;
  commitsPerMonth: number[];
  accentColor: string;
}> = ({ totalCommits, commitsPerMonth, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxCommits = Math.max(...commitsPerMonth);

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const counterDelay = 10;

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
          width: "100%",
        }}
      >
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#8b949e",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 6,
            }}
          >
            Total Commits
          </div>
          <div style={{ marginTop: 10 }}>
            <AnimatedCounter
              value={totalCommits}
              fontSize={120}
              color={accentColor}
              delay={counterDelay}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 900,
            height: CHART_HEIGHT + 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 12,
              height: CHART_HEIGHT,
              width: "100%",
            }}
          >
            {commitsPerMonth.map((commits, i) => {
              const barHeight = spring({
                frame,
                fps,
                delay: 20 + i * STAGGER_DELAY,
                config: { damping: 200 },
              });

              const maxBarHeight = CHART_HEIGHT - 40;
              const normalizedHeight = (commits / maxCommits) * maxBarHeight;

              const labelOpacity = interpolate(
                frame - (20 + i * STAGGER_DELAY),
                [0, 10],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      color: "#fff",
                      fontWeight: 700,
                      opacity: labelOpacity,
                    }}
                  >
                    {commits}
                  </div>
                  <div
                    style={{
                      width: BAR_WIDTH,
                      height: barHeight * normalizedHeight,
                      background: `linear-gradient(to top, ${accentColor}, ${accentColor}aa)`,
                      borderRadius: 6,
                      boxShadow: `0 0 20px ${accentColor}44`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 16,
                      color: "#8b949e",
                      fontWeight: 400,
                      opacity: labelOpacity,
                    }}
                  >
                    {MONTHS[i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
