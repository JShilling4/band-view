import VenueView from "@/views/VenueView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("VenueView.vue", () => {
  const wrapper = mount(VenueView, {
    global: {
      plugins: [createTestingPinia()],
    },
    propsData: {
      pageTitle: "Venue View Page",
    },
    data() {
      return {
        cityFilter: null,
        filteredVenues: [],
      };
    },
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  it("displays the page title", () => {
    const heading = wrapper.find(".page-title").text();
    expect(heading).toEqual("Venue View Page");
  });
});
