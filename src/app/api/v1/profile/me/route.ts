import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function GET(_: Request) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const { user_id, profile_id } = jwt.decode(token.value) as any;
  if (!user_id) return Response.json(null, { status: 401 });

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

  return Response.json(
    {
      profile: {
        id: profile.id,
        username: profile.username,
        description: profile.description,
        activedAt: profile.actived_at,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      },
    },
    { status: 200 }
  );
}

export async function PUT(request: Request) {
  const token = cookies().get("token@forum-1.0.0");
  if (!token) return Response.json(null, { status: 401 });

  const { user_id,profile_id } = jwt.decode(token.value) as any;
  if (!user_id || !profile_id) return Response.json(null, { status: 401 });

  const bodyRaw = await request.json();
  const { email, description, username } = bodyRaw;

  if (email) {
    const emailIsAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailIsAlreadyExists?.id !== user_id)
      return Response.json("Email is already exists !", { status: 409 });
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        email,
      },
    });
  }

  if (username) {
    const profile = await prisma.profile.findUnique({
      where: { username },
    });

    const profileOfToken = await prisma.profile.findUnique({
      where: {
        user_id,
      },
    });

    if (profileOfToken?.id !== profile?.id || !profileOfToken)
      return Response.json("Username is already exists !", { status: 409 });

    const { id,actived_at } = profileOfToken;

    const data = { description , username, updated_at : new Date() }
    if(!actived_at) Object.assign(data,{ actived_at : new Date()})

    await prisma.profile.update({
      where: {
        id,
      },
      data
    });
  }

  return Response.json(null, { status: 204 });
}
