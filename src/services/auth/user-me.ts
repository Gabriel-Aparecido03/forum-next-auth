import { api } from "@/lib/api"

interface UserMeResponse {
  user : {
    email : string
    id : string
  }
}

export async function meUser() {
  try {
    const res = await api.get<UserMeResponse>('/auth/me')
    return res
  } catch (error) {
    throw error
  }
}