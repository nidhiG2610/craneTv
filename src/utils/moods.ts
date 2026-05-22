import { MOODS } from "../components/vibe-matching-wheel/moodConstants";
import { Mood } from "../types";

export const moods: Mood[] = MOODS.map((mood) => ({
  id: mood.id,
  name: mood.label,
}));

export const moodNameById = moods.reduce<Record<string, string>>((lookup, mood) => {
  lookup[mood.id] = mood.name;
  return lookup;
}, {});

export function getMoodName(moodId?: string) {
  if (!moodId) {
    return 'Unknown';
  }

  return moodNameById[moodId] ?? moodId;
}

export function getMoodNames(moodIds?: string[]) {
  return (moodIds ?? []).map(getMoodName).filter(Boolean);
}