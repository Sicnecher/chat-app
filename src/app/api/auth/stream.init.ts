import { StreamChat } from "stream-chat";

const apiStreamSecret = process.env.STREAM_API_SECRET as string
const apiStreamKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string
console.log(`api: ${apiStreamKey}\nsecret: ${apiStreamSecret}`)

export const streamClient = StreamChat.getInstance(apiStreamKey, apiStreamSecret)