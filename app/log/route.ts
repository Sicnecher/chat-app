import envConfig from '@/app/env.config';
import { LoginFormValues, SignUpFormValues } from '@/app/models/dto/logForm';
import axios, { AxiosResponse } from 'axios'

export default function GET(req:any, res:any){
    return 'hhiiii'
}

class LogService{
    constructor(){ }
    async signUpUser (formData: SignUpFormValues): Promise<any> {
        try{
            await axios.post(`${envConfig.baseUrl}/user/up`, formData)
            .then((response: AxiosResponse<any>) => {
                if(response){
                    return response.data
                }else{
                    return new Error(response)
                }
            })
        }catch(err: any){
            throw new Error(err)
        }
    }
    async signInUser(formData: LoginFormValues): Promise<any>{
        try{
            axios.post(`${envConfig.baseUrl}/user/in`, formData).
            then((response) => {
                if(response){
                    return response.data
                }else{
                    throw new Error(response)
                }
            })
        }catch(err: any){
            throw new Error(err)
        }
    }
}