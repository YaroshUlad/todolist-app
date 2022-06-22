import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '181db10a-029f-4271-8dd0-b3f4f6cb43d9',
    },
})