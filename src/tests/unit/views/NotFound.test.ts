import NotFound from "@/views/NotFound.vue";
import { mount } from "@vue/test-utils";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { QBtn } from "quasar";
import { beforeEach, describe, expect, it, vi } from "vitest";
import mockRouter from "../../mocks/router.mock";

// Install Quasar Plugin
installQuasarPlugin();

describe("NotFound.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(NotFound, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct error message", () => {
    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toContain("Ooops!! That page doesn't exist");
    expect(heading.text()).toContain("So you might want to return to your last page");
  });

  describe("return button", () => {
    it("displays 'Return' text", () => {
      const button = wrapper.findComponent(QBtn);
      expect(button.text()).toBe("Return");
    });

    it("navigates to home when clicked", async () => {
      const button = wrapper.findComponent(QBtn);
      await button.trigger("click");
      expect(mockRouter.replace).toHaveBeenCalledWith("/");
      expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    });
  });
});
