import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookies from 'js-cookie'

export async function userDataAxiosFetcher(){
    const token = cookies.get("access_token") as string
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string
    const payload = jwt.verify(token, secret) as JwtPayload
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, payload.id)
    return data
}