import { SignUpFormValuesDto } from '@/app/models/dto/logForm';
import { UserDto } from '@/app/models/dto/user';
import {PrismaClient} from '@prisma/client'
import axios from 'axios';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

class UserApiService{
    constructor() { }
    async signIn(user: any){
        const foundUser: UserDto | null = await prisma.user.findFirst({
            where: {
                    OR: [
                        {username: user.username },
                        { email: user.username }
                ]
            }
        })
        if (!foundUser) throw new Error('Unauthorized access!');
        const validation = await bcrypt.compare(user.password, foundUser.password);
        if (validation){
            const {data}  = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/jwt/generate`, foundUser)
            return { token: data.token, userId: foundUser.id }
        }
        throw new Error('Validation Failed');
    }

    async signUp(user: SignUpFormValuesDto) {
        try{
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = await prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                }
            });
            const {data}  = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/jwt/generate`, newUser)
            return { token: data.token, userId: newUser.id }
        }catch(error){
            throw new Error()
        }
    }
}

export const userApiService = new UserApiService()