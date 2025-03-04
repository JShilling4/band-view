import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Tables } from "@/core/models";
import { NewShow } from "@/modules/show/models";
import { createMockShowStore } from "@/tests/mocks/showStore.mock";

// Mock the store modules
vi.mock("../../../modules/show/store/show.store.ts", () => ({
  useShowStore: vi.fn(),
}));

describe("useShowUtility", () => {
  // Add common mock data
  const mockShow: Tables<"show"> = {
    id: 1,
    venue: 1,
    date: "2024-03-20",
    start_time: "20:00",
    end_time: "23:00",
    event: "Test Event",
    fb_url: "https://fb.com/event",
  };

  let mockStore: ReturnType<typeof createMockShowStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockStore = createMockShowStore();
    vi.clearAllMocks();
  });

  // Helper function to setup store with custom implementations
  const setupMockStore = (customImplementation = {}) => {
    vi.mocked(useShowStore).mockReturnValue({
      ...mockStore,
      ...customImplementation,
    });
  };

  describe("initial state", () => {
    it("should initialize with default values", () => {
      setupMockStore();
      const { localShow, showShowModal, showModalAction } = useShowUtility();

      expect(localShow.value).toEqual(NewShow());
      expect(showShowModal.value).toBe(false);
      expect(showModalAction.value).toBe("Add");
    });
  });

  describe("onEditShowClick", () => {
    it("should set up edit mode with show data", () => {
      const getShowById = vi.fn(() => mockShow);
      setupMockStore({ getShowById });

      const { onEditShowClick, localShow, showModalAction, showShowModal } = useShowUtility();
      onEditShowClick(1);

      expect(getShowById).toHaveBeenCalledWith(1);
      expect(localShow.value).toEqual(mockShow);
      expect(showModalAction.value).toBe("Edit");
      expect(showShowModal.value).toBe(true);
    });

    it("should do nothing if show is not found", () => {
      const getShowById = vi.fn().mockReturnValue(undefined);
      setupMockStore({ getShowById });

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
      const deleteShow = vi.fn();
      setupMockStore({ deleteShow });

      const { onDeleteShowClick } = useShowUtility();
      onDeleteShowClick(1);

      expect(deleteShow).toHaveBeenCalledWith(1);
    });
  });

  describe("onAddShowClick", () => {
    it("should set up add mode", () => {
      setupMockStore();
      const { onAddShowClick, showModalAction, showShowModal } = useShowUtility();

      onAddShowClick();

      expect(showModalAction.value).toBe("Add");
      expect(showShowModal.value).toBe(true);
    });
  });

  describe("onHideShowModal", () => {
    it("should reset local show to default values", () => {
      setupMockStore();
      const { onHideShowModal, localShow } = useShowUtility();

      // Set some non-default values first
      localShow.value = { ...mockShow };

      onHideShowModal();

      expect(localShow.value).toEqual(NewShow());
    });
  });
});
