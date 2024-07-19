import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { z } from "zod";

const schemaBodyCreatePublication = z.object({
  title : z.string(),
  description : z.string()
})

export async function POST(request: Request) {
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const bodyRaw = await request.json()
  const { description,title } = schemaBodyCreatePublication.parse(bodyRaw)

  const { user_id,profile_id } = jwt.decode(token.value) as any;
  if (!user_id) return Response.json(null, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  const profile = await prisma.profile.findUnique({
    where : {
      id : profile_id
    }
  })

  if (!user || !profile ) return Response.json(null, { status: 404 });

  const data = {
    profile_id,
    title,
    description
  }

  await prisma.publication.create({ data })

  return Response.json(null,{ status : 201 })
}

export async function GET(request : NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number(searchParams.get("page")) ?? 0
  const sortBy = searchParams.get("sortBy") ?? "recent"

  const datas = await prisma.publication.findMany({
    orderBy : {
      created_at: "desc"
    },
    take : 20,
    skip : page * 20,
    include : {
      profile : true
    }
  })

  const total = await prisma.publication.count()

  const responsePublication = datas.map(x => {
    return {
      username : x.profile.username,
      profileId : x.profile.id,
      createdAt : x.created_at,
      updatedAt : x.updated_at,
      title : x.title,
      description : x.description,
      id : x.id,
    }
  })

  return Response.json({
    total,
    page,
    sortBy,
    datas : responsePublication
  },{ status : 200 })
  
}