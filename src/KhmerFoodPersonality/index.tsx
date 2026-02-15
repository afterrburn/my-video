import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { flip } from "@remotion/transitions/flip";
import { IntroScene } from "./scenes/IntroScene";
import { PickScene } from "./scenes/PickScene";
import { RevealScene } from "./scenes/RevealScene";
import { OutroScene } from "./scenes/OutroScene";
import {
  FOOD_DATA,
  FOOD_ORDER,
  KhmerFoodPersonalityProps,
  SCENE_DURATIONS,
  TRANSITION_DURATION,
} from "./types";

const WIDTH = 1080;
const HEIGHT = 1920;

const t = linearTiming({ durationInFrames: TRANSITION_DURATION });

export const KhmerFoodPersonality: React.FC<KhmerFoodPersonalityProps> = ({
  username,
}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Hook */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hook}>
        <IntroScene />
      </TransitionSeries.Sequence>

      {/* Hook → Pick: fade */}
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* Scene 2: Pick Your Food */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.pick}>
        <PickScene />
      </TransitionSeries.Sequence>

      {/* Pick → Reveal 1: clockWipe */}
      <TransitionSeries.Transition
        presentation={clockWipe({ width: WIDTH, height: HEIGHT })}
        timing={t}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
        <RevealScene food={FOOD_DATA[FOOD_ORDER[0]]} index={0} />
      </TransitionSeries.Sequence>

      {/* Reveal 1 → 2: wipe from-left */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={t}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
        <RevealScene food={FOOD_DATA[FOOD_ORDER[1]]} index={1} />
      </TransitionSeries.Sequence>

      {/* Reveal 2 → 3: slide from-bottom */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={t}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
        <RevealScene food={FOOD_DATA[FOOD_ORDER[2]]} index={2} />
      </TransitionSeries.Sequence>

      {/* Reveal 3 → 4: flip */}
      <TransitionSeries.Transition presentation={flip()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
        <RevealScene food={FOOD_DATA[FOOD_ORDER[3]]} index={3} />
      </TransitionSeries.Sequence>

      {/* Reveal 4 → 5: wipe from-right */}
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-right" })}
        timing={t}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.reveal}>
        <RevealScene food={FOOD_DATA[FOOD_ORDER[4]]} index={4} />
      </TransitionSeries.Sequence>

      {/* Reveal 5 → Outro: fade */}
      <TransitionSeries.Transition presentation={fade()} timing={t} />

      {/* Scene 8: Outro/CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
        <OutroScene username={username} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
