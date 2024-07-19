import { ShimmerText } from "shimmer-effects-react";

export function CommentShimmer() {
  return (
    <div className="w-full min-h-[120px] border border-solid border-zinc-300 gap-3 rounded-lg p-8">
      <div className="w-full items-center justify-between flex">
        <ShimmerText className="w-[12%]" mode="light" line={1} />
        <ShimmerText className="w-[30%]" mode="light" line={1} />
      </div>
      <ShimmerText mode="light" className="mt-2" line={3} />
    </div>
  );
}
