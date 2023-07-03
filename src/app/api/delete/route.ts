import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const id = reqBody.id;
  try {
    const deletedList = await prisma.list.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      response: deletedList,
    });
  } catch (error) {
    console.log(error);
  }
}
