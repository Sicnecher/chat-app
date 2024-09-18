'use client'
import { useEffect, useState } from "react";
import FormPage from "./log/formPage"
import ChannelPage from "./components/channel-log/channelPage";
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { account } from "@/appwrite";

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
      const appwriteSession = await account.getSession('current')
      if(accessToken){
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/jwt/validate`, {token: accessToken}).then((response) => {
        setUser(response)
      }).catch(() => {
        setUser(false)
      }).finally(() => {
        setIsLoading(false)
      })
      }else if(appwriteSession){
        account.get().then((response) => {
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, response).then((res) => {
            Cookies.set('access_token', res.data.token)
                })
              }).catch((error) => {
                console.error('Error fetching user data:', error);
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
    {isLoading? (<ClipLoader color="#3498db" loading={isLoading} size={150} />) : (!user ? (<FormPage />) : (<ChannelPage user={user} logout = {handleLogout} />))}
    </>
  )
}