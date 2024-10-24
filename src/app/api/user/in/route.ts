import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
import { userApiService } from '../service'
import { LoginFormValuesDto, SignUpFormValuesDto } from "@/app/models/dto/logForm";
import axios from "axios";

export async function POST(request: Request){
    try{
        const formData: any = await request.json()
        const {token, userId} = await userApiService.signIn(formData)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/streamToken`, {userId})
        return NextResponse.json({
            userData: {id: userId, name: formData.username, email: formData.email},
            accessToken: token,
            streamToken: response.data.token
        })
    }catch(error){
        console.log('here brother: ',error)
        return error
    }
}