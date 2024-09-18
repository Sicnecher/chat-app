import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
import { userApiService } from '../service'
import { LoginFormValuesDto } from "@/app/models/dto/logForm";
import axios from "axios";

export async function POST(request: Request){
    try{
        const formData: LoginFormValuesDto = await request.json()
        const {token, userId} = await userApiService.signIn(formData)
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/streamToken`, userId)
        return NextResponse.json({
            userData: {id: userId, name: formData.username},
            accessToken: token,
            streamToken: data.token
        })
    }catch(error){
        console.log(error)
        return error
    }
}