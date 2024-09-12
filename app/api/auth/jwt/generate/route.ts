import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest){
    try{
        const user = await req.json()
        const payload = {
            username: user.username,
            email: user.email,
            id: user.id
    }
    const access_token = jwt.sign(payload, process.env.SECRET_JWT as string)
    return NextResponse.json({
        token: access_token
    })
    }catch(error){
        console.error(error)
        throw new Error("Unrecognzied error!")
    }
}