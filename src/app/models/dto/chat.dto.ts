export interface ChatModelDto{
    input: string;
    fromYou: boolean;
    time: Date;
}

export interface ContactModelDto{
    id: string;
    username: string;
    email: string;
    chatContext: ChatModelDto[]
}