import axios, { AxiosResponse } from "axios";

export async function axiosGet(
    url: string
): Promise<AxiosResponse> {
    const response = await axios.get(url, {
        withCredentials: true
    });
    return response;
}

export async function axiosPost(
    url: string,
    requestBody: any
): Promise<AxiosResponse> {
    console.log("axiosPost - Calling POST URL: " + url);
    const response = await axios.post(url, requestBody, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("axiosPost - Called POST URL: " + url);
    return response;
}

export async function axiosPatch(
    url: string,
    requestBody: any
): Promise<AxiosResponse> {
    const response = await axios.patch(url, requestBody, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}

export async function axiosDelete(
    url: string
): Promise<AxiosResponse> {
    const response = await axios.delete(url, {
        withCredentials: true
    });
    return response;
}
