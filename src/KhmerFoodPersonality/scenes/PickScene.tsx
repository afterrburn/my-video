import {
  AbsoluteFill,
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

      {/* Food grid - 2 columns, 3 rows (last row centered) */}
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
          const itemSpring = spring({
            frame,
            fps,
            delay: 8 + index * 6,
            config: { damping: 10, stiffness: 100, mass: 0.8 },
          });
          const scale = interpolate(itemSpring, [0, 1], [0, 1]);
          const y = interpolate(itemSpring, [0, 1], [40, 0]);

          return (
            <div
              key={foodId}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                transform: `scale(${scale}) translateY(${y}px)`,
                opacity: itemSpring,
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
                  boxShadow: `0 0 20px ${food.color}44`,
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

              {/* Number + Food name */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: food.color,
                  }}
                >
                  {index + 1}
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
