import SettingsView from "@/views/SettingsView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("SettingsView.vue", () => {
  const wrapper = mount(SettingsView, {
    global: {
      plugins: [createTestingPinia()],
      stubs: {},
    },
    propsData: {
      pageTitle: "Settings View Page",
    },
    data() {
      return {};
    },
  });

  it("renders", () => {
    console.log(wrapper.html());
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Settings View Page");
  });
});
