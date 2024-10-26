'use client'
import { useEffect, useState } from "react";
import FormPage from "./components/log/formPage"
import ChannelPage from "./components/chat/channelPage";
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from "js-cookie";
import axios from "axios";
import { account, checkAppwriteSession } from "./appwrite.service";
import { streamClient } from "./stream.init"

export function LogOutBtn(){
  async function handleLogout(){
    Cookies.remove('access_token')
    account.deleteSession('current')
    window.location.href = "/"
  }
  return <button onClick={handleLogout}>Quit</button>
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any | false>()

  useEffect(() => {
    async function checkAccess(){
        async function checkAccessToken(){
          const accessToken = Cookies.get('access_token')
          if(accessToken){
            await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/jwt/validate`, {token: accessToken}).then(({data}) => {
              const userData = {
                id: data.userData.id,
                email: data.userData.email,
                name: data.userData.username
              }
              streamClient.connectUser(userData, data.streamToken)
              setUser(data.userData)
            })
          }else{
            setUser(false)
          }
        }

      await checkAppwriteSession().then(async () => {
        await checkAccessToken().catch(error => new Error(error))
      }).catch(async () => await checkAccessToken().catch(error => new Error(error))).finally(() => {
        setIsLoading(false)
      })
    }

    checkAccess()

    return () => {
      if(streamClient.user){
        streamClient.disconnectUser();
      }
    }
  }, [])

  return isLoading? (<><ClipLoader color="#3498db" loading={isLoading} size={150} /></>) : (user ? <ChannelPage user={user} streamUser={streamClient} channelId={''} /> : <FormPage />)
}
