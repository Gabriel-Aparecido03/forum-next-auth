import { prisma } from "@/app/api/utils/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({
    where: {
      publication_id: params.id,
    },
    orderBy: {
      created_at: "desc",
    },
    include : {
      profile : true
    }
  });

  const count = await prisma.comment.count({
    where: {
      publication_id: params.id,
    },
  });

  const data = comments.map(x => {
    return {
      profileId : x.profile.id,
      id : x.id,
      content : x.content,
      publicationId : x.publication_id,
      createdAt : x.created_at,
      updatedAt : x.updated_at,
      username : x.profile.username,
    }
  })

  return Response.json(
    {
      count,
      data,
    },
    { status: 200 }
  );
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const bodyRaw = await request.json();
  const { content, profileId } = bodyRaw;

  const profile = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  const publication = await prisma.publication.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!profile || !publication) return Response.json(null, { status: 401 });

  await prisma.comment.create({
    data: {
      content,
      profile_id: profileId,
      publication_id: params.id,
    },
  });

  return Response.json(null, { status : 201 })
}