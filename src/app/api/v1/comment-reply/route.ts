import { cookies } from "next/headers";
import { jwt } from "../../utils/lib/json-web-token";
import { prisma } from "../../utils/lib/prisma";

export async function POST(request: Request) {
  
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const bodyRaw = await request.json();
  const { content, commentId } = bodyRaw;

  const { user_id, profile_id } = jwt.decode(token.value) as any;
  if (!user_id || !profile_id) return Response.json(null, { status: 401 });

  const profile = await prisma.profile.findUnique({
    where: {
      id: profile_id,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user || !profile) return Response.json(null, { status: 404 });

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) return Response.json(null, { status: 404 });

  await prisma.commentReply.create({
    data: {
      content,
      comment_id: commentId,
      profile_id,
    },
  });

  return Response.json(null, { status: 201 });
}
