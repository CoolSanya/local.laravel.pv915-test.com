export enum AuthActionTypes {
    LOGIN_AUTH = "LOGIN_AUTH"
}

export interface ILoginModel {
    email: string,
    password: string
}

export interface ILoginResponse {
    access_token: string,
    expires_in: string
}

export type LoginError = {
    email: Array<string>, 
    password: Array<string>, 
    error: string 
};

export interface IUser {
    email: string,
    image: string
}

export interface AuthState {
    user: null|IUser,
    isAuth: boolean
}

export interface LoginAuthAction {
    type: AuthActionTypes.LOGIN_AUTH,
    payload: IUser
}


export type AuthAction = LoginAuthAction;