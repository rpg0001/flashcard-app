import { baseUrl } from "../utils/constants";
import { User } from "./users";
import { axiosGet, axiosPost } from "../utils/axios";
import axios, { AxiosResponse } from "axios";

export async function signUp(
    email: string,
    password: string,
    username: string
): Promise<User> {
    const requestBody = {
        email: email,
        password: password,
        username: username,
    }
    const response = await axiosPost(`${baseUrl}/auth/signup`, requestBody);
    return response.data as User;
}

export async function signIn(
    email: string,
    password: string
): Promise<User> {
    const requestBody = {
        email: email,
        password: password
    }
    const response = await axiosPost(`${baseUrl}/auth/signin`, requestBody);
    return response.data as User;
}

export async function signOut(): Promise<AxiosResponse> {
    const response = await axios.post(`${baseUrl}/auth/signout`, {}, {
        withCredentials: true
    });
    return response;
}

export async function getMe(): Promise<User | null> {
    const response = await axiosGet(`${baseUrl}/auth/me`);
    return response.data.user as User;
}
