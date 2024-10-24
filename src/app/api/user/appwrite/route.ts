import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const data = await request.json();
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/user/${foundUser ? ('in') : ('up')}`, {
            username: data.name,
            email: data.email,
            password: data.$id,
            isAppwrite: true
        })
        console.log('this is the response:', response.data)
        return NextResponse.json(response.data, { status: 200 });
    }catch(error){
        console.error('Error creating email session:', error);
        return NextResponse.json({ error: 'Failed to create email session' }, { status: 500 });
    }
}