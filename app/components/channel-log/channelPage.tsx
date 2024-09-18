import ChannelScroll from "../channel-list/channel.list"
import ChannelComponent from "./channel"
import AddChannelComponent from "../channel-list/addChannel"
import { useEffect, useState } from "react"
import axios from "axios"
import { streamClient } from "@/stream.init"
import { useRouter } from "next/router"
export default function ChatPage({user, logout}: {user: any, logout: any}){
    const [channelList, setChannelList] = useState<any>({})
    const [channel, setChannel] = useState<any>(null);
    const [addChannelState, setAddChannelState] = useState<boolean>(false)
    const router = useRouter()
    const { queryChannel } = router.query as { queryChannel: string };

    useEffect(() => {
        async function getChats(){
            const userContacts = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/chats/getContacts`, {params: {userId: user.id}}).then(res => res.data.chats)
            setChannelList(userContacts)
        }
        async function activateChannel(){
            if(queryChannel){
                const channel = streamClient.channel('messaging', queryChannel);
                await channel.watch();
                setChannel(channel);
            }
        }
        getChats()
        activateChannel()
    }, [])

    function addChannelHandler(){
        setAddChannelState(!addChannelState)
    }

    return(
        <div>
            <span>Welcome {user.username}!</span>
            <div>
               <ChannelScroll channelList={channelList} activateAddChannel={addChannelHandler} />
            </div>
            {
                addChannelState ? (
                    <AddChannelComponent user={user} deactivateComponent={addChannelHandler}/>
                ) : (
                   <ChannelComponent client={streamClient} user={user} channel={channel}/>
                )
            }
        </div>
    )
}