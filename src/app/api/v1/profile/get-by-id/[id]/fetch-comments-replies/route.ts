import { prisma } from "@/app/api/utils/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  /* const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
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

  if (!user || !profile) return Response.json(null, { status: 404 }); */

  const profile = await prisma.profile.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!profile) return Response.json(null, { status: 404 });

  const commentsReply = await prisma.commentReply.findMany({
    where : {
      profile_id : profile.id
    },
    include : {
      profile : true
    }
  });

  const responseComment = commentsReply.map(x => {
    return {
      username : x.profile.username,
      profileId : x.profile.id,
      createdAt : x.created_at,
      updatedAt : x.updated_at,
      content : x.content,
      id : x.id,
    }
  })

  return Response.json({ commentsReplies : responseComment },{ status : 200 })
}
