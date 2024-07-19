import { prisma } from "@/app/api/utils/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { username: string } }
) {

  const profile = await prisma.profile.findUnique({
    where: {
      username: params.username,
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
