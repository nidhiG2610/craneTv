import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiltersPanel } from '../components/FiltersPanel';
import { ResultsList } from '../components/ResultsList';
import { genreColors } from '../constants';
import { useDramas } from '../hooks/useDramas';
import type { CountryFilter } from '../types';
import { uniqueValues } from '../utils/dramas';
import { useSyncGenres } from '../TMDB/hooks/useSyncGenres';
import { type FilterStoreState } from '../store/filterStore';
import Page from './Page';
import { moods } from '../utils/moods';

export default function General() {
    // const { dramas, loadError } = useDramas();

    const [watchlist, setWatchlist] = useState<string[]>([]);
    const filters = useSelector((state: FilterStoreState) => state.filters);
    const { dramas } = useDramas();
    const { genres } = useSyncGenres();
    const countries: CountryFilter = useMemo(() => uniqueValues(dramas.map((drama) => drama.country)), [dramas]) as unknown as CountryFilter;

    const addToWatchlist = (title: string) => {
        setWatchlist((items) => (items.includes(title) ? items : [...items, title]));
    };

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--genre-tint',
            genreColors[filters.genreId || 'All'] || genreColors.All
        );
    }, [filters.genreId]);

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
            <ResultsList
                onSave={addToWatchlist}
                onMoreLikeThis={() => { console.log('nothing') }}
            />
        </Page>
    );
}
