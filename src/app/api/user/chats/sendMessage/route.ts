import { streamClient } from "@/app/api/auth/stream.init";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const data = await req.json()
    // const newMessage = await prisma.message.create({
    //     data: {
    //         message: data.content,
    //         chatId: data.chatId,
    //         senderId: data.senderId,
    //         time: new Date(),
    //         sender: {
    //             connect: {
    //                 id: data.senderId
    //             }
    //         },
    //         chat: {
    //             connect: {
    //                 id: data.chatId
    //             }
    //         }
    //     }
    // });
    const channel = streamClient.channel('messaging', data.chatId);
    await channel.sendMessage({ text: data.content });
    return NextResponse.json({
        message: ''
    })
}