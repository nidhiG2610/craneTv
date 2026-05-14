import React, { useState } from 'react';
import { SORT_BY } from '../TMDB/types/sortings';
import { COUNTRIES } from '../TMDB/types/countries';
import { GENRES } from '../TMDB/types/genres';
import { useDramaList } from '../TMDB/hooks/useDramaList';


export default function DramaList() {
  const [filters, setFilters] = useState({
    country: null,
    genreId: null,
    sortBy:  SORT_BY.Popular,
    year:    '2026',
    query:   '',
    page:    1,
  });

  const { dramas, loading, error, totalPages, totalItems } = useDramaList(filters);

  const set = (key:any, val:any) => setFilters(f => ({ ...f, [key]: val, page: 1 }));

  return (
    <div className="drama-list-page">

      {/* ── Filters ── */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search dramas..."
          value={filters.query}
          onChange={e => set('query', e.target.value)}
        />

        <select value={filters.country ?? ''} onChange={e => set('country', e.target.value || null)}>
          {Object.entries(COUNTRIES).map(([label, val]) => (
            <option key={label} value={val ?? ''}>{label}</option>
          ))}
        </select>

        <select value={filters.genreId ?? ''} onChange={e => set('genreId', e.target.value ? Number(e.target.value) : null)}>
          {Object.entries(GENRES).map(([label, val]) => (
            <option key={label} value={val ?? ''}>{label}</option>
          ))}
        </select>

        <select value={filters.sortBy} onChange={e => set('sortBy', e.target.value)}>
          {Object.entries(SORT_BY).map(([label, val]) => (
            <option key={label} value={val}>{label}</option>
          ))}
        </select>

        <select value={filters.year ?? ''} onChange={e => set('year', e.target.value || null)}>
          <option value="">All Years</option>
          {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* ── Status ── */}
      {!loading && !error && (
        <p className="result-count">{totalItems.toLocaleString()} dramas found</p>
      )}

      {/* ── States ── */}
      {loading && <div className="loading">Loading picks...</div>}
      {error   && <div className="error">⚠️ {error.message}</div>}

      {/* ── Drama Grid ── */}
      {!loading && !error && (
        <div className="drama-grid">
          {dramas.map(drama => (
            <div key={drama.id} className="drama-card">
              {drama.poster
                ? <img src={drama.poster} alt={drama.title} loading="lazy" width="200" height="300" />
                : <div className="no-poster">No Image</div>
              }
              <div className="card-info">
                <span className="badge">{drama.country === 'KR' ? 'K' : 'C'}</span>
                <h3>{drama.title}</h3>
                <p className="meta">⭐ {drama.rating ?? 'N/A'} · {drama.year ?? '—'}</p>
                <p className="overview">{drama.overview?.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={filters.page === 1}
            onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
          >← Prev</button>
          <span>Page {filters.page} of {totalPages}</span>
          <button
            disabled={filters.page >= totalPages}
            onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
          >Next →</button>
        </div>
      )}
    </div>
  );
}