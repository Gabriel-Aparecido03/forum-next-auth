import { prisma } from "@/app/api/utils/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) return Response.json(null, { status: 401 });

  const profile = await prisma.profile.findUnique({
    where: {
      user_id: user.id,
    },
  });

  if (!profile) return Response.json(null, { status: 404 });

  return Response.json({ profile : {
    id : profile.id,
    activedAt : profile.actived_at,
    createdAt : profile.created_at,
    userId : profile.user_id,
    description : profile.description,
    username : profile.username,
    updatedAt : profile.updated_at
  } }, { status: 200 });
}
