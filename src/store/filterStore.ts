import type { DramaFilters } from '../TMDB/interfaces';
import { SORT_BY } from '../TMDB/types/sortings';

export type FilterStoreState = {
  filters: DramaFilters;
};

type FilterAction =
  | {
    type: 'filters/update';
    payload: {
      key: keyof DramaFilters;
      value: DramaFilters[keyof DramaFilters];
    };
  }
  | { type: 'filters/reset' };

export const initialFilters: DramaFilters = {
  country: 'All',
  genreId: 'All',
  sortBy: SORT_BY.Popular,
  year: '2026',
  query: '',
  page: 1,
  mood: 'All',
};

const initialState: FilterStoreState = {
  filters: initialFilters,
};

function filterReducer(
  state: FilterStoreState = initialState,
  action: FilterAction
): FilterStoreState {
  switch (action.type) {
    case 'filters/update':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
          page: 1,
        },
      };
    case 'filters/reset':
      return initialState;
    default:
      return state;
  }
}

export const updateFilter = (
  key: keyof DramaFilters,
  value: DramaFilters[keyof DramaFilters]
): FilterAction => ({
  type: 'filters/update',
  payload: { key, value },
});

export const resetFilters = (): FilterAction => ({ type: 'filters/reset' });

function createFilterStore() {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch: (action: FilterAction) => {
      state = filterReducer(state, action);
      listeners.forEach((listener) => listener());
      return action;
    },
  };
}

export const filterStore = createFilterStore();
