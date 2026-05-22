import { useEffect, useState } from 'react';
import type { DramaResult } from '../interfaces';
import { localGenres } from './useSyncGenres';

const genreNamesToId = Object.entries(localGenres).reduce<Record<string, number>>((acc, [id, name]) => {
    acc[name] = Number(id);
    return acc;
}, {});

const normalizeRecommendationGenres = (recommendation: DramaResult): DramaResult => {
    const genreNames = String(recommendation.genre ?? '')
        .split(',')
        .map((genre) => genre.trim())
        .filter(Boolean);
    const moods = Array.isArray(recommendation.moods)
        ? recommendation.moods
        : recommendation.mood
            ? [recommendation.mood]
            : [];

    return {
        ...recommendation,
        genre: genreNames.join(', '),
        genreIds: genreNames
            .map((genre) => genreNamesToId[genre])
            .filter((genreId): genreId is number => Number.isFinite(genreId)),
        moods,
    };
};

export const useSyncRecommendations = (): DramaResult[] => {
    const [syncedRecommendations, setSyncedRecommendations] = useState<DramaResult[]>([]);
    const fetchRecommendations = async () => {
        try {
            const response = await fetch('/data/recommendations.json');

            if (!response.ok) {
                throw new Error(`Failed with status ${response.status}`);
            }

            const data: DramaResult[] = await response.json();
            setSyncedRecommendations(data.map(normalizeRecommendationGenres));
        } catch (error) {
            console.error('Failed to load recommendations.json:', error);
            setSyncedRecommendations([]);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return syncedRecommendations;
}
