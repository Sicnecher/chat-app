import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password, name } = await request.json();
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        const response = await axios.post(`${process.env.API_BASE}/api/user/${foundUser ? ('in') : ('up')}`, {
            name: name,
            email: email,
            password: password,
        })
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error creating email session:', error);
        return NextResponse.json({ error: 'Failed to create email session' }, { status: 500 });
    }
}