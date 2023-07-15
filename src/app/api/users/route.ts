import { prisma } from "@/prisma/prisma";
import { Role, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export interface CustomRequest<T> extends NextRequest {
  json(): Promise<T>;
}

// Handle GET
export async function GET(request: CustomRequest<User>) {
  const users = await prisma.user.findMany();
  console.log(users);
  const tag = request.nextUrl.searchParams.get("tag");
  revalidateTag(tag as string);

  return NextResponse.json(users);
}

//Handle POST
export async function POST(request: CustomRequest<User>) {
  console.log(await request.clone().json());
  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag as string)

  let data = await request.json();

  try {
    const user = await prisma.user.create({
      data: data,
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
