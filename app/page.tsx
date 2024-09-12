'use client'
import { useEffect, useState } from "react";
import FormPage from "./log/formPage"
import ChatPage from "./components/chat/chatPage";
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { account } from "@/appwrite";
import { log } from "console";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<JwtPayload | boolean>()

  async function handleLogout(){
    Cookies.remove('access_token')
    const appwriteSession = await account.getSession('current')
    if(appwriteSession) await account.deleteSession('current')
    window.location.reload();
  }

  useEffect(() => {
    async function checkToken(){
      const accessToken = Cookies.get('access_token')
      if(accessToken){
        console.log(process.env.NEXT_PUBLIC_API_BASE)
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/jwt/validate`, {token: accessToken})
        .then((response) => {
          setUser(response)
        }).catch(() => {
          setUser(false)
        }).finally(() => {
          setIsLoading(false)
        })
      }else{
        setUser(false)
        setIsLoading(false)
      }
    }
    checkToken()
  }, [])

  return (
    <>
    {isLoading? (<ClipLoader color="#3498db" loading={isLoading} size={150} />) : (!user ? (<FormPage />) : (<ChatPage props={{user: user, logout: handleLogout}} />))}
    </>
  )
}