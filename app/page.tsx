'use client'
import { useEffect, useState } from "react";
import FormPage from "./log/formPage"
import ChatPage from "./components/chat/chatPage";
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from "js-cookie";
import styles from "./globals.module.css"
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<JwtPayload | boolean>()
  useEffect(() => {
    async function checkToken(){
      const accessToken = Cookies.get('access_token')
      if(accessToken){
        console.log(process.env.NEXT_PUBLIC_API_BASE)
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/jwt/validate`, accessToken)
        .then((response) => {
          setUser(response)
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
    {isLoading? (
      <div className={styles.clipBoardContainer}>
        <ClipLoader color="#3498db" loading={isLoading} size={150} />
      </div>
    ) : (
      !user ? (
        <FormPage />
      ) : (
        <ChatPage props={user} />
      )
    )}
    </>
  )
}