import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { apiAuthService } from "../../service";

export async function POST(req: NextRequest){
    try {
        const request = await req.json()
        const payload = jwt.verify(request.token, process.env.SECRET_JWT as string) as jwt.JwtPayload;
        const response = await apiAuthService.validateUser(payload);
        return NextResponse.json({
            response: response
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