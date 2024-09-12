import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const data = await req.json()
    const newChat = await prisma.chat.create({
        data: {
          title: data.title, // You can replace this with a dynamic title
          users: {
            connect: data.members // Connect the users by their IDs
          }
        }
      });
      return NextResponse.json({
        chat: newChat
      })
}