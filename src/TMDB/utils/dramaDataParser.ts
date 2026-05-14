import { DramaResult } from '../interfaces';
import { Drama } from '../../types';
import { useSyncGenres } from '../hooks/useSyncGenres';


export function dramaDataParser(dramas: DramaResult[]) : Drama[] {

  const { genres } = useSyncGenres();

  const genreList = (Ids : number[]) => {
    return Ids.map(id => genres[id]).join(', ');
  } 
  
  return dramas.map((d) => ({
    id: d.id,
    title: d.title,
    genre: genreList(d.genreIds),
    mood: d.mood ?? 'Unknown',
    country: d.country,
    desc: d.overview,
    rating: d.rating ?? 0,
    watch: d.watch ?? false,
    year: d.year,
    poster: d.posterSmall ?? '',
  }));
}