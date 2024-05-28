import SetlistView from "@/views/SetlistView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("SetlistView.vue", () => {
  const wrapper = mount(SetlistView, {
    global: {
      plugins: [createTestingPinia()],
    },
    propsData: {
      pageTitle: "Setlist View Page",
      name: "",
    },
    data() {
      return {
        activeTab: "",
      };
    },
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Setlist View Page");
  });
});
