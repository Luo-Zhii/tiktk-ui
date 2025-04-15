export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}


export interface IAccount {
    access_token: string;
    user: {
        _id: string;
        email: string;
        name: string;
    }
}

export interface IGetAccount extends Omit<IAccount, "access_token"> { }


export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    age: number;
    gender: string;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}


export interface IMouseLog {
    _id?: string;
    userId: string;
    name: string;
    email: string;
    date: string;
    time: string;
    duration: number;
    leftClick: boolean;
    rightClick: boolean;
    middleClick: boolean;
    mouseX: number;
    mouseY: number;
    scrollX: number;
    scrollY: number;
}