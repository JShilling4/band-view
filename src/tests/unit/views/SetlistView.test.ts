import SetlistView from "@/views/SetlistView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Quasar from "quasar";

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("SetlistView.vue", () => {
  const wrapper = mount(SetlistView, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: {},
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
    console.log(wrapper.html());
    expect(wrapper).toBeDefined();
  });
});
