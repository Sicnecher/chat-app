import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const data = await req.json()
    const newMessage = await prisma.message.create({
        data: {
            message: data.content,
            chatId: data.chatId,
            senderId: data.senderId,
            time: new Date(),
            sender: {
                connect: {
                    id: data.senderId
                }
            },
            chat: {
                connect: {
                    id: data.chatId
                }
            }
        }
    });
    return NextResponse.json({
        message: newMessage
    })
}