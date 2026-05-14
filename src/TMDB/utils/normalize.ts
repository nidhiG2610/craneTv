

const IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const normalizeDrama = (item: any, country: string | null) => {
    return {
        id: item.id,
        title: item.name,
        originalTitle: item.original_name,
        overview: item.overview,
        poster: item.poster_path ? `${IMAGE_BASE}/w500${item.poster_path}` : null,
        posterSmall: item.poster_path ? `${IMAGE_BASE}/w185${item.poster_path}` : null,
        backdrop: item.backdrop_path ? `${IMAGE_BASE}/w1280${item.backdrop_path}` : null,
        rating: item.vote_average ? parseFloat(item.vote_average.toFixed(1)) : null,
        voteCount: item.vote_count,
        firstAired: item.first_air_date,
        year: item.first_air_date?.split('-')[0] ?? null,
        genreIds: item.genre_ids ?? [],
        popularity: item.popularity,
        language: item.original_language,
        country: country ?? (item.origin_country?.[0] ?? null),
    };
}
