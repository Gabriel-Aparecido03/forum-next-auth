import { api } from "@/lib/api"

interface UpdateMeProfile {
  email ?: string
  username ?: string
  dscription ?: string
}

export async function updateMeProfile(data:UpdateMeProfile) {
  try {
    const response = await api.put('/profile/me',{ ...data })
    return response
  } catch (error) {
    throw error
  }
}