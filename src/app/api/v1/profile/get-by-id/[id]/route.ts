import { prisma } from "@/app/api/utils/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!profile) return Response.json("", { status: 404 });

  return Response.json(
    {
      profile: {
        id: profile.id,
        activedAt: profile.actived_at,
        createdAt: profile.created_at,
        userId: profile.user_id,
        description: profile.description,
        username: profile.username,
        updatedAt: profile.updated_at,
      },
    },
    { status: 200 }
  );
}
