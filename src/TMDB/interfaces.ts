export interface DramaFilters {
    country: string;
    genreId: number | 'All';
    sortBy?: string;
    year?: string | null;
    query?: string;
    page?: number;
    minVotes?: number;
    mood: string;
}

export interface DramaResult {
    // Define the normalized drama shape as returned by normalizeDrama
    // You may want to expand this based on your normalizeDrama output
    [key: string]: any;
}

export interface TMDBApiResponse {
    results: any[];
    total_pages?: number;
    total_results?: number;
}