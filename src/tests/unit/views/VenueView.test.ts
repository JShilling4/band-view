import VenueView from "@/views/VenueView.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Quasar from "quasar";

describe("VenueView.vue", () => {
  const wrapper = mount(VenueView, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: {},
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
    console.log(wrapper.html());
    expect(wrapper).toBeDefined();
  });
});
