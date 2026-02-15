import { interpolate, useCurrentFrame } from "remotion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
};

const generateParticles = (count: number, seed: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const hash = Math.sin(seed + i * 127.1) * 43758.5453;
    const rand = hash - Math.floor(hash);
    const hash2 = Math.sin(seed + i * 269.5) * 18273.1236;
    const rand2 = hash2 - Math.floor(hash2);
    particles.push({
      x: rand * 100,
      y: rand2 * 100,
      size: 2 + rand * 4,
      speed: 0.3 + rand2 * 0.7,
      opacity: 0.2 + rand * 0.5,
      delay: rand2 * 30,
    });
  }
  return particles;
};

const PARTICLES = generateParticles(40, 42);

export const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {PARTICLES.map((p, i) => {
        const y = interpolate(
          frame - p.delay,
          [0, 200],
          [p.y, p.y - p.speed * 40],
          { extrapolateRight: "extend", extrapolateLeft: "clamp" },
        );
        const opacity = interpolate(frame, [0, 20], [0, p.opacity], {
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${((y % 100) + 100) % 100}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};
