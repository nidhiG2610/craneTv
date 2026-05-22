import { DramaResult, DramaFilters } from '../TMDB/interfaces';
import type { Country, Drama } from '../types';

export function uniqueValues(values: string[]) {
  return [...Array.from(new Set(values))];
}

export function countryLabel(country: Country) {
  return country === 'KR' ? 'K-content' : 'C-content';
}

function getDramaMoodIds(drama: DramaResult) {
  if (Array.isArray(drama.moods)) {
    return drama.moods;
  }

  return drama.mood ? [drama.mood] : [];
}

export function filterDramas(
  dramas: DramaResult[],
  filters: DramaFilters
) {
  const query = filters.query ? filters.query.toLowerCase() : undefined;

  return dramas.filter((drama) => {
    const moodMatch = filters.mood === 'All' || getDramaMoodIds(drama).includes(filters.mood);
    const genreMatch = filters.genreId === 'All' || drama.genreIds.includes(filters.genreId);
    const countryMatch = filters.country === 'All' || drama.country === filters.country;
    const searchMatch =
      !query || `${drama.title} ${drama.genre} ${drama.desc}`.toLowerCase().includes(query);

    return moodMatch && genreMatch && countryMatch && searchMatch;
  });
}
