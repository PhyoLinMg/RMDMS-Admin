import { axiosClient } from '../client/axios_client';
import { Root } from '../model/parcel';
import { Room } from '../model/room';


export async function getAllParcels(page: number): Promise<Root> {
    const response = await axiosClient.get<Root>(`api/parcels/all?page=${page}`);
    return response;
}

export async function searchParcels(roomNumber: string,page: number): Promise<Root> {
    const response = await axiosClient.get<Root>(`api/parcels/search?roomNumber=${roomNumber}&page=${page}`);
    return response;
}