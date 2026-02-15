import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export const AnimatedCounter: React.FC<{
  value: number;
  fontSize?: number;
  color?: string;
  delay?: number;
}> = ({ value, fontSize = 140, color = "#fff", delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame - delay, [0, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const displayValue = Math.round(progress * value);

  return (
    <span
      style={{
        fontSize,
        fontWeight: "bold",
        color,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {displayValue.toLocaleString()}
    </span>
  );
};
