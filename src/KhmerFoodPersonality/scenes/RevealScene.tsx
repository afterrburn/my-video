import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  interpolateColors,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadKhmerFont } from "@remotion/google-fonts/Battambang";
import { LightLeak } from "@remotion/light-leaks";
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

  // --- CAMERA SHAKE (frames 0-5) ---
  const shakeIntensity = interpolate(frame, [0, 5], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 25) * shakeIntensity;
  const shakeY = Math.cos(frame * 30) * shakeIntensity;

  // --- COLOR EXPLOSION (frames 0-6) ---
  const bgColor = interpolateColors(
    frame,
    [0, 6],
    ["#0a0a0a", `${food.color}30`],
  );

  // --- PHOTO SLAM (frames 0-12) with Easing.back(3) overshoot ---
  const photoProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(3)),
  });
  const photoScale = interpolate(photoProgress, [0, 1], [0.3, 1]);
  const photoRotation = interpolate(
    frame,
    [0, 12],
    [index % 2 === 0 ? -8 : 8, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(2)),
    },
  );
  const photoOpacity = interpolate(frame, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- KEN BURNS (frames 0-105) ---
  const kenBurns = interpolate(frame, [0, 105], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });

  // --- NAME SLAM (frames 8-18) with Easing.elastic(2) ---
  const nameProgress = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.elastic(2)),
  });
  const nameScale = interpolate(nameProgress, [0, 1], [1.5, 1]);
  const nameOpacity = interpolate(frame, [8, 11], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- ARCHETYPE SNAP (frames 14-22) slides from off-screen ---
  const archProgress = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  const archX = interpolate(archProgress, [0, 1], [400, 0]);
  const archOpacity = interpolate(frame, [14, 17], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- TRAIT BARS (frames 22-80) ---
  const traitBarDelays = [22, 34, 46];

  // --- TAGLINE (frames 50-60) subtle upward slide ---
  const taglineProgress = interpolate(frame, [50, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        backgroundImage: `linear-gradient(135deg, ${bgColor} 0%, ${food.color}40 50%, ${food.color}55 100%)`,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
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
          opacity: photoOpacity,
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
            opacity: photoOpacity,
            fontSize: 28,
            fontWeight: 700,
            color: food.color,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          #{index + 1}
        </div>

        {/* Photo SLAM with Ken Burns */}
        <div
          style={{
            position: "relative",
            transform: `scale(${photoScale}) rotate(${photoRotation}deg)`,
            opacity: photoOpacity,
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
                transform: `scale(${kenBurns})`,
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

        {/* Name SLAM */}
        <div
          style={{
            transform: `scale(${nameScale})`,
            opacity: nameOpacity,
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

        {/* Archetype SNAP from off-screen */}
        <div
          style={{
            opacity: archOpacity,
            transform: `translateX(${archX}px)`,
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

        {/* Animated Trait Bars (skill meters) */}
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
            const barDelay = traitBarDelays[i];
            const barFill = interpolate(
              frame,
              [barDelay, barDelay + 18],
              [0, 0.7 + i * 0.1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.ease),
              },
            );
            const barOpacity = interpolate(
              frame,
              [barDelay, barDelay + 5],
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
                  opacity: barOpacity,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: `${food.color}15`,
                  border: `1px solid ${food.color}33`,
                  borderRadius: 16,
                  padding: "14px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Animated fill bar behind content */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${barFill * 100}%`,
                    background: `${food.color}25`,
                    borderRadius: 16,
                  }}
                />
                <span style={{ fontSize: 42, zIndex: 1 }}>
                  {food.traitEmojis[i]}
                </span>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#fff",
                    zIndex: 1,
                    flex: 1,
                  }}
                >
                  {trait}
                </span>
                {/* Percentage indicator */}
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: food.color,
                    zIndex: 1,
                    opacity: barOpacity,
                  }}
                >
                  {Math.round(barFill * 100)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Tagline — subtle upward slide */}
        <div
          style={{
            opacity: taglineProgress,
            transform: `translateY(${taglineY}px)`,
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

      {/* Light leak overlay tinted to food hue */}
      <AbsoluteFill style={{ opacity: 0.3, mixBlendMode: "screen" }}>
        <LightLeak seed={index * 7 + 13} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
