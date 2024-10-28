import { NextResponse } from 'next/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import axios from "axios"
import { SignUpFormValuesDto } from '@/app/models/dto/logform';
import { userApiService } from '../service';
import { streamClient } from '@/app/stream.init';

export async function POST(request: Request) {
    try {
        const formData: SignUpFormValuesDto = await request.json();
        const response = await userApiService.signUp(formData) as any;

        const axiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/streamToken`, {
            userId: response.userId,
        });

        return NextResponse.json({
            userData: { id: response.userId, name: formData.username, email: formData.email },
            accessToken: response.token,
            streamToken: axiosResponse.data.token,
        });
    } catch (error: any) {
        console.log(error.message)
        // Check if the error is due to Prisma unique constraint violation
        if (error && error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta?.target === 'user_email_key') {
                return NextResponse.json(
                    { error: 'Email is already occupied!' },
                    { status: 409 }
                );
            } else if (error.code === 'P2002' && error.meta?.target === 'user_username_key') {
                return NextResponse.json(
                    { error: 'Username is already occupied!' },
                    { status: 409 }
                );
            }
        }
        // Handle other unexpected errors
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
