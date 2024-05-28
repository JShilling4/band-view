import NotFound from "@/views/NotFound.vue";
import { mount } from "@vue/test-utils";
import { QBtn } from "quasar";
import mockRouter from "../../mocks/router.mock";

describe("NotFound.vue", () => {
  const wrapper = mount(NotFound, {
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  describe("return button", () => {
    const ReturnButton = wrapper.findComponent(QBtn);

    it("renders a button to return home", () => {
      expect(ReturnButton).toBeDefined();
    });

    it("routes too index when clicked", () => {
      ReturnButton.trigger("click");
      expect(mockRouter.replace).toHaveBeenCalledWith("/");
    });
  });
});
