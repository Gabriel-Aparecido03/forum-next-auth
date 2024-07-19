type SeparatorProps = {
  isVertical?: boolean;
};

export function Separator({ isVertical }: SeparatorProps) {
  return <div className={`bg-zinc-200  ${ isVertical ? 'flex flex-1 min-h-2 h-full w-[1px]' : 'h-[1px] w-full'} rounded-full`} />;
}
