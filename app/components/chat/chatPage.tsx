import ContactScroll from "../contact/contact.scroll"
import ContactInfo from "../contact/contact.info"
import Chat from "./chat"
import { useEffect, useState } from "react"
import axios from "axios"
export default function ChatPage({props}: {props: any}){
    const user = props.user.data.response
    // const [isLoading, setIsLoading] = useState<boolean>(true)
    const [chats, setChats] = useState<any>({})
    useEffect(() => {
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/chats`, user).then((response) => {
                setChats(response.data.chats)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
            })
        }, [])
    return (
            <div>
            <h1>Welcome {user.username}!</h1>
            <ContactScroll props={<ContactInfo props={{user: user, chats: chats}} />} />
            <Chat props={{user: user, chats: chats}}/>
            <>{chats[0]}</>
        </div>
    )
}