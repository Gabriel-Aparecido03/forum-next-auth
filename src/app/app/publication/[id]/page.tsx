"use client";

import { CommentSection } from "@/components/comment/comment-section";
import { PublicationBody } from "@/components/publication-body";
import { PublicationPageShimmer } from "@/components/shimmers/publication-page";
import { Separator } from "@/components/ui";
import { updatePublicationViewInfos } from "@/features/publication/publication-slice";
import { PublicationRelevance } from "@/high-order-component/publication-relevance";
import { useAppDispatch } from "@/redux-hook";
import { getByIdPublication } from "@/services/publication/get-by-id";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface PublicationType {
  params: {
    id: string;
  };
}

export default function Publication({ params: { id } }: PublicationType) {
  const dispatch = useAppDispatch();

  const { push } = useRouter();

  async function handleFetchPublicationDetails() {
    try {
      try {
        const res = await getByIdPublication({ id });
        return res;
      } catch (error) {}
    } catch (error) {}
  }

  const { data, isLoading } = useQuery({
    queryFn: handleFetchPublicationDetails,
    queryKey: [`publication-${id}`],
  });

  if (isLoading) return <PublicationPageShimmer />;
  if (!data) return push("/app");

  const { createdAt, description, profileId, title, updatedAt, username } =
    data.data.publication;

  dispatch(
    updatePublicationViewInfos({
      createdAt: new Date(createdAt),
      description,
      id: data.data.publication.id,
      profileId,
      title,
      updatedAt: updatedAt ? new Date(updatedAt) : null,
      username,
      isEditing: false,
    })
  );

  return (
    <main className="gap-4 w-[96%] max-w-[1200px] mx-auto flex flex-col h-full">
      <div className="flex items-stretch justify-start gap-4 mt-4 mb-3 h-full flex-1">
        <PublicationRelevance />
        <PublicationBody />
      </div>
      <Separator />
      <CommentSection />
    </main>
  );
}
