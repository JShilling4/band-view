export function useArrayUtility() {
  function removeDuplicateStrings(arr: string[]) {
    return arr.filter((value, index) => arr.indexOf(value) === index);
  }

  function removeNullAndEmpty(arr: (string | null)[]) {
    return arr.filter((value): value is string => value !== null && value !== "");
  }

  return { removeDuplicateStrings, removeNullAndEmpty };
}
