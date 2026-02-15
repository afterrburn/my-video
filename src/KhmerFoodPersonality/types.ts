import { z } from "zod";

export const FOOD_IDS = [
  "baiSachChrouk",
  "nomBanhChok",
  "prahok",
  "tukKrolok",
  "lokLak",
] as const;

export type FoodId = (typeof FOOD_IDS)[number];

export type FoodPersonality = {
  name: string;
  khmerName: string;
  archetype: string;
  color: string;
  emoji: string;
  tagline: string;
  traits: [string, string, string];
  traitEmojis: [string, string, string];
  image: string;
};

export const FOOD_DATA: Record<FoodId, FoodPersonality> = {
  baiSachChrouk: {
    name: "Bai Sach Chrouk",
    khmerName: "បាយសាច់ជ្រូក",
    archetype: "The Reliable One 🫡",
    color: "#F97316",
    emoji: "🍚",
    tagline: "Always there for you at 6AM ☕",
    traits: ["Consistent", "Warm-hearted", "Early riser"],
    traitEmojis: ["💪", "❤️", "🌅"],
    image: "food/bai-sach-chrouk.jpg",
  },
  nomBanhChok: {
    name: "Nom Banh Chok",
    khmerName: "នំបញ្ចុក",
    archetype: "The Classic 🏆",
    color: "#22C55E",
    emoji: "🍜",
    tagline: "You're everyone's comfort person 🤲",
    traits: ["Traditional", "Nurturing", "Timeless"],
    traitEmojis: ["🏯", "🤗", "✨"],
    image: "food/nom-banh-chok.jpg",
  },
  prahok: {
    name: "Prahok",
    khmerName: "ប្រហុក",
    archetype: "The Bold One 🔥",
    color: "#EF4444",
    emoji: "🔥",
    tagline: "People either love you or hate you 😤",
    traits: ["Unapologetic", "Intense", "Unforgettable"],
    traitEmojis: ["😎", "🧨", "🧠"],
    image: "food/prahok.jpg",
  },
  tukKrolok: {
    name: "Tuk Krolok",
    khmerName: "ទឹកក្រឡុក",
    archetype: "The Trendy One 💅",
    color: "#A855F7",
    emoji: "🥤",
    tagline: "You have 12 aesthetic boards saved 📱",
    traits: ["Trendy", "Sweet", "Main character energy"],
    traitEmojis: ["💅", "🍬", "🌟"],
    image: "food/tuk-krolok.jpg",
  },
  lokLak: {
    name: "Lok Lak",
    khmerName: "ឡុកឡាក់",
    archetype: "The All-Rounder 👑",
    color: "#EAB308",
    emoji: "🥩",
    tagline: "Good at everything, master of vibes 😌",
    traits: ["Versatile", "Crowd-pleaser", "Balanced"],
    traitEmojis: ["🎯", "🎉", "⚖️"],
    image: "food/lok-lak.jpg",
  },
};

export const FOOD_ORDER: FoodId[] = [
  "baiSachChrouk",
  "nomBanhChok",
  "prahok",
  "tukKrolok",
  "lokLak",
];

export const KhmerFoodPersonalitySchema = z.object({
  username: z.string(),
});

export type KhmerFoodPersonalityProps = z.infer<
  typeof KhmerFoodPersonalitySchema
>;

export const FPS = 30;
export const SCENE_DURATIONS = {
  hook: Math.round(2.5 * FPS), // 75 frames
  pick: 4 * FPS, // 120 frames
  reveal: Math.round(3.5 * FPS), // 105 frames
  outro: 3 * FPS, // 90 frames
} as const;

export const TRANSITION_DURATION = 12;

export const FOOD_PERSONALITY_DURATION =
  SCENE_DURATIONS.hook +
  SCENE_DURATIONS.pick +
  SCENE_DURATIONS.reveal * 5 +
  SCENE_DURATIONS.outro -
  7 * TRANSITION_DURATION; // 7 transitions between 8 scenes
