import SettingsView from "@/views/SettingsView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("SettingsView.vue", () => {
  const wrapper = mount(SettingsView, {
    global: {
      plugins: [createTestingPinia()],
    },
    propsData: {
      pageTitle: "Settings View Page",
    },
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Settings View Page");
  });
});
