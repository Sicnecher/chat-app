import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
  const request = await req.json()
  const userId = request.id
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: userId
        }
      }
    }
  });
    return NextResponse.json({
        chats: ['hey']
    })
  }