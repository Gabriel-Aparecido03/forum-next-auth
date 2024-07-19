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

  return Response.json(!!profile,{ status : 200 })
}
