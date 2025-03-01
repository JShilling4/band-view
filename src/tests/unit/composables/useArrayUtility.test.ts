import { useArrayUtility } from "@/core/composables";
import { describe, expect, it } from "vitest";

describe("useArrayUtility", () => {
  const { removeDuplicateStrings, removeNullAndEmpty } = useArrayUtility();

  describe("removeDuplicateStrings", () => {
    it("should remove duplicate strings from array", () => {
      const input = ["apple", "banana", "apple", "cherry", "banana"];
      const expected = ["apple", "banana", "cherry"];
      expect(removeDuplicateStrings(input)).toEqual(expected);
    });

    it("should handle empty array", () => {
      expect(removeDuplicateStrings([])).toEqual([]);
    });

    it("should handle array with single item", () => {
      expect(removeDuplicateStrings(["apple"])).toEqual(["apple"]);
    });

    it("should preserve order based on first occurrence", () => {
      const input = ["cherry", "apple", "banana", "apple", "cherry"];
      const expected = ["cherry", "apple", "banana"];
      expect(removeDuplicateStrings(input)).toEqual(expected);
    });
  });

  describe("removeNullAndEmpty", () => {
    it("should remove null and empty strings from array", () => {
      const input = ["apple", "", "banana", null, "cherry", ""];
      const expected = ["apple", "banana", "cherry"];
      expect(removeNullAndEmpty(input)).toEqual(expected);
    });

    it("should handle empty array", () => {
      expect(removeNullAndEmpty([])).toEqual([]);
    });

    it("should handle array with only empty strings and nulls", () => {
      const input = ["", null, "", null];
      expect(removeNullAndEmpty(input)).toEqual([]);
    });

    it("should preserve non-empty strings", () => {
      const input = ["  ", "apple", " banana ", ""];
      const expected = ["  ", "apple", " banana "];
      expect(removeNullAndEmpty(input)).toEqual(expected);
    });
  });
});
