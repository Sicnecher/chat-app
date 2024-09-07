'use client'
import axios from "axios"
import jwt, { JwtPayload } from "jsonwebtoken"
import { useEffect, useState } from "react"
import dotenv from "dotenv"
import { userDataAxiosFetcher } from "@/app/userData.axios"
import cookies from 'js-cookie'
dotenv.config()

export default function mainPage(props:any){
    const [userData, setUserData] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        function fetcher(){
            const token = cookies.get("access_token") as string
            const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string
            const payload = jwt.verify(token, secret) as JwtPayload
            userDataAxiosFetcher()
            .then((response) => {
                setUserData(response)
            })
        }
        !props ? fetcher() : setUserData(props)
    })
    return (
        <div>
            
        </div>
    )
}