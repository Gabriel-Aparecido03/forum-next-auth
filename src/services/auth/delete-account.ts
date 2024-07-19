import { api } from "@/lib/api"

export async function meUserDelete() {
  try {
    const res = await api.delete('/auth/me')
    return res
  } catch (error) {
    throw error
  }
}