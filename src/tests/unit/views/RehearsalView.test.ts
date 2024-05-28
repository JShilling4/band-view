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
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Rehearsal View Page");
  });
});
