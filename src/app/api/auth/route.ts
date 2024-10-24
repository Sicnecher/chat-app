import { NextResponse } from "next/server"
import { streamClient } from "./stream"

export async function POST(request: Request){
    console.log(request)
    const body = await request.json()
    console.log(body)
    const token = streamClient.createToken(body.id)
    return NextResponse.json({
        streamToken: token
    })
}