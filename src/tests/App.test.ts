import App from "@/App.vue";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { installQuasarPlugin } from "./mocks/quasar";
import Quasar from "quasar";
import { useMemberStore, useUserStore } from "@/stores";

const mocks = vi.hoisted(() => {
  return {
    supabase: vi.fn(),
  };
});

vi.mock("@/supabase", () => {
  return {
    supabase: mocks.supabase,
  };
});

installQuasarPlugin();

describe("App.vue", () => {
  const wrapper = mount(App, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: { AppHeader: true, SideNavigation: true, UserMenu: true, RouterView: true },
    },
  });

  const { fetchMembers } = useMemberStore();
  const { getSession } = useUserStore();

  it("renders", () => {
    expect(wrapper).toBeTruthy();
    console.log(wrapper.html());
  });

  it("fetches the correct data", () => {
    expect(fetchMembers).toHaveBeenCalledTimes(1);
    expect(getSession).toHaveBeenCalledTimes(1);
  });
});
