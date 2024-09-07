import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(req: NextRequest) {
    try{
        const token = req.cookies.get("access_token")?.value;
        if (!token) {
            return NextResponse.next()
        }
        const isValid = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/jwt/validadte`, token)
        if (!isValid) {
            return NextResponse.next()
        }
    }catch(error){
        console.error(error)
    }
    return NextResponse.next()
}