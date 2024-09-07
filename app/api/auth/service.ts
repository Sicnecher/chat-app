import {PrismaClient} from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient()

class ApiAuthService{
    constructor() { }

    async validateUser(payload:JwtPayload) {
        const foundUser = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });
        if (!foundUser) throw new Error('Unauthorized access!')
         return payload.email === foundUser.email ? payload : new Error('Unauthorized access!')
    }
}

export const apiAuthService = new ApiAuthService()