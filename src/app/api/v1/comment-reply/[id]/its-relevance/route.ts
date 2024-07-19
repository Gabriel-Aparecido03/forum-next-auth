import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function POST(_: Request, { params }: { params: { id: string } }) {
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

  const commentReply = await prisma.commentReply.findUnique({ where : { id : params.id }})
  if(!commentReply) return Response.json(null, { status: 404 });

  const hasAlready = await prisma.commentReplyRelevant.findFirst({
    where : {
      profile_id,
      comment_reply_id : commentReply.id,
    }
  })

  if(hasAlready) {
    await prisma.commentReplyRelevant.deleteMany({
      where : {
        profile_id,
        comment_reply_id : commentReply.id,
      }
    })

    return new Response(null, { status: 204 });
  }

  const hasAlreadyMakedAsRelevant = await prisma.commentNotReplyRelevant.findFirst({
    where : {
      profile_id ,
      comment_reply_id : commentReply.id
    }
  })

  if(hasAlreadyMakedAsRelevant) await prisma.commentNotReplyRelevant.delete({
    where : {
      id : hasAlreadyMakedAsRelevant.id
    }
  })

  await prisma.commentReplyRelevant.create({
    data : {
      profile_id,
      comment_reply_id : commentReply.id,
    }
  })

  return new Response(null, { status: 204 });
}