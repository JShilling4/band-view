import AppSelect from "@/core/components/AppSelect.vue";
import SetlistView from "@/modules/setlist/views/SetlistView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { installQuasarPlugin } from "../../mocks/quasar.mock";
import { QBtn, QSpinner } from "quasar";
import { type Tables } from "@/core/models";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

// Mock composables
const mockSetlistUtility = {
  onAddSetlistClick: vi.fn(),
  showSetlistModal: false,
  localSetlist: null,
  setsToCreate: "",
  setlistModalAction: "",
  onHideSetlistModal: vi.fn(),
  onDeleteSetlist: vi.fn().mockResolvedValue(true),
  onEditSetlistClick: vi.fn(),
};

vi.mock("@/modules/setlist/composables", () => ({
  useSetlistUtility: () => mockSetlistUtility,
}));

// Mock stores with proper types
const mockMemberStore = {
  fetchMembers: vi.fn().mockResolvedValue(undefined),
};

const mockSongStore = {
  fetchSongs: vi.fn().mockResolvedValue(undefined),
};

const mockSetStore = {
  fetchSets: vi.fn().mockResolvedValue(undefined),
  getSetById: vi.fn(),
};

interface SetlistStore {
  fetchSetlists: () => Promise<void>;
  setlists: Array<{
    id: number;
    name: string;
    sets?: number[] | null;
    url?: string | null;
  }>;
  getSetlistById: (id: number) => Tables<"setlist"> | undefined;
}

const mockSetlistStore: SetlistStore = {
  fetchSetlists: vi.fn().mockResolvedValue(undefined),
  setlists: [],
  getSetlistById: vi.fn(),
};

interface UserStore {
  activeMember: {
    permission_level: string;
  } | null;
}

const mockUserStore: UserStore = {
  activeMember: null,
};

vi.mock("@/stores", () => ({
  useMemberStore: () => mockMemberStore,
  useUserStore: () => mockUserStore,
}));
vi.mock("@/modules/song/store", () => ({
  useSongStore: () => mockSongStore,
}));
vi.mock("@/modules/set/store", () => ({
  useSetStore: () => mockSetStore,
}));
vi.mock("@/modules/setlist/store", () => ({
  useSetlistStore: () => mockSetlistStore,
}));

// Mock vue-router
const mockPush = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Install Quasar Plugin
installQuasarPlugin();

function mountSetlistView(
  options: {
    props?: { pageTitle: string; name?: string };
    userPermission?: string;
  } = {}
) {
  const { props = { pageTitle: "Setlists" }, userPermission } = options;

  if (userPermission) {
    mockUserStore.activeMember = { permission_level: userPermission };
  } else {
    mockUserStore.activeMember = null;
  }

  return mount(SetlistView, {
    props,
    global: {
      plugins: [createTestingPinia()],
      stubs: {
        AppPageTitle: true,
        RouterLink: true,
        SetItem: true,
        SetlistModal: true,
      },
      components: {
        AppSelect,
      },
    },
  });
}

describe("SetlistView.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockPush.mockClear();
    wrapper = mountSetlistView();
  });

  describe("initial render", () => {
    it("shows loading spinner during data fetching", async () => {
      const loadingPromise = new Promise(() => {});

      const fetchMembers = mockMemberStore.fetchMembers as Mock;
      const fetchSongs = mockSongStore.fetchSongs as Mock;
      const fetchSets = mockSetStore.fetchSets as Mock;
      const fetchSetlists = mockSetlistStore.fetchSetlists as Mock;

      fetchMembers.mockReturnValueOnce(loadingPromise);
      fetchSongs.mockReturnValueOnce(loadingPromise);
      fetchSets.mockReturnValueOnce(loadingPromise);
      fetchSetlists.mockReturnValueOnce(loadingPromise);

      wrapper = mountSetlistView();

      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(QSpinner).exists()).toBe(true);
    });

    it("shows error message when fetch fails", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const fetchSetlists = mockSetlistStore.fetchSetlists as Mock;
      fetchSetlists.mockRejectedValueOnce(new Error("Failed to fetch"));

      wrapper = mountSetlistView();

      await wrapper.vm.$nextTick();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(wrapper.text()).toContain("Failed to load setlist data");
      consoleSpy.mockRestore();
    });

    it("fetches required data on mount", async () => {
      expect(mockMemberStore.fetchMembers).toHaveBeenCalled();
      expect(mockSongStore.fetchSongs).toHaveBeenCalled();
      expect(mockSetStore.fetchSets).toHaveBeenCalled();
      expect(mockSetlistStore.fetchSetlists).toHaveBeenCalled();
    });
  });

  describe("admin controls", () => {
    it("shows add setlist button for admin users", () => {
      wrapper = mountSetlistView({ userPermission: "admin" });

      const addButton = wrapper.findComponent(QBtn);
      expect(addButton.exists()).toBe(true);
      expect(addButton.attributes("aria-label")).toBe("Add new setlist");
    });

    it("hides admin controls for non-admin users", () => {
      wrapper = mountSetlistView({ userPermission: "member" });

      const addButton = wrapper.findComponent(QBtn);
      expect(addButton.exists()).toBe(false);
    });
  });

  describe("props handling", () => {
    it("sets active tab from name prop", async () => {
      // Set up the mock data first
      mockSetlistStore.setlists = [{ id: 1, name: "Test Setlist" }];

      // Make sure all fetch calls resolve immediately
      const fetchMembers = mockMemberStore.fetchMembers as Mock;
      const fetchSongs = mockSongStore.fetchSongs as Mock;
      const fetchSets = mockSetStore.fetchSets as Mock;
      const fetchSetlists = mockSetlistStore.fetchSetlists as Mock;

      fetchMembers.mockResolvedValue(undefined);
      fetchSongs.mockResolvedValue(undefined);
      fetchSets.mockResolvedValue(undefined);
      fetchSetlists.mockResolvedValue(undefined);

      // Mount with the name prop
      wrapper = mountSetlistView({
        props: {
          pageTitle: "Setlists",
          name: "Test Setlist",
        },
      });

      // Wait for all promises to resolve
      await wrapper.vm.$nextTick();
      await Promise.resolve();

      // Wait one more tick for the loading state to update
      await wrapper.vm.$nextTick();

      // Check if the select exists
      const select = wrapper.findComponent(AppSelect);
      expect(select.exists()).toBe(true);

      // Then check its value
      expect(select.props("modelValue")).toBe("Test Setlist");
    });

    it("updates router query when name prop changes", async () => {
      mockSetlistStore.setlists = [{ id: 1, name: "Test Setlist" }];

      wrapper = mountSetlistView({
        props: {
          pageTitle: "Setlists",
          name: "Test Setlist",
        },
      });

      await wrapper.vm.$nextTick();
      await Promise.resolve();

      expect(mockPush).toHaveBeenCalledWith({
        name: "Setlists",
        query: { name: "Test Setlist" },
      });
    });
  });
});
