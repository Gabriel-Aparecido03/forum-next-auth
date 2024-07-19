import { ShimmerText, ShimmerTitle } from "shimmer-effects-react";

export function PublicationPageShimmer() {
  return (
    <div className="w-[96%] max-w-[1200px] mx-auto flex flex-col mt-20">
      <div>
        <div className="items-center justify-start flex">
          <ShimmerText className="w-[12%]" mode="light" line={1} />
          <ShimmerText className="w-[30%]" mode="light" line={1} />
        </div>
        <ShimmerTitle mode="light" height={20} line={1} className="mt-7" />
        <ShimmerText mode="light" className="mt-2" line={20} />
      </div>
    </div>
  );
}
