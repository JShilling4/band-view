import { installQuasarPlugin } from "./mocks/quasar";

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
