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

  if (!user) return Response.json(null, { status: 404 });

  return Response.json({ user : {
    id : user.id,
    email : user.email,
    createdAt : user.created_at,
    updatedAt : user.updated_at,
  } }, { status: 200 });
}
 