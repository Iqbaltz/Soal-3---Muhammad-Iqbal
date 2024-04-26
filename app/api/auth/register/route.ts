import prisma from "@/prisma";
import { UserRegisterSchema } from "@/src/entities/user-entity";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const reqRegister: z.infer<typeof UserRegisterSchema> = await req.json();

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(reqRegister.password, salt);

  const user = await prisma.user.create({
    data: {
      name: reqRegister.name,
      email: reqRegister.email,
      phoneNumber: reqRegister.phone_number,
      password: hash,
    },
  });

  return Response.json(user);
}
