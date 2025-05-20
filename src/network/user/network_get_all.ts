import { axiosClient } from '../client/axios_client';
import { User } from '../model/user';

export async function getUsers(): Promise<User[]> {
    const response = await axiosClient.get<User[]>("api/users/all");
    return response;
}