import { IBackendRes,  IAccount, IUser,IGetAccount, IMouseLog } from '../types/interface.d';
import axios from '../config/axios-customize';

/**
 * 
Module Auth
 */
export const callRegister = (name: string, email: string, password: string, age: number, gender: string) => {
    return axios.post<IBackendRes<IUser>>('/auth/register', { name, email, password, age, gender })
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/auth/account')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/auth/logout')
}

/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>('/users', { ...user })
}

export const callUpdateUser = (user: IUser, id: string) => {
    return axios.patch<IBackendRes<IUser>>(`/users/${id}`, { ...user })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/users/${id}`);
}

/** 
 * 
 * Mouse Log 
 */

export const callCreateMouseLogToAstra = (logs: IMouseLog[]) => {
    return axios.post<IBackendRes<IMouseLog>>('/astra/log', logs)
}


export const callCreateMouseLogToMongo = (logs: IMouseLog[]) => {
    return axios.post<IBackendRes<IMouseLog>>('/mouse-event', logs)
}