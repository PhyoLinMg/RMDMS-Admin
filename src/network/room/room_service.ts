import { axiosClient } from '../client/axios_client';
import { Room } from '../model/room';


export async function getAllRooms(): Promise<Room[]> {
    const response = await axiosClient.get<Room[]>("api/rooms");
    return response;
}