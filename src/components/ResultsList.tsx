import { DramaCard } from './DramaCard';
import type { Drama } from '../types';

type ResultsListProps = {
  dramas: Drama[];
  hasLoadError: boolean;
  onSave: (title: string) => void;
  onMoreLikeThis: () => void;
};

export function ResultsList({ dramas, hasLoadError, onSave, onMoreLikeThis }: ResultsListProps) {
  if (hasLoadError) {
    return (
      <section className="results">
        <div className="panel">
          <strong>Could not load picks.</strong>
          <p className="empty">Check that drama.json is available and try again.</p>
        </div>
      </section>
    );
  }

  if (!dramas.length) {
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
      {dramas.map((drama) => (
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
