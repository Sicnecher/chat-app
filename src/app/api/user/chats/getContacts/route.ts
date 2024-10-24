import { streamClient } from "../../../auth/stream.init"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const channels = await streamClient.queryChannels({
        members: { $in: [userId] }, // Filter: user ID should be in the members list
      });
    return NextResponse.json({
        users: channels
    })
}