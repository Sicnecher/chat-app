import { DefaultGenerics, StreamChat,Channel as ChannelType } from 'stream-chat';
import {
    Chat,
    Channel,
    ChannelList,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
  } from 'stream-chat-react';
  import 'stream-chat-react/dist/css/v2/index.css';
  
  export default async function ChannelComponent(
    {client, channel}: 
    {client: StreamChat<DefaultGenerics>, channel: ChannelType<DefaultGenerics>}){
  
    if (!client || !channel) return <div>Loading...</div>;
  
    return (
      <Chat client={client}>
        <ChannelList />
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    );
  };