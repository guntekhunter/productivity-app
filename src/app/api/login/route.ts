// import { PrismaClient } from "@prisma/client";
// // import type { user } from "@prisma/client";
// const prisma = new PrismaClient();

// export const POST = async (req: Request, res: Response) => {
//   const reqBody = await req.json();
//   const user = await prisma.user.create({
//     data: {
//       name: reqBody.name,
//       email: reqBody.email,
//     },
//   });
//   return res.json(user);
// };
