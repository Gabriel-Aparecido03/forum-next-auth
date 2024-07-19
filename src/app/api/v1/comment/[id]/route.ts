import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import { cookies } from "next/headers";

export async function DELETE(_: Request,{ params }: { params : { id : string }}) {

  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const { profile_id } = jwt.decode(token.value) as any;
  if (!profile_id) return Response.json({}, { status: 401 });

  await prisma.comment.delete({
    where: {
      id : params.id,
    },
  });

  return new Response(null,{ status : 204 });
}


export async function PUT(request: Request,{ params }: { params : { id : string }}) {
  
  const token = cookies().get(process.env.APP_NAME_AND_VERSION as string);
  if (!token) return Response.json({}, { status: 401 });

  const bodyRaw = await request.json();
  const { content } = bodyRaw;

  const { profile_id } = jwt.decode(token.value) as any;
  if (!profile_id) return Response.json({}, { status: 401 });

  await prisma.comment.update({
    where: {
      id:params.id,
    },
    data : {
      content,
      updated_at : new Date()
    }
  });

  return new Response(null,{ status : 204 });
}
