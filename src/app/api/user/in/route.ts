import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
import { userApiService } from '../service'
import { LoginFormValuesDto, SignUpFormValuesDto } from "@/app/models/dto/logform";
import axios from "axios";

export async function POST(request: Request){
    try{
        const formData: any = await request.json()
        const {token, userId} = await userApiService.signIn(formData)
        console.log('token userId: ', typeof token, ' and ', typeof userId)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/streamToken`, {userId})
        return NextResponse.json({
            userData: {id: userId, name: formData.username, email: formData.email},
            accessToken: token,
            streamToken: response.data.token
        })
    }catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 409}
        )
    }
}