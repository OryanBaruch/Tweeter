import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL } from "./actionTypes";
import jwt_decode from "jwt-decode";


export const registerAction = (
  username,
  email,
  birthdate,
  phonenumber,
  profile_photo,
  password,
  confirm_password
) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        birthdate,
        phonenumber,
        profile_photo,
        password,
        confirm_password
      }),
    });
    console.log(res.body)
    const data = await res.json();
    console.log(data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(`error`, error.error);
  }
};

export const loginAction = (email, password) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    data.invalidMessage ? alert(data.invalidMessage.msg) : alert(data.msg)
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("userInfo1", JSON.stringify(jwt_decode(data.access_token)));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.access_token,
    });
  } catch (error) {
    dispatch({
      type:LOGIN_FAIL,
      payload:'INVALID'
    })
  }
};
