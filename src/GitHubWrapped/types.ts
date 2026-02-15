import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const GitHubWrappedSchema = z.object({
  username: z.string(),
  avatarUrl: z.string(),
  totalCommits: z.number(),
  longestStreak: z.number(),
  topRepoName: z.string(),
  topRepoStars: z.number(),
  commitsPerMonth: z.array(z.number()).length(12),
  languages: z.array(
    z.object({
      name: z.string(),
      percentage: z.number(),
      color: zColor(),
    }),
  ),
  accentColor: zColor(),
});

export type GitHubWrappedProps = z.infer<typeof GitHubWrappedSchema>;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
