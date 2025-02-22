import { type PostgrestQueryBuilder } from "@supabase/postgrest-js";
import { vi } from "vitest";

// Create a base mock object that satisfies the PostgrestQueryBuilder interface
const createBaseMock = () => ({
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  upsert: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  returns: vi.fn().mockReturnThis(),
  url: "",
  headers: {},
  schema: "",
  signal: undefined as AbortSignal | undefined,
  fetch: undefined,
});

// Create the Supabase client mock
const supabaseMock = {
  from: vi.fn(() => createBaseMock() as unknown as PostgrestQueryBuilder<any, any, any>),
};

// Mock the entire Supabase module
export const mockSupabase = () => {
  vi.mock("@/supabase", () => {
    return {
      __esModule: true,
      default: supabaseMock,
    };
  });
};

export const createMockResponse = <T>(data: T | null = null, error: Error | null = null) => ({
  data,
  error,
});

// Export the mock for direct usage in tests if needed
export default supabaseMock;
