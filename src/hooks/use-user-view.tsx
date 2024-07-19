import { useAppSelector } from "@/redux-hook";

export function useUserView() {
  const hook = useAppSelector(state =>  state.userView)
  return hook
}