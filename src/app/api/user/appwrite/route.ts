import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const foundUser = await prisma.user.findUnique({ where: {email: data.email} });
        console.log('foundUser: ', foundUser)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/user/${foundUser ? ('in') : ('up')}`, foundUser ?
        {...foundUser, isAppwrite: true} : {
            username: data.name,
            email: data.email,
            password: data.$id,
            isAppwrite: true
        })
        return NextResponse.json(response.data, { status: 200 });
    }catch(error: any){
        console.log('error: ', error)
        return NextResponse.json({ error: 'Failed to create email session' }, { status: 500 });
    }
}