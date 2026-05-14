type WatchlistProps = {
  items: string[];
};

export function Watchlist({ items }: WatchlistProps) {
  return (
    <div className="watchlist-box">
      <h3 className="watchlist-title">Watchlist</h3>
      {items.length ? (
        <div>
          {items.map((item) => (
            <div className="watch-item" key={item}>
              • {item}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">No picks saved yet.</div>
      )}
    </div>
  );
}
