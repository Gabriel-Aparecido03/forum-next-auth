import { api } from "@/lib/api"

export async function validateAccess() {
  try {
    const res = await api.post('/auth/validate-access')
    return res
  } catch (error) {
    throw error
  }
}