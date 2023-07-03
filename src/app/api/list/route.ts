import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isUser = await prisma.list.findMany();
  return NextResponse.json({ data: isUser });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const userEmail = reqBody.userEmail;
  const isUser = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  if (isUser?.id !== undefined) {
    try {
      const list = await prisma.list.create({
        data: {
          listName: reqBody.listName,
          userId: isUser.id,
        },
      });
      return NextResponse.json({
        response: `haallo INI POST berhasil ${isUser?.id}, ${reqBody.listName}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.json({
    response: `haallo INI POST ini yang gagal ${isUser?.id}`,
  });
}
