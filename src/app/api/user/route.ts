import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const user = await prisma.user.findMany();
  return NextResponse.json({ data: user });
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const reqBody = await req.json();
  const userEmail = reqBody.email;
  const isUser = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  if (!isUser) {
    try {
      const user = await prisma.user.create({
        data: {
          name: reqBody.name,
          email: reqBody.email,
          image: reqBody.image,
        },
      });
      return NextResponse.json({ response: `success adding ${user}` });
    } catch (error) {
      console.log(error);
    }
  } else {
    return NextResponse.json({ response: "user exist" });
  }
};
