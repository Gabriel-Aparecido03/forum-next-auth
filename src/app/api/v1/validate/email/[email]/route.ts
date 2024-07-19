import { prisma } from "@/app/api/utils/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });

  return Response.json(!!user,{ status : 200 })
}
