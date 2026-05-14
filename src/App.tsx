import { useEffect, useMemo, useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { FiltersPanel } from './components/FiltersPanel';
import { Hero } from './components/Hero';
import { ResultsList } from './components/ResultsList';
import { genreColors } from './constants';
import { useDramas } from './hooks/useDramas';
import type { CountryFilter, Drama } from './types';
import { filterDramas, uniqueValues } from './utils/dramas';
import { useDramaList } from './TMDB/hooks/useDramaList';
import { SORT_BY } from './TMDB/types/sortings';
import { DramaFilters, DramaResult } from './TMDB/interfaces';
import { dramaDataParser } from './TMDB/utils/dramaDataParser';
import { useSyncGenres } from './TMDB/hooks/useSyncGenres';

export default function App() {
  // const { dramas, loadError } = useDramas();

  const [filters, setFilters] = useState<DramaFilters>({
    country: 'All',
    genreId: 'All',
    sortBy: SORT_BY.Popular,
    year: '2026',
    query: '',
    page: 1,
    mood: 'All',
  });

  const set = (key: any, val: any) => setFilters(f => ({ ...f, [key]: val, page: 1 }));
  const [search, setSearch] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const { dramas, loadError } = useDramas();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--genre-tint',
      genreColors[filters.genreId || 'All'] || genreColors.All
    );
  }, [filters.genreId]);

  const moods = useMemo(() => uniqueValues(dramas.map((drama) => drama.mood)), [dramas]);
  const { genres } = useSyncGenres();
  const countries: CountryFilter = useMemo(() => uniqueValues(dramas.map((drama) => drama.country)), [dramas]) as unknown as CountryFilter;


  const filteredDramas = useMemo(
    () => filterDramas(dramas, filters),
    [filters.genreId, filters.mood, filters.country, dramas, filters.query]
  );

  const addToWatchlist = (title: string) => {
    setWatchlist((items) => (items.includes(title) ? items : [...items, title]));
  };

  return (
    <div className="app">
      <AppHeader />
      <Hero />

      <main className="layout">
        <FiltersPanel
          search={filters.query ?? ''}
          countries={countries}
          moods={moods}
          genres={genres}
          country={filters.country}
          activeMood={filters.mood}
          activeGenre={filters.genreId}
          watchlist={watchlist}
          onSearchChange={set}
          onCountryChange={set}
          onMoodChange={set}
          onGenreChange={set}
        />
        <ResultsList
          dramas={dramaDataParser(filteredDramas)}
          hasLoadError={!!loadError}
          onSave={addToWatchlist}
          onMoreLikeThis={() => { console.log('nothing') }}
        />
      </main>
    </div>
  );
}
