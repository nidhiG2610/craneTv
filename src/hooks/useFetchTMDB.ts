import { useState } from 'react';

export function useFetchTMDB() {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticate = async () => {
        setLoading(true);
        setError(null);
        // try {
        //     const res = await fetch(
        //         `${TMDB_BASE_URL}/authentication/token/new?api_key=${TMDB_API_KEY}`
        //     );
        //     const data = await res.json();
        //     if (data.success) {
        //         setToken(data.request_token);
        //     } else {
        //         setError(data.status_message || 'Authentication failed');
        //     }
        // } catch (err: any) {
        //     setError(err.message || 'Unknown error');
        // } finally {
        //     setLoading(false);
        // }
    };

    return { token, loading, error, authenticate };
}