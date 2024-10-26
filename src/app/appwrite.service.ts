import { Account, Client } from 'appwrite';
import { streamClient } from "./stream.init"
import axios from "axios"
import Cookies from 'js-cookie'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`);

const account = new Account(client)

export {account, client}

export async function checkAppwriteSession(){
    try{
      const appwriteUser = await account.get()
      console.log('appwrite user: ',appwriteUser)
      if(appwriteUser){
          await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/user/appwrite`, appwriteUser).then(async ({data}) => {
              Cookies.set('access_token', data.accessToken)
              streamClient.connectUser(data.userData, data.streamToken)
              account.deleteSession('current')
          })
        }
      }catch(appwriteError){
        console.error('Error fetching Appwrite session:', appwriteError);
        throw new Error('Failed to retrieve Appwrite user session.');
      }
    }