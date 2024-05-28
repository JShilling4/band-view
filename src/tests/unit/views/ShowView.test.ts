import ShowView from "@/views/ShowView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Quasar from "quasar";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ShowView.vue", () => {
  const wrapper = mount(ShowView, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: {},
    },
    propsData: {
      pageTitle: "Show View Page",
      range: "Upcoming",
    },
    data() {
      return {
        activeShowFilter: null,
      };
    },
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Show View Page");
  });
});
