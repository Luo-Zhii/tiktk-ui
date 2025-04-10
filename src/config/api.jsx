
/**
 * 
Module Auth
 */
export const callRegister = (name, email, password, age, gender, address) => {
    return axios.post('/auth/register', { name, email, password, age, gender, address })
}

export const callLogin = (username, password) => {
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