import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(request: Request){
    const userWithChats = await prisma.user.findUnique({
        where: { id: 2 },
        include: {
          chats: true
        },
      });
    return NextResponse.json({
        hello: "world"
    })
}