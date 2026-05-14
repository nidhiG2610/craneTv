export type Country = 'KR' | 'CN';

export type CountryFilter = 'all' | Country;

export type Drama = {
  id: string;
  title: string;
  country: Country;
  mood: string;
  genre: string;
  rating: string;
  watch: string;
  desc: string;
  year: string;
  poster: string;
};
