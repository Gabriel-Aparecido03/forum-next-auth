"use client";

import { Publication } from "@/components/publication";
import { PublicationShimmer } from "@/components/shimmers/publication";
import { Button } from "@/components/ui";
import { useProfile } from "@/hooks/use-profile";
import { fetchPublications } from "@/services/publication/fetch-publications";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Data {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string | null;
}

interface ApiResponse {
  total: number;
  page: number;
  sortBy: string;
  datas: Data[] | null;
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<"recent" | "relevant">("recent");

  const { push } = useRouter();
  const profile = useProfile();

  async function handleFetchPublications() {
    try {
      const response = await fetchPublications({ page, sortBy });
      if (response.status === 200) return response.data;
      return {
        datas: null,
        page,
        sortBy,
        total: 0,
      };
    } catch (error) {}
  }

  const { data, isLoading } = useQuery({
    queryFn: handleFetchPublications,
    queryKey: ["publication-home"],
  });

  return (
    <main className="gap-8 w-[96%] max-w-[1200px] mx-auto">
      <div className="w-full mt-10">
        <h1 className="font-bold text-6xl text-left">Forum</h1>
        <div className="flex items-baseline justify-between flex-1">
          {profile.id && (
            <div className="flex justify-end items-baseline gap-2 mt-2">
              <Button
                text="Create new publication"
                onClick={() => push("app/publication/create")}
              />
            </div>
          )}
          <span className="font-light text-xs text-zinc-400 uppercase">
            {data && `Show ${data.datas?.length} of ${data.total} posts.`}
          </span>
        </div>
      </div>
      <div className=" w-[96%] max-w-[1000px] mx-auto mt-5 flex flex-col gap-6 my-10 justify-center items-center">
        {!isLoading && (
          <>
            {!data && (
              <h2>
                There`&apos;`s any publications here .Go its first publication
                on Forum
              </h2>
            )}
            {data &&
              data.datas?.map((x) => (
                <Publication
                  key={x.id}
                  createdAt={new Date(x.createdAt)}
                  description={x.description}
                  id={x.id}
                  profileId={x.profileId}
                  title={x.title}
                  updatedAt={x.updatedAt}
                  username={x.username ?? ""}
                />
              ))}
          </>
        )}
        {isLoading && (
          <>
            <PublicationShimmer />
            <PublicationShimmer />
            <PublicationShimmer />
          </>
        )}
      </div>
    </main>
  );
}
