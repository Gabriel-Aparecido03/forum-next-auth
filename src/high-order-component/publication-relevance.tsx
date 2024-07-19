"use client";

import { RelevanceInteractions } from "@/components/ui";
import { usePublicationView } from "@/hooks/user-publication-view";
import { queryClient } from "@/lib/query";
import { getStatsPublication } from "@/services/publication/get-stats-publication";
import { postItsNotRelevancePublication } from "@/services/publication/its-not-relevance-publication";
import { postItsRelevancePublication } from "@/services/publication/its-relevance-publication";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function PublicationRelevance() {
  const [isLoading, setIsLoading] = useState(false);
  const publication = usePublicationView();

  async function handleGetStatsRelevance() {
    try {
      setIsLoading(true);
      const res = await getStatsPublication({ publicationId: publication.id });
      if (res.status === 200) return res.data.count;
      return 0;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const { data } = useQuery({
    queryKey: [`publication-${publication.id}-stats-relevance`],
    queryFn: handleGetStatsRelevance,
  });

  async function handleItsRelevance() {
    setIsLoading(true);
    const res = await postItsRelevancePublication({
      publicationId: publication.id,
    });
    if (res.status === 204) {
      queryClient.fetchQuery({
        queryKey: [`publication-${publication.id}-stats-relevance`],
      });
    }
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleItsNotRelevance() {
    const res = await postItsNotRelevancePublication({ publicationId: publication.id });
    if (res.status === 204) {
      queryClient.fetchQuery({
        queryKey: [`publication-${publication.id}-stats-relevance`],
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
