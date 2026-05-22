import { useEffect, useState } from 'react';

export type GenreLookup = Record<string, string>;

export const localGenres: GenreLookup = {
  '10759': 'Action & Adventure',
  '16': 'Animation',
  '35': 'Comedy',
  '80': 'Crime',
  '99': 'Documentary',
  '18': 'Drama',
  '10749': 'Romance',
  '10751': 'Family',
  '10762': 'Kids',
  '9648': 'Mystery',
  '01': 'Youth',
  '02': 'Slice of Life'
};

export function useSyncGenres() {
  const [genres, setGenres] = useState<GenreLookup>({});

  const loadData = async () => {
    try {
      const response = await fetch('/data/genres.json');
      if (!response.ok) {
        console.log(`Failed with status ${response.status}`);
      }
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Failed to load genre.json:', error);
      setGenres(localGenres);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return { genres };
}
