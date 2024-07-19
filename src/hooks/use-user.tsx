import { useAppSelector } from "@/redux-hook";

export function useUser() {
  const hook = useAppSelector(state =>  state.user)
  return hook
}