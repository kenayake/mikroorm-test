import { prisma } from "@/prisma/prisma";
import { Role, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

interface CustomRequest<T> extends Request {
  json(): Promise<T>;
}

// Handle GET
export async function GET(request: CustomRequest<User>) {
  const users = await prisma.user.findMany();
  console.log(users);

  return NextResponse.json(users);
}

//Handle POST
export async function POST(request: CustomRequest<User>) {
  console.log(await request.clone().json());

  try {
    const user = await prisma.user.create({
      data: await request.json(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: `${error}`,
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(
    {
      message: "success",
    },
    {
      status: 200,
    }
  );
}
