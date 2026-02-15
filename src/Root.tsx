import "./index.css";
import { Composition, Folder, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { GitHubWrapped } from "./GitHubWrapped";
import { GitHubWrappedSchema } from "./GitHubWrapped/types";
import { KhmerFoodPersonality } from "./KhmerFoodPersonality";
import {
  KhmerFoodPersonalitySchema,
  FOOD_PERSONALITY_DURATION,
} from "./KhmerFoodPersonality/types";

const GITHUB_WRAPPED_DURATION = 6 * 4 * 30 - 4 * 15 + 50; // 6 scenes * 4s - transitions + extra

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Projects">
        <Composition
          id="GitHubWrapped"
          component={GitHubWrapped}
          schema={GitHubWrappedSchema}
          durationInFrames={GITHUB_WRAPPED_DURATION}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            username: "octocat",
            avatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
            totalCommits: 2847,
            longestStreak: 67,
            topRepoName: "my-awesome-project",
            topRepoStars: 1234,
            commitsPerMonth: [
              120, 180, 250, 310, 280, 200, 340, 290, 260, 220, 190, 310,
            ],
            languages: [
              { name: "TypeScript", percentage: 42, color: "#3178c6" },
              { name: "Python", percentage: 28, color: "#3572A5" },
              { name: "Rust", percentage: 18, color: "#dea584" },
              { name: "Go", percentage: 12, color: "#00ADD8" },
            ],
            accentColor: "#58a6ff",
          }}
        />
        <Composition
          id="KhmerFoodPersonality"
          component={KhmerFoodPersonality}
          schema={KhmerFoodPersonalitySchema}
          durationInFrames={FOOD_PERSONALITY_DURATION}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            username: "seng.sh",
          }}
        />
      </Folder>
      <Folder name="Templates">
        <Composition
          id="CaptionedVideo"
          component={CaptionedVideo}
          calculateMetadata={calculateCaptionedVideoMetadata}
          schema={captionedVideoSchema}
          width={1080}
          height={1920}
          defaultProps={{
            src: staticFile("sample-video.mp4"),
          }}
        />
      </Folder>
    </>
  );
};
