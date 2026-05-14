import { useState, useEffect, useCallback } from 'react';
import { SORT_BY } from '../types/sortings';
import { normalizeDrama } from '../utils/normalize';
import { fetchTMDB } from '../api/auth';
import type { DramaFilters, DramaResult, TMDBApiResponse } from '../interfaces';


/**
 * useDramaList
 * Paginated, filterable list of K-Dramas and/or C-Dramas from TMDB.
 *
 * @param {object} filters
 * @param {string|null} filters.country   - 'KR' | 'CN' | null (both)
 * @param {number|null} filters.genreId   - TMDB genre ID or null
 * @param {string}      filters.sortBy    - SORT_BY value, default popularity.desc
 * @param {string|null} filters.year      - e.g. '2026' or null for all years
 * @param {string}      filters.query     - free-text search query
 * @param {number}      filters.page      - page number, default 1
 * @param {number}      filters.minVotes  - minimum vote count to filter noise
 */


type FetchDramas = (signal: AbortSignal) => Promise<void>;

export function useDramaList({
    country = null,
    genreId = null,
    sortBy = SORT_BY.Popular,
    year = null,
    query = '',
    page = 1,
    minVotes = 50,
}: DramaFilters = {}) {
    const [dramas, setDramas] = useState<DramaResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const fetchDramas: FetchDramas = useCallback(async (signal: AbortSignal): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            // If user typed a search query, use Search API instead of Discover
            const isSearch: boolean = query.trim().length > 0;
            let path: string, params: URLSearchParams;

            if (isSearch) {
                params = new URLSearchParams({
                    query: query.trim(),
                    page: String(page),
                    ...(country !== null ? { region: country as string } : {}),
                });
                path = '/search/tv';
            } else {
                const paramsObj: Record<string, string> = {
                    sort_by: sortBy,
                    'vote_count.gte': String(minVotes),
                    page: String(page),
                };
                if (country) paramsObj.with_origin_country = country;
                if (genreId) paramsObj.with_genres = String(genreId);
                if (year) {
                    paramsObj['first_air_date.gte'] = `${year}-01-01`;
                    paramsObj['first_air_date.lte'] = `${year}-12-31`;
                }
                params = new URLSearchParams(paramsObj);
                path = '/discover/tv';
            }

            const res: Response = await fetchTMDB(path, params, signal);

            if (!res.ok) throw new Error(`TMDB ${res.status}: ${res.statusText}`);

            const data: TMDBApiResponse = await res.json();

            // If country is null (All), fetch both KR + CN and merge
            // For search results, filter by language as approximation
            let results: DramaResult[] = data.results ?? [];

            if (!isSearch && !country) {
                // Fetch CN page separately and merge
                const cnParams = new URLSearchParams({
                    sort_by: sortBy,
                    'vote_count.gte': String(minVotes),
                    with_origin_country: 'CN',
                    page: String(page),
                    ...(genreId ? { with_genres: String(genreId) } : {}),
                    ...(year ? {
                        'first_air_date.gte': `${year}-01-01`,
                        'first_air_date.lte': `${year}-12-31`,
                    } : {}),
                });

                // KR already fetched — re-fetch KR explicitly
                const krParams = new URLSearchParams({ ...Object.fromEntries(cnParams), with_origin_country: 'KR' });
                const [krRes, cnRes]: [Response, Response] = await Promise.all([
                    fetchTMDB('/discover/tv', krParams, signal),
                    fetchTMDB('/discover/tv', cnParams, signal),
                ]);

                const [krData, cnData]: [TMDBApiResponse, TMDBApiResponse] = await Promise.all([krRes.json(), cnRes.json()]);

                const krNorm: DramaResult[] = (krData.results ?? []).map(d => normalizeDrama(d, 'KR'));
                const cnNorm: DramaResult[] = (cnData.results ?? []).map(d => normalizeDrama(d, 'CN'));

                results = [...krNorm, ...cnNorm].sort((a, b) => b.popularity - a.popularity);
                setTotalPages(Math.max(krData.total_pages ?? 1, cnData.total_pages ?? 1));
                setTotalItems((krData.total_results ?? 0) + (cnData.total_results ?? 0));
                setDramas(results);
                return;
            }

            setDramas(results.map(d => normalizeDrama(d, country)));
            setTotalPages(data.total_pages ?? 1);
            setTotalItems(data.total_results ?? 0);

        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === 'AbortError') return;
            setError(err instanceof Error ? err : new Error('Failed to load dramas'));
        } finally {
            setLoading(false);
        }
    }, [country, genreId, sortBy, year, query, page, minVotes]);

    useEffect(() => {
        const controller = new AbortController();
        fetchDramas(controller.signal);
        return () => controller.abort();
    }, [fetchDramas]);

    return { dramas, loading, error, totalPages, totalItems };
}
