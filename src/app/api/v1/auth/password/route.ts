import { jwt } from "@/app/api/utils/lib/json-web-token";
import { prisma } from "@/app/api/utils/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: Request) {
  const bodyRaw = await request.json();
  const { email, password } = createUserSchema.parse(bodyRaw);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user)
    return Response.json("Invalid email or password !", { status: 401 });

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch)
    return Response.json("Invalid email or password !", { status: 401 });

  const profile = await prisma.profile.findUnique({
    where : {
      user_id : user.id
    }
  })

  if(!user) return Response.json({},{status : 401 })

  const profile_id = profile?.id ?? null

  const access_token = jwt.sign(
    { user_id: user.id ,profile_id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: 1 * 60 * 60 * 12 }
  );

  cookies().set(process.env.APP_NAME_AND_VERSION as string, access_token);

  return Response.json(
    {
      access_token,
    },
    {
      status: 201,
    }
  );
}
