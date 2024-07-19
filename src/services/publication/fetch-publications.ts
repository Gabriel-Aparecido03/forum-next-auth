import { api } from "@/lib/api";

interface fetchPublicationParams {
  page : number
  sortBy : "recent" | "relevant"
}

interface fetchPublicationResponse {
  datas : {
    username: string | null;
    profileId: string;
    createdAt: Date;
    updatedAt: Date | null;
    title: string;
    description: string;
    id: string;
  }[],
  total : number
  page : number
  sortBy : "recent" | "relevant"
}

export async function fetchPublications({ page , sortBy }: fetchPublicationParams) {
  try {
    const response = await api.get<fetchPublicationResponse>(`/publication?page=${page}&sortBy=${sortBy}`)
    return response
  } catch (error) {
    throw error
  }
}