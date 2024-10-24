import { streamClient } from "@/app/api/auth/stream.init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = streamClient.createToken(body.id);
        // Returning a JSON response with the token
        return NextResponse.json({ token: token });
    } catch (error) {
        console.error('Error creating token:', error);

        // Return a JSON error response
        return NextResponse.json(
             {error: 'Failed to create token'},
             {status: 500}
        );
    }
}