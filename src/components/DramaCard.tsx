import type { Drama } from '../types';
import { countryLabel } from '../utils/dramas';

type DramaCardProps = {
  drama: Drama;
  onSave: (title: string) => void;
  onMoreLikeThis: (genre: string) => void;
};

export function DramaCard({ drama, onSave, onMoreLikeThis }: DramaCardProps) {
  return (
    <article className="card h-fit">
      <div className="card-top">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <img
              src={drama.poster}
              alt={drama.title}
              loading="lazy"
              className='size-16 rounded-full object-cover ring-4 ring-blue-500'
            />
            <h4>{drama.title}</h4>
          </div>
          <div className="meta">
            {countryLabel(drama.country)} · {drama.watch}
          </div>
        </div>
        <div className="rating">★ {drama.rating}</div>
      </div>
      <div className="tags">
        <span className="tag">{drama.mood}</span>
        <span className="tag">{drama.genre}</span>
        <span className="tag">Fan pick</span>
      </div>
      <div className="desc">{drama.desc} - {drama.year}</div>
      <div className="actions">
        <button className="primary" onClick={() => onSave(drama.title)}>
          Save to watchlist
        </button>
        <button className="secondary" onClick={() => onMoreLikeThis(drama.genre)}>
          More like this
        </button>
      </div>
    </article>
  );
}
