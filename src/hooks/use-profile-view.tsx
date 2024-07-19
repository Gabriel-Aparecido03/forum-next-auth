import { useAppSelector } from "@/redux-hook";

export function useProfileView() {
  const hook = useAppSelector(state =>  state.profileView)
  return hook
}