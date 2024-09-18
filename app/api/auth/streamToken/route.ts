import { streamClient } from "@/stream.init"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    const { userId } = await req.json()
    const token = streamClient.createToken(userId)
    return NextResponse.json({ token: token })
}