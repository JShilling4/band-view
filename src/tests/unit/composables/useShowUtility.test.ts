import { createPinia, setActivePinia } from "pinia";
import { createMockShowStore } from "@/tests/mocks/showStore.mock";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useShowUtility } from "@/composables/useShowUtility";
import { useShowStore } from "@/stores";
import { NewShow } from "@/types";
import type { Tables } from "@/types";

// Mock the store module
vi.mock("@/stores", () => ({
  useShowStore: vi.fn(),
}));

describe("useShowUtility", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should initialize with default values", () => {
      // Setup basic mock store
      vi.mocked(useShowStore).mockReturnValue(createMockShowStore());

      const { localShow, showShowModal, showModalAction } = useShowUtility();

      expect(localShow.value).toEqual(NewShow());
      expect(showShowModal.value).toBe(false);
      expect(showModalAction.value).toBe("Add");
    });
  });

  describe("onEditShowClick", () => {
    it("should set up edit mode with show data", () => {
      const mockShow: Tables<"show"> = {
        id: 1,
        venue: 1,
        date: "2024-03-20",
        start_time: "20:00",
        end_time: "23:00",
        event: "Test Event",
        fb_url: "https://fb.com/event",
      };

      // Setup mock store with getShowById implementation
      const getShowById = vi.fn((id: number | null) => mockShow);
      vi.mocked(useShowStore).mockReturnValue({
        ...createMockShowStore(),
        getShowById,
      });

      const { onEditShowClick, localShow, showModalAction, showShowModal } = useShowUtility();

      onEditShowClick(1);

      expect(getShowById).toHaveBeenCalledWith(1);
      expect(localShow.value).toEqual(mockShow);
      expect(showModalAction.value).toBe("Edit");
      expect(showShowModal.value).toBe(true);
    });

    it("should do nothing if show is not found", () => {
      // Setup mock store with getShowById returning undefined
      const getShowById = vi.fn().mockReturnValue(undefined);
      vi.mocked(useShowStore).mockReturnValue({
        ...createMockShowStore(),
        getShowById,
      });

      const { onEditShowClick, localShow, showModalAction, showShowModal } = useShowUtility();
      const initialState = {
        localShow: localShow.value,
        showModalAction: showModalAction.value,
        showShowModal: showShowModal.value,
      };

      onEditShowClick(1);

      expect(getShowById).toHaveBeenCalledWith(1);
      expect(localShow.value).toEqual(initialState.localShow);
      expect(showModalAction.value).toBe(initialState.showModalAction);
      expect(showShowModal.value).toBe(initialState.showShowModal);
    });
  });

  describe("onDeleteShowClick", () => {
    it("should call store deleteShow method", () => {
      // Setup mock store with deleteShow implementation
      const deleteShow = vi.fn();
      vi.mocked(useShowStore).mockReturnValue({
        ...createMockShowStore(),
        deleteShow,
      });

      const { onDeleteShowClick } = useShowUtility();
      onDeleteShowClick(1);

      expect(deleteShow).toHaveBeenCalledWith(1);
    });
  });

  describe("onAddShowClick", () => {
    it("should set up add mode", () => {
      // Setup basic mock store
      vi.mocked(useShowStore).mockReturnValue(createMockShowStore());

      const { onAddShowClick, showModalAction, showShowModal } = useShowUtility();

      onAddShowClick();

      expect(showModalAction.value).toBe("Add");
      expect(showShowModal.value).toBe(true);
    });
  });

  describe("onHideShowModal", () => {
    it("should reset local show to default values", () => {
      // Setup basic mock store
      vi.mocked(useShowStore).mockReturnValue(createMockShowStore());

      const { onHideShowModal, localShow } = useShowUtility();

      // Set some non-default values first
      localShow.value = {
        venue: 1,
        date: "2024-03-20",
        start_time: "20:00",
        end_time: "23:00",
        event: "Test Event",
        fb_url: "https://fb.com/event",
      };

      onHideShowModal();

      expect(localShow.value).toEqual(NewShow());
    });
  });
});
