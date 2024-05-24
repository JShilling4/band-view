import App from "@/App.vue";
import UserMenu from "@/components/UserMenu.vue";
import { VueWrapper, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Quasar from "quasar";
import { useMemberStore, useUserStore } from "@/stores";

describe("App.vue", () => {
  const wrapper = mount(App, {
    global: {
      plugins: [Quasar, createTestingPinia()],
      stubs: { AppHeader: true, SideNavigation: true, UserMenu: true, RouterView: true },
    },
    data() {
      return {
        showRightDrawer: false,
      };
    },
  }) as VueWrapper<typeof App>;

  const { fetchMembers } = useMemberStore();
  const { getSession } = useUserStore();

  it("renders", () => {
    expect(wrapper).toBeDefined();
  });

  it("passes the correct props to UserMenu", () => {
    const userMenu = wrapper.getComponent(UserMenu);
    expect(userMenu).toBeTruthy();

    const userMenuProps = userMenu.props();
    expect(userMenuProps.rightDrawerOpen).toEqual(false);
  });

  it("contains a toggleUserMenu method that inverts showRightDrawer", () => {
    wrapper.vm.toggleUserMenu();
    expect(wrapper.vm.showRightDrawer).toEqual(true);
  });

  it("fetches the correct data", () => {
    expect(fetchMembers).toHaveBeenCalledTimes(1);
    expect(getSession).toHaveBeenCalledTimes(1);
  });
});
