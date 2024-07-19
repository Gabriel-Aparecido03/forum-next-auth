import { ShimmerText, ShimmerTitle } from "shimmer-effects-react";

export function PublicationShimmer() {
  return (
    <div className="w-[800px] min-h-[120px] border border-solid border-zinc-300 gap-3 rounded-lg p-8">
      <div className="w-full items-center justify-between flex">
        <ShimmerText className="w-[12%]" mode="light" line={1} />
        <ShimmerText className="w-[30%]" mode="light" line={1} />
      </div>
      <ShimmerTitle mode="light" height={20} line={1} className="mt-7" />
      <ShimmerText mode="light" className="mt-2" line={6} />
    </div>
  );
}
