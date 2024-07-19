"use client";

import { RelevanceInteractions } from "@/components/ui";
import { queryClient } from "@/lib/query";
import { getStatsComment } from "@/services/comments/get-stats-comment";
import { itsNotRelevanceComment } from "@/services/comments/its-not-relevance-comment";
import { itsRelevanceComment } from "@/services/comments/its-relevance-comment";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface CommentRelevancePropsType {
  commentId: string;
}

export function CommentRelevance({ commentId }: CommentRelevancePropsType) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetStatsRelevance() {
    try {
      setIsLoading(true);
      const res = await getStatsComment({ commentId });
      if (res.status === 200) return res.data.count;
      return 0;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const { data } = useQuery({
    queryKey: [`comment-${commentId}-stats-relevance`],
    queryFn: handleGetStatsRelevance,
  });

  async function handleItsRelevance() {
    setIsLoading(true)
    const res = await itsRelevanceComment({ commentId });
    if (res.status === 204) {
      queryClient.fetchQuery({
        queryKey: [`comment-${commentId}-stats-relevance`],
      });
    }
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleItsNotRelevance() {
    setIsLoading(true)
    const res = await itsNotRelevanceComment({ commentId });
    if (res.status === 204) {
      queryClient.fetchQuery({
        queryKey: [`comment-${commentId}-stats-relevance`],
      });
    }
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RelevanceInteractions
      interactionsNumber={data ?? 0}
      isLoading={isLoading}
      onNotRelevance={() => handleItsNotRelevance()}
      onRelevance={() => handleItsRelevance()}
    />
  );
}
