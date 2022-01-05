export interface IRegisterModel {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export type RegisterError = {
    name: Array<string>,
    email: Array<string>,
    password: Array<string>,
    error: string
}

export enum RegisterActionTypes {
    REGISTER_AUTH = "REGISTER_AUTH",
}

export interface RegisterAuthAction {
    type: RegisterActionTypes.REGISTER_AUTH
}

export type RegisterAction = RegisterAuthAction;
