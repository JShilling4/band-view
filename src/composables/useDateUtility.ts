export function useDateUtility() {
  function dateStringToDisplay(dateString: string): string | null {
    if (!dateString) return null;

    const options = {};

    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return { dateStringToDisplay };
}
