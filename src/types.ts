export type Country = 'KR' | 'CN';

export type CountryFilter = 'all' | Country;

export type Mood = {
  id: string;
  name: string;
};

export type Drama = {
  id: string;
  title: string;
  country: Country;
  mood?: string;
  moods?: string[];
  genre: string;
  rating: string;
  watch: string;
  desc: string;
  year: string;
  poster: string;
};

export type VibeMood = {
  id: string;
  emoji: string;
  label: string;
  color: string;
  desc: string;
};

export type VibeScreen = 'home' | 'wheel';

