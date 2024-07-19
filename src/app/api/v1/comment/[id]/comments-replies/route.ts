import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_: Request,{ params : { id } }: { params : { id : string }}) {
  
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

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

  const data = await prisma.commentReply.findMany({
    where : {
      comment_id : id
    },
    include : {
      profile : true
    }
  })

  const commentsReplies = data.map(x => {
    return {
      id : x.id,
      createdAt : x.created_at,
      updatedAt : x.updated_at,
      username : x.profile.username,
      profileId : x.profile_id,
      content : x.content,
    }
  })

  return Response.json({ datas : commentsReplies },{ status : 200 })
}
