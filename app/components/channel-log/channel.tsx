import { Chat, Channel, MessageList, MessageInput, Window } from 'stream-chat-react';

export function ChatComponent({ channel, client }: { channel: any, user: any, client: any }){

    return (
        <Chat client={client} theme="str-chat__theme-light">
            <Channel channel={channel}>
                <Window>
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>            
        </Chat>
    );
};

export default ChatComponent;