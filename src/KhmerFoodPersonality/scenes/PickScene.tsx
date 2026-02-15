import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { FOOD_DATA, FOOD_ORDER } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const PickScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Cycling glow highlight: pulses through each food
  const glowIndex = Math.floor((frame % (FOOD_ORDER.length * 15)) / 15);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)",
        fontFamily,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 120,
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerSpring,
          transform: `scale(${interpolate(headerSpring, [0, 1], [0.8, 1])})`,
          fontSize: 56,
          fontWeight: 900,
          color: "#fff",
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        Pick your favorite! 👇
      </div>

      {/* Food grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 36,
          padding: "0 60px",
          width: "100%",
        }}
      >
        {FOOD_ORDER.map((foodId, index) => {
          const food = FOOD_DATA[foodId];
          const delay = 8 + index * 6;

          // Elastic pop-in with rotation toss
          const popProgress = interpolate(
            frame,
            [delay, delay + 14],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.elastic(2)),
            },
          );
          const scale = popProgress;
          const rotation = interpolate(
            frame,
            [delay, delay + 14],
            [index % 2 === 0 ? -15 : 15, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.elastic(2)),
            },
          );
          const opacity = interpolate(frame, [delay, delay + 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Cycling glow
          const isGlowing = glowIndex === index && frame > delay + 14;
          const glowIntensity = isGlowing
            ? Math.sin(frame * 0.3) * 0.3 + 0.7
            : 0;

          return (
            <div
              key={foodId}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                opacity,
                width: index === 4 ? "auto" : "42%",
              }}
            >
              {/* Circular food photo */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `4px solid ${food.color}`,
                  boxShadow: `0 0 ${20 + glowIntensity * 30}px ${food.color}${isGlowing ? "88" : "44"}`,
                  transition: "box-shadow 0.1s",
                }}
              >
                <Img
                  src={staticFile(food.image)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Bold numbered circle + Food name */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: food.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#fff",
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#fff",
                    marginTop: 4,
                  }}
                >
                  {food.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
