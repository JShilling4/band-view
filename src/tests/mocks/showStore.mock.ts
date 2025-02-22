import { vi } from "vitest";
import { useShowStore } from "@/stores/show.store";
import type { ShowStoreState } from "@/stores/show.store";
import type { Tables } from "@/types";

// Get the store type from the actual store
type ShowStore = ReturnType<typeof useShowStore>;

export const createMockShowStore = () => {
  const state: ShowStoreState = {
    shows: [],
    loading: false,
  };

  const emptyShowArray: Tables<"show">[] = [];

  return {
    ...state,
    // Getters
    getShowById: vi.fn((id: number) => emptyShowArray.find((show) => show.id === id)),
    getShowsOnOrAfterDate: vi.fn(() => emptyShowArray),
    getShowsThisMonth: vi.fn(() => emptyShowArray),
    getShowsThisYear: vi.fn(() => emptyShowArray),
    getShowsNextYear: vi.fn(() => emptyShowArray),
    getShowsNextMonth: vi.fn(() => emptyShowArray),
    getUpcomingShows: vi.fn(() => emptyShowArray),
    getShowsThisYearByVenue: vi.fn(() => 0),
    // Actions
    fetchShows: vi.fn(),
    createShow: vi.fn(),
    updateShow: vi.fn(),
    deleteShow: vi.fn(),
    // Required Pinia store properties
    $id: "shows",
    $state: state,
    $patch: vi.fn(),
    $reset: vi.fn(),
    $subscribe: vi.fn(),
    $dispose: vi.fn(),
    $onAction: vi.fn(),
    _customProperties: new Set<string>(),
  } as unknown as ShowStore;
};
