import { StreamChat } from "stream-chat";

const apiStreamSecret = process.env.STREAM_API_SECRET as string
const apiStreamKey = process.env.NEXT_PUBLIC_STREAM_KEY as string

export const streamClient = StreamChat.getInstance(apiStreamKey, apiStreamSecret)