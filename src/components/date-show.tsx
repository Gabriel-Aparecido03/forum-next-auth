import dayjs from "@/lib/day-js";
import { dateFormatPublication } from "@/utils/date-format-publication";
interface DateShowPropsType {
  createdAt : Date
}

export function DateShow({ createdAt }:DateShowPropsType) {
  return (
    <span className="text-xs text-zinc-600">
      {dateFormatPublication(createdAt)} · {dayjs(createdAt).fromNow()}
    </span>
  );
}
