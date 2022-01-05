import { AuthAction, AuthActionTypes, AuthState } from './types';

const initialState : AuthState = {
    user: null,
    // user: {
    //     email: "blonda@gmail.com",
    //     image: "https://wellnesso.ru/wp-content/uploads/2019/02/sharliz-teron-blondinka.jpg"
    // },
    isAuth: false,
    //isAuth: true
}

export const authReducer = (state=initialState, action: AuthAction) : AuthState => {
    switch(action.type) {
        case AuthActionTypes.LOGIN_AUTH: {
            return {
                ...state, isAuth: true, user: action.payload
            };
        }
        default:
            return state;
    }
}