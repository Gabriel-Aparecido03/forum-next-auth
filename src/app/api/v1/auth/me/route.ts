import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_: Request) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json(null, { status: 401 });

  const { user_id, profile_id } = jwt.decode(token.value) as any;
  if (!user_id || !profile_id) return Response.json(null, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user) return Response.json(null, { status: 401 });

  return Response.json({ user : {
    email : user.email,
    id : user.id
  } }, { status: 200 });
}


export async function DELETE(_: Request) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json(null, { status: 401 });

  const { user_id, profile_id } = jwt.decode(token.value) as any;
  if (!user_id || !profile_id) return Response.json(null, { status: 401 });

  const user = await prisma.user.delete({
    where: {
      id: user_id,
    },
  });

  cookies().delete(process.env.APP_NAME_AND_VERSION as string)

  return new Response(null,{ status : 204 })
}
