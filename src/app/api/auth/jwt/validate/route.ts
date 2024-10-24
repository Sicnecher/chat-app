import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { apiAuthService } from "../../service";
import axios from "axios";

export async function POST(req: NextRequest){
    try {
        const request = await req.json()
        const payload = jwt.verify(request.token, process.env.SECRET_JWT as string) as jwt.JwtPayload;
        const response = await apiAuthService.validateUser(payload);
        const streamToken = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/streamToken`, {userId: payload.id})
        return NextResponse.json({
            userData: response,
            streamToken: streamToken.data.token
        })
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid JWT token');
        } else if (error instanceof jwt.TokenExpiredError) {
            throw new Error('JWT token has expired');
        } else {
            throw new Error('Unauthorized Access!')
        }
    }
}