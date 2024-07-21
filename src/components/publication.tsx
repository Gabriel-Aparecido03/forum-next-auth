import { dateFormatPublication } from "@/utils/date-format-publication";
import { useRouter } from "next/navigation";
import { ProfileTag } from "./profile-tag";

interface PostPropsType {
  username: string;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
  description: string;
  profileId : string
  id: string;
}

export function Publication({
  createdAt,
  description,
  id,
  username,
  profileId,
  updatedAt,
  title,
}: PostPropsType) {

  const router = useRouter()

  const titleExcerpt =
    title.length > 100 ? title.slice(0, 100).concat("...") : title;
  const descriptionExcerpt =
    description.length > 200
      ? description.slice(0, 200).concat("...")
      : description;

  return (
    <div
      onClick={() => router.push(`/app/publication/${id}`)}
      data-testid="publication-link-test"
      className="p-8 rounded-lg min-h-[150px] border border-solid border-zinc-300 flex items-start justify-center gap-3 w-[800px] hover:cursor-pointer flex-col hover:border-zinc-600 z-0"
    >
      <div className="w-full items-center justify-between flex">
        <ProfileTag username={username} />
        <span className="text-zinc-700 text-xs uppercase font-light">
          {dateFormatPublication(createdAt)}
          {updatedAt && "(EDIT)"}
        </span>
      </div>
      <h3 className="font-bold text-2xl text-zinc-800">{titleExcerpt}</h3>
      <p className="font-normal text-sm text-zinc-600">{descriptionExcerpt}</p>
    </div>
  );
}
