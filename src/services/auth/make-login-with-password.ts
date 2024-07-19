import { api } from "@/lib/api"

interface MakeLoginWithPasswordParamsType {
  password : string
  email : string
}

export async function MakeLoginWithPassword(data:MakeLoginWithPasswordParamsType) {
  try {
    const res = await api.post('/auth/password',{ ...data })
    return res
  } catch (error) {
    throw error
  }
}