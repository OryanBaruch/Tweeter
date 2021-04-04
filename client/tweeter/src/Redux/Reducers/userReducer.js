import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAIL } from "../Actions/actionTypes";
import jwt_decode from "jwt-decode";


export const registerReducer=(state={}, action)=>{
    const {type, payload}=action
    switch (type) {
        case REGISTER_SUCCESS:
                state=payload
                return {...state}
        default:
            return state
    }
}

export const loginReducer=(state={}, action)=>{
    const {type, payload}=action
    switch (type) {
        case LOGIN_SUCCESS:
            const userInfo=jwt_decode(payload)
                return {
                    userInfo
                };
        case LOGIN_FAIL:
            return {
                error:payload
            }
        default:
            return state
    }
}
