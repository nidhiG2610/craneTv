import { DramaCard } from './DramaCard';
import { useDramas } from '../hooks/useDramas';
import { useMemo } from 'react';
import { filterDramas } from '../utils/dramas';
import { useSelector } from 'react-redux';
import { FilterStoreState } from '../store/filterStore';
import { dramaDataParser } from '../utils/dramaDataParser';
import { useSyncGenres } from '../TMDB/hooks/useSyncGenres';

type ResultsListProps = {
  onSave: (title: string) => void;
  onMoreLikeThis: () => void;
};

export function ResultsList({ onSave, onMoreLikeThis }: ResultsListProps) {

  const { dramas, loadError } = useDramas();
  const { genres } = useSyncGenres();
  const filters = useSelector((state: FilterStoreState) => state.filters);

  const filteredDramas = useMemo(
    () => filterDramas(dramas, filters),
    [filters.genreId, filters.mood, filters.country, dramas, filters.query]
  );

  if (loadError) {
    return (
      <section className="results">
        <div className="panel">
          <strong>Could not load picks.</strong>
          <p className="empty">Check that drama.json is available and try again.</p>
        </div>
      </section>
    );
  }

  if (!filteredDramas.length) {
    return (
      <section className="results">
        <div className="panel">
          <strong>No matches.</strong>
          <p className="empty">Try another mood, genre, or search term.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {dramaDataParser(filteredDramas, genres).map((drama) => (
        <DramaCard
          drama={drama}
          key={drama.id}
          onSave={onSave}
          onMoreLikeThis={onMoreLikeThis}
        />
      ))}
    </section>
  );
}
