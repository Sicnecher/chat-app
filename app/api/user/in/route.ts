import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
import { userApiService } from '../service'
import { LoginFormValuesDto } from "@/app/models/dto/logForm";

const prisma = new PrismaClient()

export async function POST(request: Request){
    try{
        const formData: LoginFormValuesDto = await request.json()
        const {data} = await userApiService.signIn(formData)
        return NextResponse.json({
            token: data.token
        })
    }catch(error){
        console.log(error)
        return error
    }
}