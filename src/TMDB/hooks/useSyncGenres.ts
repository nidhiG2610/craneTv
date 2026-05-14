import { useEffect, useState } from 'react';
const localGenres = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },]

export function useSyncGenres() {
  const [genres, setGenres] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const response = await fetch('/data/genres.json');
      if (!response.ok) {
        console.log(`Failed with status ${response.status}`);
      }
      const data= await response.json();
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
