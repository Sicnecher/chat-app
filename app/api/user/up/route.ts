import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";
import { userApiService } from "../service";
import { SignUpFormValuesDto } from "@/app/models/dto/logForm";
const prisma = new PrismaClient()

export async function POST(request: Request, res: Response){
    try{
        const formData: SignUpFormValuesDto = await request.json()
        const response = await userApiService.signUp(formData)
        return NextResponse.json({
            token: response
        })
     }catch(err){
        console.log(err)
        return err
    }
}