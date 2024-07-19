import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function POST(_ : Request) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json(null, { status: 401 });

  const { user_id, profile_id } = jwt.decode(token.value) as any;
  if(!user_id || !profile_id ) return Response.json(null,{ status : 401 })

  const user = await prisma.user.findUnique({
    where : {
      id : user_id
    }
  })

  const profile = await prisma.profile.findUnique({
    where : {
      user_id
    }
  })

  if(!user) return Response.json(null,{status : 401 })

  const access_token = jwt.sign(
    { user_id, profile_id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: 1 * 60 * 60 * 12 }
  )

  cookies().set(process.env.APP_NAME_AND_VERSION as string,access_token)
  
  return Response.json({ user },{ status : 200 })
}
