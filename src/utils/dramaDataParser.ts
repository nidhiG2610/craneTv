import { DramaResult } from '../TMDB/interfaces';
import { Drama } from '../types';
import type { GenreLookup } from '../TMDB/hooks/useSyncGenres';
import { getMoodNames } from './moods';

export function dramaDataParser(dramas: DramaResult[], genres: GenreLookup) : Drama[] {
  const genreList = (Ids : number[]) => {
    return Ids.map(id => genres[String(id)]).filter(Boolean).join(', ');
  }

  const moodList = (moodIds?: string[], legacyMoodId?: string) => {
    const ids = moodIds ?? (legacyMoodId ? [legacyMoodId] : []);
    return getMoodNames(ids).join(', ');
  }
  
  return dramas.map((d) => ({
    id: d.id,
    title: d.title,
    genre: genreList(d.genreIds),
    mood: moodList(d.moods, d.mood),
    moods: d.moods ?? (d.mood ? [d.mood] : []),
    country: d.country,
    desc: d.overview || d.desc,
    rating: String(d.rating ?? 0),
    watch: d.watch ?? '',
    year: d.year ?? '',
    poster: d.posterSmall ?? '',
  }));
}
