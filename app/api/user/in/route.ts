import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
import { userApiService } from '../service'
import { LoginFormValuesDto } from "@/app/models/dto/logForm";


const prisma = new PrismaClient()    

export async function POST(request: Request){
    try{
        const formData: LoginFormValuesDto = await request.json()
        const access_token = await userApiService.signIn(formData)
        return NextResponse.json({
            access_token: access_token
        })
    }catch(err){
        return err
    }
}