import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { LightLeak } from "@remotion/light-leaks";
import { IntroScene } from "./scenes/IntroScene";
import { CommitStatsScene } from "./scenes/CommitStatsScene";
import { TopLanguagesScene } from "./scenes/TopLanguagesScene";
import { StreakScene } from "./scenes/StreakScene";
import { TopRepoScene } from "./scenes/TopRepoScene";
import { OutroScene } from "./scenes/OutroScene";
import { GitHubWrappedProps } from "./types";

const FPS = 30;
const SCENE_DURATION = 4 * FPS; // 4 seconds per scene
const TRANSITION_DURATION = 15;

export const GitHubWrapped: React.FC<GitHubWrappedProps> = (props) => {
  return (
    <TransitionSeries>
      {/* Scene 1: Intro */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <IntroScene
          username={props.username}
          avatarUrl={props.avatarUrl}
          accentColor={props.accentColor}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 2: Commit Stats */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION + 30}>
        <CommitStatsScene
          totalCommits={props.totalCommits}
          commitsPerMonth={props.commitsPerMonth}
          accentColor={props.accentColor}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Overlay durationInFrames={30}>
        <LightLeak seed={3} />
      </TransitionSeries.Overlay>

      {/* Scene 3: Top Languages */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION + 20}>
        <TopLanguagesScene
          languages={props.languages}
          accentColor={props.accentColor}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 4: Streak */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <StreakScene
          longestStreak={props.longestStreak}
          accentColor={props.accentColor}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 5: Top Repo */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <TopRepoScene
          topRepoName={props.topRepoName}
          topRepoStars={props.topRepoStars}
          accentColor={props.accentColor}
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Overlay durationInFrames={30}>
        <LightLeak seed={7} hueShift={200} />
      </TransitionSeries.Overlay>

      {/* Scene 6: Outro */}
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <OutroScene
          username={props.username}
          avatarUrl={props.avatarUrl}
          totalCommits={props.totalCommits}
          accentColor={props.accentColor}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
