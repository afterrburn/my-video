import { interpolate, useCurrentFrame } from "remotion";

const ALL_FOOD_EMOJIS = [
  "\uD83C\uDF5A",
  "\uD83C\uDF5C",
  "\uD83D\uDD25",
  "\uD83E\uDDCB",
  "\uD83E\uDD69",
  "\uD83E\uDD56",
  "\uD83C\uDF36\uFE0F",
  "\uD83E\uDD62",
  "\uD83C\uDF5B",
  "\uD83E\uDD5C",
];

type FloatingEmoji = {
  emoji: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  wobble: number;
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
      size: 30 + rand3 * 40,
      speed: 0.2 + rand * 0.5,
      delay: rand2 * 40,
      wobble: rand3 * 20,
    });
  }
  return emojis;
};

const EMOJIS = generateEmojis(15, 77);

export const FoodEmojis: React.FC<{ opacity?: number }> = ({
  opacity: baseOpacity = 0.3,
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {EMOJIS.map((e, i) => {
        const y = interpolate(
          frame - e.delay,
          [0, 300],
          [e.y, e.y - e.speed * 60],
          { extrapolateRight: "extend", extrapolateLeft: "clamp" },
        );
        const x =
          e.x + Math.sin((frame - e.delay) * 0.03) * e.wobble;
        const opacity = interpolate(frame, [0, 20], [0, baseOpacity], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${((y % 120) + 120) % 120}%`,
              fontSize: e.size,
              opacity,
              transform: `rotate(${Math.sin((frame + i * 30) * 0.02) * 15}deg)`,
            }}
          >
            {e.emoji}
          </div>
        );
      })}
    </div>
  );
};
