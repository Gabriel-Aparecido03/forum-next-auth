import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const publication = await prisma.publication.findUnique({
    where: {
      id: params.id,
    },
    include: {
      profile: true,
    },
  });

  if (!publication) return Response.json(null, { status: 404 });

  const { created_at, description, id, profile, title, updated_at } =
    publication;

  return Response.json({
    publication: {
      title,
      description,
      createdAt: created_at,
      id,
      updatedAt: updated_at,
      profileId: profile.id,
      username: profile.username,
    },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const bodyRaw = await request.json();
  const { description, title } = bodyRaw;

  const { profile_id } = jwt.decode(token.value) as any;
  if (!profile_id) return Response.json({}, { status: 401 });

  let data = { updated_at : new Date() };

  if (description) Object.assign(data, { description });
  if (title) Object.assign(data, { title });

  await prisma.publication.update({
    where: {
      id: params.id,
    },
    data
  });

  return new Response(null, { status: 204 });
}


export async function DELETE(_: Request,{ params }: { params : { id : string }}) {

  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const { profile_id } = jwt.decode(token.value) as any;
  if (!profile_id) return Response.json({}, { status: 401 });

  await prisma.publication.delete({
    where: {
      id : params.id,
    },
  });

  return new Response(null,{ status : 204 });
}