/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPinia, setActivePinia } from "pinia";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { Notify } from "quasar";
import { type Tables } from "@/core/models";
import { useShowStore } from "@/modules/show/store/show.store";
import { createMockResponse, mockSupabase } from "@/tests/mocks/supabase.mock";
import supabaseMock from "@/tests/mocks/supabase.mock";
import { addMonths, addYears } from "date-fns";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Setup Quasar and Supabase mocks
installQuasarPlugin();
mockSupabase();

// Add this mock setup before the describe block
vi.mock("quasar", async () => {
  const actual = await vi.importActual("quasar");
  return {
    ...actual,
    Notify: {
      create: vi.fn(),
    },
  };
});

describe("Show Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    // Clear any notifications from previous tests
    vi.mocked(Notify.create).mockClear();
  });

  const mockShow: Tables<"show"> = {
    id: 1,
    venue: 1,
    date: new Date().toISOString(),
    start_time: "19:00",
    end_time: "23:00",
    event: "Test Show",
    fb_url: null,
  };

  const mockShows = [
    mockShow,
    {
      ...mockShow,
      id: 2,
      date: addMonths(new Date(), 1).toISOString(),
    },
    {
      ...mockShow,
      id: 3,
      date: addYears(new Date(), 1).toISOString(),
    },
  ];

  describe("actions", () => {
    it("fetches shows successfully", async () => {
      const store = useShowStore();
      const mockSelect = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue(createMockResponse(mockShows));
      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        select: mockSelect,
        order: mockOrder,
      } as any);

      const result = await store.fetchShows();
      expect(result).toEqual(mockShows);
      expect(store.shows).toEqual(mockShows);
      expect(store.loading).toBe(false);
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockOrder).toHaveBeenCalledWith("date");
    });

    it("handles fetch error", async () => {
      const store = useShowStore();
      const mockSelect = vi.fn().mockReturnThis();
      const mockOrder = vi
        .fn()
        .mockResolvedValue(createMockResponse(null, new Error("Fetch error")));
      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        select: mockSelect,
        order: mockOrder,
      } as any);

      const result = await store.fetchShows();
      expect(result).toBeNull();
      expect(store.shows).toEqual([]);
      expect(store.loading).toBe(false);
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockOrder).toHaveBeenCalledWith("date");
      expectNotification("negative", "Fetch error");
    });

    it("creates show successfully", async () => {
      const store = useShowStore();
      const newShow: Omit<Tables<"show">, "id"> = {
        venue: 1,
        date: new Date().toISOString(),
        start_time: "19:00",
        end_time: "23:00",
        event: "New Show",
        fb_url: null,
      };

      const mockInsert = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockReturns = vi.fn().mockResolvedValue(createMockResponse([{ ...newShow, id: 1 }]));
      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        insert: mockInsert,
        select: mockSelect,
        returns: mockReturns,
      } as any);

      const result = await store.createShow(newShow);
      expect(result).toEqual({ ...newShow, id: 1 });
      expect(store.shows).toHaveLength(1);
      expect(mockInsert).toHaveBeenCalledWith(newShow);
      expect(mockSelect).toHaveBeenCalled();
    });

    it("handles create error when venue is missing", async () => {
      const store = useShowStore();
      const invalidShow = {
        date: new Date().toISOString(),
        start_time: "19:00",
        end_time: "23:00",
        event: "New Show",
        fb_url: null,
        venue: null,
      };

      const result = await store.createShow(invalidShow as any);
      expect(result).toBeNull();
      expect(store.shows).toHaveLength(0);
      expect(Notify.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "negative",
          message: expect.stringContaining("Venue is required"),
        })
      );
    });

    it("handles create error from Supabase", async () => {
      const store = useShowStore();
      const newShow: Omit<Tables<"show">, "id"> = {
        venue: 1,
        date: new Date().toISOString(),
        start_time: "19:00",
        end_time: "23:00",
        event: "New Show",
        fb_url: null,
      };

      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        returns: vi.fn().mockResolvedValue(createMockResponse(null, new Error("Create error"))),
      } as any);

      const result = await store.createShow(newShow);
      expect(result).toBeNull();
      expect(store.shows).toHaveLength(0);
      expect(Notify.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "negative",
          message: expect.stringContaining("Create error"),
        })
      );
    });

    it("updates show successfully", async () => {
      const store = useShowStore();
      store.shows = [mockShow];
      const updatedShow = { ...mockShow, event: "Updated Show" };

      const mockUpdate = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue(createMockResponse(null));
      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        update: mockUpdate,
        eq: mockEq,
      } as any);

      const result = await store.updateShow(updatedShow);
      expect(result).toBe(true);
      expect(store.shows[0]).toEqual(updatedShow);
      expect(mockUpdate).toHaveBeenCalledWith(updatedShow);
      expect(mockEq).toHaveBeenCalledWith("id", updatedShow.id);
    });

    it("handles update error when show ID is missing", async () => {
      const store = useShowStore();
      const invalidShow = { ...mockShow, id: undefined };

      const result = await store.updateShow(invalidShow as any);
      expect(result).toBe(false);
      expect(Notify.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "negative",
          message: expect.stringContaining("Show ID is required"),
        })
      );
    });

    it("handles update error from Supabase", async () => {
      const store = useShowStore();
      store.shows = [mockShow];
      const updatedShow = { ...mockShow, event: "Updated Show" };

      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue(createMockResponse(null, new Error("Update error"))),
      } as any);

      const result = await store.updateShow(updatedShow);
      expect(result).toBe(false);
      expect(Notify.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "negative",
          message: expect.stringContaining("Update error"),
        })
      );
    });

    it("deletes show successfully", async () => {
      const store = useShowStore();
      store.shows = [mockShow];

      const mockDelete = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue(createMockResponse(null));
      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        delete: mockDelete,
        eq: mockEq,
      } as any);

      const result = await store.deleteShow(1);
      expect(result).toBe(true);
      expect(store.shows).toHaveLength(0);
      expect(mockDelete).toHaveBeenCalled();
      expect(mockEq).toHaveBeenCalledWith("id", 1);
    });

    it("handles delete error when show ID is missing", async () => {
      const store = useShowStore();
      const result = await store.deleteShow(0);
      expect(result).toBe(false);
      expect(Notify.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "negative",
          message: expect.stringContaining("Show ID is required"),
        })
      );
    });

    it("handles delete error from Supabase", async () => {
      const store = useShowStore();
      store.shows = [mockShow];

      vi.mocked(supabaseMock.from).mockReturnValueOnce({
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue(createMockResponse(null, new Error("Delete error"))),
      } as any);

      const result = await store.deleteShow(1);
      expect(result).toBe(false);
      expect(Notify.create).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "negative",
          message: expect.stringContaining("Delete error"),
        })
      );
    });
  });

  describe("getters", () => {
    let store: ReturnType<typeof useShowStore>;

    beforeEach(() => {
      store = useShowStore();
      store.shows = mockShows;
    });

    it("gets show by id", () => {
      const show = store.getShowById(1);
      expect(show).toEqual(mockShow);
    });

    it("gets shows on or after date", () => {
      const shows = store.getShowsOnOrAfterDate(new Date());
      expect(shows.length).toBeGreaterThan(0);
    });

    it("gets shows this month", () => {
      const shows = store.getShowsThisMonth;
      expect(shows).toContainEqual(mockShow);
    });

    it("gets shows this year", () => {
      const shows = store.getShowsThisYear;
      expect(shows).toContainEqual(mockShow);
    });

    it("gets shows next year", () => {
      const shows = store.getShowsNextYear;
      expect(shows).toContainEqual(mockShows[2]);
    });

    it("gets shows next month", () => {
      const shows = store.getShowsNextMonth;
      expect(shows).toContainEqual(mockShows[1]);
    });

    it("gets upcoming shows", () => {
      const shows = store.getUpcomingShows;
      expect(shows.length).toBeGreaterThan(0);
    });

    it("gets shows this year by venue", () => {
      const count = store.getShowsThisYearByVenue(1);
      expect(count).toBeGreaterThan(0);
    });
  });

  // Helper function to verify notifications
  const expectNotification = (type: "positive" | "negative", messageContains: string) => {
    expect(Notify.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type,
        message: expect.stringContaining(messageContains),
      })
    );
  };
});
