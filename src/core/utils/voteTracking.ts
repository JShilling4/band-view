import { v4 as uuidv4 } from "uuid";

// Generate a unique voter ID that's persistent across sessions
export function getVoterIdentifier(): string {
  const STORAGE_KEY = "bandview_voter_id";

  let voterId = localStorage.getItem(STORAGE_KEY);

  if (!voterId) {
    voterId = uuidv4();
    localStorage.setItem(STORAGE_KEY, voterId);
  }

  return voterId;
}

// Hash the voter ID for additional privacy
export function hashVoterIdentifier(identifier: string): string {
  // Simple hash for basic privacy - you might want stronger hashing
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Check if user has already voted on a song
export function hasUserVoted(songId: number): boolean {
  const votedSongs = getVotedSongs();
  return votedSongs.includes(songId);
}

// Get list of songs user has voted on
export function getVotedSongs(): number[] {
  const STORAGE_KEY = "bandview_voted_songs";
  const voted = localStorage.getItem(STORAGE_KEY);
  return voted ? JSON.parse(voted) : [];
}

// Record that user has voted on a song
export function recordVote(songId: number): void {
  const STORAGE_KEY = "bandview_voted_songs";
  const votedSongs = getVotedSongs();

  if (!votedSongs.includes(songId)) {
    votedSongs.push(songId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votedSongs));
  }
}

// Clear all voting data (for testing or user preference)
export function clearVotingData(): void {
  localStorage.removeItem("bandview_voter_id");
  localStorage.removeItem("bandview_voted_songs");
}
