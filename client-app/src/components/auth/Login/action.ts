import { AuthAction, AuthActionTypes, 
    ILoginModel, ILoginResponse, IUser, LoginError } from './types';
import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from "axios";
import jwt from 'jsonwebtoken';

export const loginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await http.post<ILoginResponse>('api/auth/login', data);

            const {access_token} = response.data;
            localStorage.token = access_token;
            AuthUser(access_token, dispatch);
            
            return Promise.resolve();
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                console.log("Action problem", error);
                const serverError = error as AxiosError<LoginError>;
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    }
}

export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) =>  {
    const user = jwt.decode(token) as IUser;
    dispatch({
      type: AuthActionTypes.LOGIN_AUTH,
      payload: user,
    });
}