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
import { loadFont as loadKhmerFont } from "@remotion/google-fonts/Battambang";
import { FoodPersonality } from "../types";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: khmerFontFamily } = loadKhmerFont("normal", {
  weights: ["700", "900"],
});

export const RevealScene: React.FC<{
  food: FoodPersonality;
  index: number;
}> = ({ food, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Photo + emoji animate in
  const photoSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.8 },
  });

  // Name slides up
  const nameSpring = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12 },
  });
  const nameY = interpolate(nameSpring, [0, 1], [40, 0]);

  // Archetype badge
  const archSpring = spring({
    frame,
    fps,
    delay: 14,
    config: { damping: 200 },
  });

  // Traits slide in one by one
  const traitSprings = food.traits.map((_, i) =>
    spring({
      frame,
      fps,
      delay: 20 + i * 8,
      config: { damping: 12 },
    }),
  );

  // Tagline fades in last
  const taglineSpring = spring({
    frame,
    fps,
    delay: 50,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage: `linear-gradient(135deg, #0a0a0a 0%, ${food.color}40 50%, ${food.color}55 100%)`,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${food.color}22 0%, transparent 70%)`,
          opacity: photoSpring,
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 1,
        }}
      >
        {/* Food number */}
        <div
          style={{
            opacity: photoSpring,
            fontSize: 28,
            fontWeight: 700,
            color: food.color,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          #{index + 1}
        </div>

        {/* Circular food photo with emoji overlay */}
        <div
          style={{
            position: "relative",
            transform: `scale(${interpolate(photoSpring, [0, 1], [0.5, 1])})`,
            opacity: photoSpring,
          }}
        >
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: "50%",
              overflow: "hidden",
              border: `5px solid ${food.color}`,
              boxShadow: `0 0 40px ${food.color}44`,
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
          <div
            style={{
              position: "absolute",
              bottom: -10,
              right: -10,
              fontSize: 64,
              filter: `drop-shadow(0 0 10px ${food.color}66)`,
            }}
          >
            {food.emoji}
          </div>
        </div>

        {/* Food name (Khmer + English) */}
        <div
          style={{
            transform: `translateY(${nameY}px)`,
            opacity: nameSpring,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              fontFamily: khmerFontFamily,
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            {food.khmerName}
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: food.color,
              marginTop: 4,
            }}
          >
            {food.name}
          </div>
        </div>

        {/* Archetype badge */}
        <div
          style={{
            opacity: archSpring,
            transform: `scale(${archSpring})`,
            background: `${food.color}22`,
            border: `2px solid ${food.color}66`,
            borderRadius: 50,
            padding: "10px 32px",
          }}
        >
          <span
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: food.color,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {food.archetype}
          </span>
        </div>

        {/* 3 Traits with slide-in */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
            width: "85%",
          }}
        >
          {food.traits.map((trait, i) => {
            const x = interpolate(traitSprings[i], [0, 1], [300, 0]);
            return (
              <div
                key={i}
                style={{
                  opacity: traitSprings[i],
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: `${food.color}15`,
                  border: `1px solid ${food.color}33`,
                  borderRadius: 16,
                  padding: "14px 24px",
                }}
              >
                <span style={{ fontSize: 42 }}>{food.traitEmojis[i]}</span>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {trait}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineSpring,
            fontSize: 34,
            color: "#aaa",
            textAlign: "center",
            padding: "0 80px",
            marginTop: 8,
            lineHeight: 1.4,
            fontStyle: "italic",
          }}
        >
          {food.tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};
