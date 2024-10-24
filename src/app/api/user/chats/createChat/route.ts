import { streamClient } from "../../../auth/stream.init";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const data = await req.json()
      const channel = streamClient.channel('messaging', data.title, {
        name: data.title,
        members: data.members
      });
      await channel.create();
      return NextResponse.json({
        chat: channel
      })
}