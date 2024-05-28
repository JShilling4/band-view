import DashboardView from "@/views/DashboardView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("RehearsalView.vue", () => {
  const wrapper = mount(DashboardView, {
    global: {
      plugins: [createTestingPinia()],
      stubs: {},
    },
    propsData: {
      pageTitle: "Dashboard View Page",
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
    expect(heading).toEqual("Dashboard View Page");
  });
});
