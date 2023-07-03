import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextResponse, res: NextRequest) => {
  const reqBody = await req.json();
  const userEmail = reqBody.email;
  const isUser = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  console.log(req);
  if (!isUser) {
    try {
      const user = await prisma.user.create({
        data: {
          name: reqBody.name,
          email: reqBody.email,
          image: reqBody.image,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("User already exist");
    return "user exist";
  }
};
