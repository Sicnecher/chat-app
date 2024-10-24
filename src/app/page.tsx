// 'use client'
// import { useEffect, useState } from "react";
// import axios from 'axios'
// import { StreamChat } from "stream-chat";
// import { 
//   Chat,
//   Channel,
//   MessageList,
//   MessageInput,
//   ChannelHeader,
//   Thread,
//   Window,
//   LoadingIndicator
//  } from "stream-chat-react";

//  const apiKey = process.env.NEXT_PUBLIC_STREAM_TOKEN as string

//  const user = {
//   id: '1',
//   name: 'jhon doe',
//   image: 'https://getstream.imgix.net/images/random_svg/FS.png'
//  }

// export default function App() {
//   const [client, setClient] = useState<any>()
//   const [channel, setChannel] = useState<any>()

//   useEffect(() => {
//     async function init(){
//       const chatClient = StreamChat.getInstance(apiKey)
//       await axios.post('http://localhost:3000/api/auth', user).then( async (response) => {
//         console.log(response.data)
//         chatClient.connectUser(user, response.data.streamToken)
//       })
//       const channelInstance = chatClient.channel('messaging', 'general', {
//         image: 'https://www.drupal.org/files/project-images/react.png',
//         name: 'General',
//         members: [user.id]
//       })
//       await channelInstance.watch()
//       setChannel(channelInstance)
//       setClient(chatClient)
//     }
//     init()

//     if(client) return () => client.disconnectUser()
//   }, [])

//   if(!channel || !client) return <LoadingIndicator />

//   return (
//     <Chat client={client} theme="messaging light">
//       <Channel channel={channel}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput />
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   )
// }
'use client'
import { useEffect, useState } from "react";
// import FormPage from "./components/log/formPage"
// import ChannelPage from "./components/channel-log/channelPage";
import ClipLoader from 'react-spinners/ClipLoader';
import Cookies from "js-cookie";
import axios from "axios";
import { checkAppwriteSession } from "./appwrite.service";
import { streamClient } from "./stream.init"
import { Thread, Channel, ChannelHeader, Chat, MessageInput, MessageList, Window } from "stream-chat-react";
import { DefaultGenerics, StreamChat } from "stream-chat";
// import ChannelPage from "./components/channel-log/channelPage";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any | false>()
  const [streamUser, setStreamUser] = useState<any>()
  const [returnedComponent, setReturnedComponent] = useState<any>('')

  async function handleLogout(){
    Cookies.remove('access_token')
    window.location.href = "/"
  }

  useEffect(() => {
    async function checkAccess(){
        async function checkAccessToken(){
          const accessToken = Cookies.get('access_token')
          if(accessToken){
            await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/auth/jwt/validate`, {token: accessToken}).then(({data}) => {
              // const userData = {
              //   id: data.userData.id,
              //   email: data.userData.email,
              //   name: data.userData.username
              // }
              // streamClient.connectUser(userData, data.streamToken)
              // const channel = streamClient.channel('messaging', 'channel', {
              //   name: 'Talk about it'
              // })
              // setStreamUser(userData)
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

  // return isLoading? (<><ClipLoader color="#3498db" loading={isLoading} size={150} /></>) : (user ? <ChannelPage user={user} /> : <FormPage />)
  return 'hello'
}
