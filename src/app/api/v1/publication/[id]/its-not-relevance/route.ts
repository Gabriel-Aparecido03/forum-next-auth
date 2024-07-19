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

  const publication = await prisma.publication.findUnique({ where : { id : params.id }})
  if(!publication) return Response.json(null, { status: 404 });

  const hasAlready = await prisma.publicationNotRelevant.findFirst({
    where : {
      profile_id,
      publication_id : publication.id,
    }
  })

  const hasAlreadyMakedAsRelevant = await prisma.publicationRelevant.findFirst({
    where : {
      profile_id ,
      publication_id : publication.id,
    }
  })

  if(hasAlreadyMakedAsRelevant) await prisma.publicationRelevant.delete({
    where : {
      id : hasAlreadyMakedAsRelevant.id
    }
  })

  if(hasAlready) {
    await prisma.publicationNotRelevant.deleteMany({
      where : {
        profile_id,
        publication_id : publication.id,
      }
    })

    return new Response(null, { status: 204 });
  }

  await prisma.publicationNotRelevant.create({
    data : {
      profile_id,
      publication_id : publication.id,
    }
  })

  return new Response(null, { status: 204 });
}