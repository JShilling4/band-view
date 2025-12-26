import supabase from "@/plugins/supabase";
import { getVoterIdentifier } from "@/core/utils/voteTracking";

export interface VoteResult {
  success: boolean;
  message: string;
  voteCount?: {
    upvotes: number;
    downvotes: number;
  };
}

export interface VoteCount {
  upvotes: number;
  downvotes: number;
}

export async function submitVote(songId: number, voteType: "up" | "down"): Promise<VoteResult> {
  try {
    const voterIdentifier = getVoterIdentifier();

    // First, check if user has already voted on this song
    const { data: existingVote, error: fetchError } = await supabase
      .from("song_votes")
      .select("vote_type")
      .eq("song_id", songId)
      .eq("voter_identifier", voterIdentifier)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected if no vote exists
      throw fetchError;
    }

    if (existingVote) {
      // User has already voted
      if (existingVote.vote_type === voteType) {
        // Same vote type - not allowed
        return {
          success: false,
          message: `You have already voted ${voteType} on this song.`,
        };
      } else {
        // Different vote type - update existing vote
        const { error: updateError } = await supabase
          .from("song_votes")
          .update({ vote_type: voteType })
          .eq("song_id", songId)
          .eq("voter_identifier", voterIdentifier);

        if (updateError) {
          throw updateError;
        }

        // Get updated vote counts
        const voteCount = await getVoteCounts(songId);

        return {
          success: true,
          message: `Vote changed to ${voteType} successfully!`,
          voteCount,
        };
      }
    } else {
      // No existing vote - insert new vote
      const { error: insertError } = await supabase.from("song_votes").insert({
        song_id: songId,
        voter_identifier: voterIdentifier,
        vote_type: voteType,
      });

      if (insertError) {
        throw insertError;
      }

      // Get updated vote counts
      const voteCount = await getVoteCounts(songId);

      return {
        success: true,
        message: `Vote ${voteType} recorded successfully!`,
        voteCount,
      };
    }
  } catch (error) {
    console.error("Error submitting vote:", error);
    return {
      success: false,
      message: "Failed to submit vote. Please try again.",
    };
  }
}

export async function getVoteCounts(songId: number): Promise<VoteCount> {
  const { data, error } = await supabase
    .from("song_votes")
    .select("vote_type")
    .eq("song_id", songId);

  if (error) {
    console.error("Error fetching vote counts:", error);
    return { upvotes: 0, downvotes: 0 };
  }

  const upvotes = data.filter((vote) => vote.vote_type === "up").length;
  const downvotes = data.filter((vote) => vote.vote_type === "down").length;

  return {
    upvotes,
    downvotes,
  };
}

export async function getUserVote(songId: number): Promise<"up" | "down" | null> {
  try {
    const voterIdentifier = getVoterIdentifier();

    const { data, error } = await supabase
      .from("song_votes")
      .select("vote_type")
      .eq("song_id", songId)
      .eq("voter_identifier", voterIdentifier)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected if no vote exists
      throw error;
    }

    return (data?.vote_type as "up" | "down") || null;
  } catch (error) {
    console.error("Error fetching user vote:", error);
    return null;
  }
}

export async function clearUserVote(songId: number): Promise<VoteResult> {
  try {
    const voterIdentifier = getVoterIdentifier();

    // Delete the vote from database
    const { error } = await supabase
      .from("song_votes")
      .delete()
      .eq("song_id", songId)
      .eq("voter_identifier", voterIdentifier);

    if (error) {
      throw error;
    }

    // Get updated vote counts
    const voteCount = await getVoteCounts(songId);

    return {
      success: true,
      message: "Vote cleared successfully!",
      voteCount,
    };
  } catch (error) {
    console.error("Error clearing vote:", error);
    return {
      success: false,
      message: "Failed to clear vote. Please try again.",
    };
  }
}

export async function getVoteCountsForSongs(songIds: number[]): Promise<Record<number, VoteCount>> {
  if (songIds.length === 0) return {};

  const { data, error } = await supabase
    .from("song_votes")
    .select("song_id, vote_type")
    .in("song_id", songIds);

  if (error) {
    console.error("Error fetching vote counts for songs:", error);
    return {};
  }

  const voteCounts: Record<number, VoteCount> = {};

  // Initialize counts
  songIds.forEach((id) => {
    voteCounts[id] = { upvotes: 0, downvotes: 0 };
  });

  // Count votes
  data.forEach((vote) => {
    if (vote.vote_type === "up") {
      voteCounts[vote.song_id].upvotes++;
    } else {
      voteCounts[vote.song_id].downvotes++;
    }
  });

  return voteCounts;
}
