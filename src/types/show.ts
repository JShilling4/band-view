import { Tables } from "@/types";

export type ShowFilterNames = "This Month" | "Next Month" | "This Year" | "Last Month" | "Upcoming";

export interface ShowFilter {
  label: ShowFilterNames;
  fn(date?: string | Date | number): Tables<"show">[];
}
