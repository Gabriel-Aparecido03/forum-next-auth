import { prisma } from '@/app/api/utils/lib/prisma';
import { z } from "zod";
const createUserSchema = z.object({
  email : z.string().email(),
})

export async function POST(request: Request) {
  const bodyRaw = await request.json()
  const { email  } = createUserSchema.parse(bodyRaw)

  const hasEmailAlreadyRegistered = await prisma.user.findUnique({
    where : {
      email
    }
  })

  if(!hasEmailAlreadyRegistered) return Response.json('Invalid email !', { status : 401 })

  return Response.json({},{
    status : 201
  })
}