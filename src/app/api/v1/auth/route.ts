import bcrypt from 'bcrypt';
import { z } from "zod";
import { prisma } from "../../utils/lib/prisma";
const createUserSchema = z.object({
  password : z.string(),
  email : z.string().email(),
  username : z.string()
})

export async function POST(request: Request) {
  const bodyRaw = await request.json()
  const { email ,username ,password } = createUserSchema.parse(bodyRaw)

  const hasEmailAlreadyRegistered = await prisma.user.findUnique({
    where : {
      email
    }
  })

  if(hasEmailAlreadyRegistered) return Response.json('Email already exists !', { status : 409 })

  const password_hash = await bcrypt.hash(password,8)

  const { id } = await prisma.user.create({ data : {
    email ,
    password_hash,
  }})

  await prisma.profile.create({ data : {
    user_id : id,
    username
  }})
  
  return Response.json(null,{
    status : 200
  })
}