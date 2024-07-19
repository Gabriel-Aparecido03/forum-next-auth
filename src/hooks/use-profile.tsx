import { useAppSelector } from "@/redux-hook";

export function useProfile() {
  const hook = useAppSelector(state =>  state.profile)
  return hook
}