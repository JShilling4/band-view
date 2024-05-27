import RehearsalView from "@/views/RehearsalView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Quasar from "quasar";

describe("RehearsalView.vue", () => {
  const wrapper = mount(RehearsalView, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: {},
    },
    propsData: {
      pageTitle: "Rehearsal View Page",
    },
    data() {
      return {};
    },
  });

  it("renders", () => {
    console.log(wrapper.html());
    expect(wrapper).toBeDefined();
  });
});
