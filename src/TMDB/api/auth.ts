const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export function getTMDBUrl(path: string, params: URLSearchParams) {
    return `${TMDB_BASE_URL}${path}?${params}`;
}

export function getTMDBHeaders(): HeadersInit {
    if (!TMDB_TOKEN) {
        throw new Error('Missing VITE_TMDB_TOKEN');
    }

    return {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        'Content-Type': 'application/json',
    };
}

export function fetchTMDB(path: string, params: URLSearchParams, signal: AbortSignal) {
    return fetch(getTMDBUrl(path, params), {
        signal,
        headers: getTMDBHeaders(),
    });
}
