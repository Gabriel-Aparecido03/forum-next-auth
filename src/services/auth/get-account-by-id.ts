import { api } from "@/lib/api";

interface GetAccountByIdParam {
  id : string
}

interface GetAccountByIdResponse {
  user: {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date | null;
}
}

export async function GetAccountById({ id }:GetAccountByIdParam ) {
  try {
    const res = await api.get<GetAccountByIdResponse>(`/auth/get-by-id/${id}`)
    return res
  } catch (error) {
    throw error
  }
}