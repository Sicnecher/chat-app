import { SignUpFormValuesDto } from '@/app/models/dto/logform';
import { UserDto } from '@/app/models/dto/user';
import {PrismaClient} from "@prisma/client"
import axios from 'axios';
import { compare, hash } from 'bcryptjs';

const prisma = new PrismaClient()

class UserApiService{
    constructor() { }
    async signIn(data: any){
        const foundUser: UserDto | null = await prisma.user.findFirst({
            where: {
                    OR: [
                        { username: data.username },
                        { email: data.username }
                ]
            }
        })
        if (!foundUser) throw new Error('Unauthorized access!');
        const validation = data.isAppwrite ? true : await compare(data.password, foundUser.password);
        if (validation){
            const {data}  = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/jwt/generate`, foundUser)
            return { token: data.token, userId: foundUser.id }
        }
        throw new Error('Validation Failed');
    }

    async signUp(formData: SignUpFormValuesDto) {
        try{
            const hashedPassword = await hash(formData.password, 10);
            console.log('started hashing: ', hashedPassword)
            const newUser = await prisma.user.create({
                data: {
                    username: formData.username,
                    email: formData.email,
                    password: hashedPassword,
                }
            });
            console.log('created user: ', newUser)
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/jwt/generate`, newUser)
            console.log('went through jwt generation: ', data)
            return { token: data.token, userId: newUser.id }
        }catch(error){
            console.log(error)
            throw new Error()
        }
    }
}
export const userApiService = new UserApiService()