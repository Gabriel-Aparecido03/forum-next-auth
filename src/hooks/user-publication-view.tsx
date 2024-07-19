import { useAppSelector } from "@/redux-hook";

export function usePublicationView() {
  const hook = useAppSelector(state =>  state.publicationView)
  return hook
}