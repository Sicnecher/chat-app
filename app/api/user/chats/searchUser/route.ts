import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(req: Request){
    const data = await req.json()
    console.log(data)
    const searchedUsers = await prisma.user.findMany({
        where: {
            OR: [
                {username: data.usernameOrEmail},
                {email: data.usernameOrEmail}
            ]
        }
    })

    return NextResponse.json({
        resultedUsers: searchedUsers
    })
}