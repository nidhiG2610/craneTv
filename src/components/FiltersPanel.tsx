import { Watchlist } from './Watchlist';
import type { Country, CountryFilter, Mood } from '../types';
import { GenreChipGroup } from './GenreChipGroup';
import { countryLabel } from '../utils/dramas';
import { MoodChipGroup } from './MoodChipGroup';
import type { GenreLookup } from '../TMDB/hooks/useSyncGenres';
import { FilterStoreState, updateFilter } from '../store/filterStore';
import { useDispatch, useSelector } from 'react-redux';
import { DramaFilters } from '../TMDB/interfaces';

type FiltersPanelProps = {
  countries: CountryFilter;
  moods: Mood[];
  genres: GenreLookup;
  watchlist: string[];
};

export function FiltersPanel({
  countries,
  moods,
  genres,
  watchlist,
}: FiltersPanelProps) {

  const filters = useSelector((state: FilterStoreState) => state.filters);
  const dispatch = useDispatch();

  const set = (key: keyof DramaFilters, val: DramaFilters[keyof DramaFilters]) => {
    dispatch(updateFilter(key, val));
  };

  return (
    <aside className="panel">
      <h3>Find a pick</h3>
      <div className="group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search title or keyword"
          value={filters.query ?? ''}
          onChange={(event) => set('query', event.target.value)}
        />
      </div>
      <div className="group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          onChange={(event) => set('country', event.target.value as CountryFilter)}
          value={filters.country ?? 'All'}
        >
          <option value="All">All</option>
          {
            Object.entries(countries).map(([key, label]) => (
              <option key={key} value={label}>{countryLabel(label as Country)}</option>
            ))
          }
        </select>
      </div>
      <MoodChipGroup label="Mood" items={moods} activeItem={filters.mood} onSelect={(item) => set('mood', item)} />
      <GenreChipGroup label="Genre" items={genres} activeItem={filters.genreId} onSelect={(item) => set('genreId', item)} />
      <Watchlist items={watchlist} />
      {/* <DramaList /> */}
    </aside>
  );
}
