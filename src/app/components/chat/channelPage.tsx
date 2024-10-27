'use client'
import ChannelScroll from "./children/channelList"
import ChannelComponent from "./children/channel"
import AddChannelComponent from "./children/addChannel"
import { useEffect, useState } from "react"
import axios from "axios"
import { streamClient } from "../../stream.init"
import Youtube from "react-youtube"
import { DefaultGenerics, StreamChat } from "stream-chat"
import { LogOutBtn } from "@/app/page"

export default function ChannelPage(
	{user, streamUser, channelId}: 
	{user: any, streamUser:StreamChat<DefaultGenerics>, channelId: string | null}){

	const [channelList, setChannelList] = useState<any>({})
	const [channel, setChannel] = useState<any>(null);
	const [addChannelState, setAddChannelState] = useState<boolean>(false);
	const [isChannelReady, setIsChannelReady] = useState<boolean>(false);

	useEffect(() => {     
		if (!streamClient._user) return;
		console.log(streamClient)

		async function getChats(){
			const userContacts = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/user/chats/getContacts`, {params: {userId: user.id}}).then(res => res.data.chats)
			setChannelList(userContacts)
		}
		
		async function activateChannel(){
			if(channelId){
				const channel = streamClient.channel('messaging', channelId, {
					name: channelId
				});
				await channel.watch();
				setChannel(channel);
				console.log('real channel: ', channel)
				setIsChannelReady(true);
			}else{
				setIsChannelReady(true);
			}
		}
		
		getChats()
		activateChannel()
	}, [channelId])

	function addChannelHandler(){
		setAddChannelState(!addChannelState)
	}

	return(
		<div>
			<LogOutBtn />
			<span>Welcome {user.username}!</span>
			
			<div>
			   <ChannelScroll channelList={channelList} activateAddChannel={addChannelHandler} />
			</div>
				{addChannelState ? (
					<AddChannelComponent user={user} deactivateComponent={addChannelHandler}/>
				) : (
					streamClient._user && channel && <ChannelComponent client={streamUser} channel={channel} />
				)}
		</div>
	)
}