import {PrismaClient} from "@prisma/client";
import { userApiService } from "../service";
import { SignUpFormValuesDto } from "@/app/models/dto/logForm";
import { streamClient } from "@/stream.init";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request){
    try{
        const formData: SignUpFormValuesDto = await request.json()
        const {token, userId} = await userApiService.signUp(formData)
        await streamClient.updateUser({
            id: `${userId}`,
            data: {
                name: formData.username,
            }
        })
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/streamToken`, userId)
        return NextResponse.json({
            userData: {id: userId, name: formData.username, email: formData.email},
            accessToken: token,
            streamToken: data.token
        })
     }catch(err){
        console.log('here: ',err)
        return err
    }
}