// Get the selected member ID for voting
export function getSelectedMemberId(): number | null {
  const STORAGE_KEY = "bandview_selected_member";
  const memberId = localStorage.getItem(STORAGE_KEY);
  return memberId ? parseInt(memberId, 10) : null;
}

// Set the selected member ID for voting
export function setSelectedMemberId(memberId: number): void {
  const STORAGE_KEY = "bandview_selected_member";
  localStorage.setItem(STORAGE_KEY, memberId.toString());
}

// Get voter identifier (now returns member ID as string for database compatibility)
export function getVoterIdentifier(): string {
  const memberId = getSelectedMemberId();
  if (!memberId) {
    throw new Error("No member selected for voting");
  }
  return memberId.toString();
}
