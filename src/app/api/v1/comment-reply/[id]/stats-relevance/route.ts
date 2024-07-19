import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const { user_id, profile_id } = jwt.decode(token.value) as any;
  if (!user_id || !profile_id) return Response.json(null, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  const profile = await prisma.profile.findUnique({
    where: {
      user_id,
    },
  });

  if (!user || !profile) return Response.json(null, { status: 404 });

  const itsRelevance = await prisma.commentReplyRelevant.count({
    where : {
      comment_reply_id : params.id
    }
  })

  const itsNotRelevance = await prisma.commentNotReplyRelevant.count({
    where : {
      comment_reply_id : params.id
    }
  })

  return Response.json({ count : itsRelevance - itsNotRelevance},{ status : 200 })
}