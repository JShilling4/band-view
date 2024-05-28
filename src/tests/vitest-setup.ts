import { installQuasarPlugin } from "./mocks/quasar.mock";

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
