import { ChipGroup } from './ChipGroup';
import { Watchlist } from './Watchlist';
import type { Country, CountryFilter } from '../types';
import { GenreChipGroup } from './GenreChipGroup';
import { countryLabel, uniqueValues } from '../utils/dramas';

type FiltersPanelProps = {
  search: string;
  countries: CountryFilter;
  moods: string[];
  genres: string[];
  activeMood: string;
  activeGenre: number | 'All';
  watchlist: string[];
  country: string | null;
  onSearchChange: (key: any, val: any) => void;
  onCountryChange: (key: any, val: any) => void;
  onMoodChange: (key: any, val: any) => void;
  onGenreChange: (key: any, val: any) => void;
};

export function FiltersPanel({
  search,
  countries,
  moods,
  genres,
  activeMood,
  activeGenre,
  watchlist,
  country,
  onSearchChange,
  onCountryChange,
  onMoodChange,
  onGenreChange
}: FiltersPanelProps) {

  return (
    <aside className="panel">
      <h3>Find a pick</h3>
      <div className="group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search title or keyword"
          value={search }
          onChange={(event) => onSearchChange('query', event.target.value)}
        />
      </div>
      <div className="group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          onChange={(event) => onCountryChange('country', event.target.value as CountryFilter)}
        >
          <option value="All">All</option>
          {
            Object.entries(countries).map(([key, label]) => (
              <option key={key} value={label}>{countryLabel(label as Country)}</option>
            ))
          }
        </select>
      </div>
      <ChipGroup label="Mood" items={moods} activeItem={activeMood} onSelect={(item) => onMoodChange('mood', item)} />
      <GenreChipGroup label="Genre" items={genres} activeItem={activeGenre} onSelect={(item) => onGenreChange('genreId', item)} />
      <Watchlist items={watchlist} />
      {/* <DramaList /> */}
    </aside>
  );
}
