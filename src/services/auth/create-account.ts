import { api } from "@/lib/api"

interface CreateAccountParamType {
  username : string
  email : string
  password : string
}

export async function CreateAccount(data:CreateAccountParamType) {
  try {
    const res = await api.post('/auth',{ ...data })
    return res
  } catch (error) {
    throw error
  }
}