"use client";

import { useProfile } from "@/hooks/use-profile";
import { usePublicationView } from "@/hooks/user-publication-view";
import { fetchComments } from "@/services/comments/fetch-comments";
import { useQuery } from "@tanstack/react-query";
import { PostNewComment } from "../post-new-comment";
import { CommentShimmer } from "../shimmers/comment";
import { Comment } from "./comment";

export function CommentSection() {

  const { id } = usePublicationView();
  const profile = useProfile();
  const publication = usePublicationView();

  async function fecthPublicationComments() {
    try {
      const res = await fetchComments({ publicationId : id })
      return res.data;
    } catch (error) {}
  }

  let { data,isLoading } = useQuery({
    initialData: null,
    queryKey: [`publication-${publication.id}-comments`],
    queryFn: fecthPublicationComments,
  });

  if(!data) return null

  return (
    <div className="flex flex-col gap-3 w-[90%] mx-auto">
      <span className="text-sm uppercase font-light text-zinc-400 mt-3">
        {data.count !== 0 && data.count >= 1
          ? `${data.count} comment${data.count > 1 ? "s" : ""}`
          : null}
      </span>
      {profile.id && <PostNewComment />}
      <div className="flex flex-col justify-start items-start gap-4 w-full">
        {!isLoading &&  data.data.map((x) => (
          <Comment
            key={x.id}
            content={x.content}
            createdAt={new Date(x.createdAt)}
            id={x.id}
            username={x.username ?? ""}
            profileId={x.profileId}
          />
        ))}
        {isLoading && <>
          <CommentShimmer />
          <CommentShimmer />
          <CommentShimmer />
        </>}
      </div>
    </div>
  );
}
