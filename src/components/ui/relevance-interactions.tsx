"use client";

import { useUser } from "@/hooks/use-user";
import { CaretDown, CaretUp, Spinner } from "@phosphor-icons/react";
import { Separator } from "./separator";

interface RelevanceInteractionsType {
  onRelevance : () => void
  onNotRelevance : () => void
  isLoading : boolean
  interactionsNumber : number
}

export function RelevanceInteractions({ interactionsNumber ,isLoading ,onNotRelevance ,onRelevance }:RelevanceInteractionsType) {
  
  const { id } = useUser()

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-2 justify-center text-center">
        <button disabled={isLoading && !!id} onClick={onRelevance}>
          <CaretUp />
        </button>
        <span>{ isLoading ? <Spinner className="animate-spin" /> : interactionsNumber }</span>
        <button disabled={isLoading && !!id} onClick={onNotRelevance}>
          <CaretDown />
        </button>
      </div>
      <Separator isVertical />
    </div>
  );
}
