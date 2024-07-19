import { api } from "@/lib/api";

interface GetByIdPublicationParams {
  id: string;
}

interface GetByIdPublicationResponse {
  publication: {
    title: string;
    description: string;
    createdAt: Date;
    id: string;
    updatedAt: Date | null;
    profileId: string;
    username: string | null;
  };
}

export async function getByIdPublication({ id  }:GetByIdPublicationParams) {
  try {
    const response = await api.get<GetByIdPublicationResponse>(`/publication/${id}`)
    return response
  } catch (error) {
    throw error
  }
}