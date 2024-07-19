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

  const comment = await prisma.comment.findUnique({ where : { id : params.id }})
  if(!comment) return Response.json(null, { status: 404 });

  const hasAlready = await prisma.commentNotRelevant.findFirst({
    where : {
      profile_id,
      comment_id : comment.id,
    }
  })

  const hasAlreadyMakedAsRelevant = await prisma.commentRelevant.findFirst({
    where : {
      profile_id ,
      comment_id : comment.id,
    }
  })

  if(hasAlreadyMakedAsRelevant) await prisma.commentRelevant.delete({
    where : {
      id : hasAlreadyMakedAsRelevant.id
    }
  })


  if(hasAlready) {
    await prisma.commentNotRelevant.deleteMany({
      where : {
        profile_id,
        comment_id : comment.id,
      }
    })

    return new Response(null, { status: 204 });
  }

  await prisma.commentNotRelevant.create({
    data : {
      profile_id,
      comment_id : comment.id,
    }
  })

  return new Response(null, { status: 204 });
}