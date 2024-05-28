import SongView from "@/views/SongView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Quasar from "quasar";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("SongView.vue", () => {
  const wrapper = mount(SongView, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: {},
    },
    propsData: {
      status: "learning",
      pageTitle: "Song View Page",
    },
    data() {
      return {
        statusFilter: null,
      };
    },
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Song View Page");
  });
});
