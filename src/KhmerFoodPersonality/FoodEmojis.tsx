import { interpolate, useCurrentFrame } from "remotion";

const ALL_FOOD_EMOJIS = [
  "🍚",
  "🍜",
  "🔥",
  "🧋",
  "🥩",
  "🥖",
  "🌶️",
  "🥢",
  "🍛",
  "🥜",
  "🍲",
  "🥘",
  "🍱",
  "🥗",
  "🧆",
  "🍤",
  "🥟",
  "🍖",
  "🫕",
  "🥥",
  "🍠",
  "🧅",
];

type FloatingEmoji = {
  emoji: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  wobble: number;
  pulseOffset: number;
};

const generateEmojis = (count: number, seed: number): FloatingEmoji[] => {
  const emojis: FloatingEmoji[] = [];
  for (let i = 0; i < count; i++) {
    const hash = Math.sin(seed + i * 127.1) * 43758.5453;
    const rand = hash - Math.floor(hash);
    const hash2 = Math.sin(seed + i * 269.5) * 18273.1236;
    const rand2 = hash2 - Math.floor(hash2);
    const hash3 = Math.sin(seed + i * 419.2) * 28571.6831;
    const rand3 = hash3 - Math.floor(hash3);
    emojis.push({
      emoji: ALL_FOOD_EMOJIS[i % ALL_FOOD_EMOJIS.length],
      x: rand * 100,
      y: rand2 * 100,
      size: 40 + rand3 * 50,
      speed: 0.4 + rand * 0.8,
      delay: rand2 * 30,
      wobble: rand3 * 25,
      pulseOffset: rand * Math.PI * 2,
    });
  }
  return emojis;
};

const EMOJIS = generateEmojis(22, 77);

export const FoodEmojis: React.FC<{ opacity?: number; speed?: number }> = ({
  opacity: baseOpacity = 0.3,
  speed: speedMultiplier = 1,
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {EMOJIS.map((e, i) => {
        const adjustedSpeed = e.speed * speedMultiplier;
        const y = interpolate(
          frame - e.delay,
          [0, 300],
          [e.y, e.y - adjustedSpeed * 80],
          { extrapolateRight: "extend", extrapolateLeft: "clamp" },
        );
        const x =
          e.x + Math.sin((frame - e.delay) * 0.04) * e.wobble;
        const opacity = interpolate(frame, [0, 15], [0, baseOpacity], {
          extrapolateRight: "clamp",
        });
        const pulse = 1 + Math.sin(frame * 0.08 + e.pulseOffset) * 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${((y % 120) + 120) % 120}%`,
              fontSize: e.size,
              opacity,
              transform: `rotate(${Math.sin((frame + i * 30) * 0.02) * 15}deg) scale(${pulse})`,
            }}
          >
            {e.emoji}
          </div>
        );
      })}
    </div>
  );
};
