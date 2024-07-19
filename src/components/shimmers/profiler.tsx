import { ShimmerText } from "shimmer-effects-react";

export function ProfilerShimmer() {
  return (
    <div className="w-full items-center justify-between flex">
      <ShimmerText className="w-[12%]" mode="light" line={1} />
      <ShimmerText className="w-[30%]" mode="light" line={1} />
    </div>
  );
}
