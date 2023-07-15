import { User } from "@prisma/client";
import { CustomRequest } from "../users/route";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: CustomRequest<User>,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  console.log(slug);

  const tag = request.nextUrl.searchParams.get('tag')
  revalidateTag(tag as string)

  try {
    const user = await prisma.user.delete({
      where: {
        id: slug,
      },
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
