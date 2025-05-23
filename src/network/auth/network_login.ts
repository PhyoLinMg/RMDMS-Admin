import { axiosClient } from '../client/axios_client';
import { Tokens } from '../model/tokens';

export async function auth_login(username: String, password: String): Promise<Tokens> {
    const response = await axiosClient.post<Tokens>("auth/login", JSON.stringify({ username, password }));
    console.log(response.accessToken);
    return response;
}

export async function refresh_token(): Promise<Tokens> {
    console.log("refresh token is called");
    const refresh_token = localStorage.getItem('refreshToken');
    if (!refresh_token) {
        throw new Error('No refresh token available');
    }
    const response = await axiosClient.post<Tokens>("auth/refresh", JSON.stringify({ refreshToken: refresh_token }));
    return response;
}