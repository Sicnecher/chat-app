import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
  const request = await req.json()
  const userId = request.id
    return NextResponse.json({
        chats: []
    })
  }