"use client";

import { useProfileView } from "@/hooks/use-profile-view";
import { fetchPublicationsProfile } from "@/services/profile/fetch-publications-profile";
import { useQuery } from "@tanstack/react-query";
import { Publication } from "./publication";

export function PublicationOfProfile() {
  const { id } = useProfileView();

  async function handleFetchPublications() {
    try {
      const res = await fetchPublicationsProfile({ profileId: id ?? "" });
      return res.data;
    } catch (error) {}
  }

  const { data } = useQuery({
    initialData: { publications: [] },
    queryKey: [`profile-${id}-publications`],
    queryFn: handleFetchPublications,
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {data?.publications.map((x) => (
        <Publication
          createdAt={new Date(x.createdAt)}
          description={x.description}
          id={x.id}
          profileId={id ?? ""}
          title={x.title}
          updatedAt={x.updatedAt}
          username={x.username ?? ""}
          key={x.id}
        />
      ))}
    </div>
  );
}
