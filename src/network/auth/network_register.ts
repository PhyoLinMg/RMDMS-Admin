
import { axiosClient } from '../client/axios_client';
import { Tokens } from '../model/tokens';

export async function gg(username:String, password:String): Promise<Tokens>{
    const data= axiosClient.post<Tokens>("");
    return data;
}