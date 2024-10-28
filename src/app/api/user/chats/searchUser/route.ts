import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(req: Request){
    try{
        console.log(req)
        const data = await req.json()
        console.log('and this is the data: ', data)
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
    }catch(error){
        console.log('this is the search users error: ', error)
    }

}