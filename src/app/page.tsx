'use client'
import { useEffect, useState } from "react";
import axios from 'axios'
import { StreamChat } from "stream-chat";
import { 
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelHeader,
  Thread,
  Window,
  LoadingIndicator
 } from "stream-chat-react";

 const apiKey = process.env.NEXT_PUBLIC_STREAM_TOKEN as string

 const user = {
  id: '1',
  name: 'jhon doe',
  image: 'https://getstream.imgix.net/images/random_svg/FS.png'
 }

export default function App() {
  const [client, setClient] = useState<any>()
  const [channel, setChannel] = useState<any>()

  useEffect(() => {
    async function init(){
      const chatClient = StreamChat.getInstance(apiKey)
      await axios.post('http://localhost:3000/api/auth', user).then( async (response) => {
        console.log(response.data)
        chatClient.connectUser(user, response.data.streamToken)
      })
      const channelInstance = chatClient.channel('messaging', 'general', {
        image: 'https://www.drupal.org/files/project-images/react.png',
        name: 'General',
        members: [user.id]
      })
      await channelInstance.watch()
      setChannel(channelInstance)
      setClient(chatClient)
    }
    init()

    if(client) return () => client.disconnectUser()
  }, [])

  if(!channel || !client) return <LoadingIndicator />

  return (
    <Chat client={client} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
}