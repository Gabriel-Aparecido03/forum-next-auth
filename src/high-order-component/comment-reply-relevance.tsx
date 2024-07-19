"use client";

import { RelevanceInteractions } from "@/components/ui";
import { queryClient } from "@/lib/query";
import { getStatsCommentReply } from "@/services/comment-reply/get-stats-comment-reply";
import { itsNotRelevanceCommentReply } from "@/services/comment-reply/its-not-relevance-comment-reply";
import { itsRelevanceCommentReply } from "@/services/comment-reply/its-relevance-comment-reply";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface CommentReplyRelevancePropsType {
  commentReplyId: string;
}

export function CommentReplyRelevance({
  commentReplyId,
}: CommentReplyRelevancePropsType) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGetStatsRelevance() {
    try {
      setIsLoading(true);
      const res = await getStatsCommentReply({ commentReplyId });
      if (res.status === 200) return res.data.count;
      return 0;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const { data } = useQuery({
    queryKey: [`comment-reply-${commentReplyId}-stats-relevance`],
    queryFn: handleGetStatsRelevance,
  });

  async function handleItsRelevance() {
    setIsLoading(true);
    const res = await itsRelevanceCommentReply({ commentReplyId });
    if (res.status === 204) {
      queryClient.fetchQuery({
        queryKey: [`comment-reply-${commentReplyId}-stats-relevance`],
      });
    }
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleItsNotRelevance() {
    setIsLoading(true);
    const res = await itsNotRelevanceCommentReply({ commentReplyId });
    if (res.status === 204) {
      queryClient.fetchQuery({
        queryKey: [`comment-reply-${commentReplyId}-stats-relevance`],
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
