import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
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

export const KhmerFoodPersonality: React.FC<KhmerFoodPersonalityProps> = ({
  username,
}) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Hook */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hook}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 2: Pick Your Food */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.pick}>
        <PickScene />
      </TransitionSeries.Sequence>

      {/* Scenes 3-7: Personality Reveals */}
      {FOOD_ORDER.map((foodId, index) => [
        <TransitionSeries.Transition
          key={`transition-${foodId}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />,
        <TransitionSeries.Sequence
          key={foodId}
          durationInFrames={SCENE_DURATIONS.reveal}
        >
          <RevealScene food={FOOD_DATA[foodId]} index={index} />
        </TransitionSeries.Sequence>,
      ])}

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 8: Outro/CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
        <OutroScene username={username} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
