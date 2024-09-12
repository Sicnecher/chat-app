import { account } from "@/appwrite";
import axios from "axios";

export async function useAuth(){
    const googleAccount = await account.get()
    if(googleAccount){
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user`, googleAccount)
        window.location.reload()
    }
}