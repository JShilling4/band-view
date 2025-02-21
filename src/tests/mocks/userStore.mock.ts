import { vi } from "vitest";
import type { State } from "@/stores/user.store";
import { useUserStore } from "@/stores/user.store";

// Get the store type from the actual store
type UserStore = ReturnType<typeof useUserStore>;

export const createMockUserStore = () => {
  const state: State = {
    user: null,
    activeMember: null,
    loading: false,
  };

  return {
    ...state,
    // Getters
    memberRole: vi.fn(() => ""),
    memberFullName: vi.fn(() => ""),
    // Actions
    logIn: vi.fn(),
    getSession: vi.fn(),
    setUser: vi.fn(),
    logOut: vi.fn(),
    // Required Pinia store properties
    $id: "user",
    $state: state,
    $patch: vi.fn(),
    $reset: vi.fn(),
    $subscribe: vi.fn(),
    $dispose: vi.fn(),
    $onAction: vi.fn(),
    _customProperties: new Set<string>(),
  } as unknown as UserStore;
};
