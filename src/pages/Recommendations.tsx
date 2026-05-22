import React, { useEffect, useMemo, useState } from 'react';
import { DramaCard } from '../components/DramaCard';
import { CountryFilter } from '../types';
import { useSyncRecommendations } from '../TMDB/hooks/useSyncRecommendations';
import Page from './Page';
import { FiltersPanel } from '../components/FiltersPanel';
import { useSyncGenres } from '../TMDB/hooks/useSyncGenres';
import { genreColors } from '../constants';
import { filterDramas, uniqueValues } from '../utils/dramas';
import { FilterStoreState } from '../store/filterStore';
import { useSelector } from 'react-redux';
import { dramaDataParser } from '../utils/dramaDataParser';
import type { DramaResult } from '../TMDB/interfaces';
import { moods } from '../utils/moods';

export default function Recommendations({ onSave, onMoreLikeThis }: { onSave: (title: string) => void; onMoreLikeThis: () => void }) {

    const recommendations: DramaResult[] = useSyncRecommendations();
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const filters = useSelector((state: FilterStoreState) => state.filters);
    const { genres } = useSyncGenres();
    const countries: CountryFilter = useMemo(() => uniqueValues(recommendations.map((drama) => drama.country)), [recommendations]) as unknown as CountryFilter;

    const addToWatchlist = (title: string) => {
        setWatchlist((items) => (items.includes(title) ? items : [...items, title]));
    };

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--genre-tint',
            genreColors[filters.genreId || 'All'] || genreColors.All
        );
    }, [filters.genreId]);

    const filteredDramas = useMemo(
        () => filterDramas(recommendations, filters),
        [filters.genreId, filters.mood, filters.country, recommendations, filters.query]
    );
    return (
        <Page
            sidebar={
                <FiltersPanel
                    countries={countries}
                    moods={moods}
                    genres={genres}
                    watchlist={watchlist}
                />
            }
        >
            <div className="flex flex-col gap-6">
                {dramaDataParser(filteredDramas, genres).map((drama) => (
                    <DramaCard
                        key={drama.id}
                        drama={drama}
                        onSave={onSave}
                        onMoreLikeThis={onMoreLikeThis}
                    />
                ))}
            </div>
        </Page>
    );
}
