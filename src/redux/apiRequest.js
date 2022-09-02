import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import { getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://api-ship.onrender.com/v1/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed(err.response.data));
    }
};

export const registerUser = async (user, dispatch, handleChangeSign) => {
    dispatch(registerStart());
    try {
        await axios.post(`http://api-ship.onrender.com/v1/auth/register`, user);
        dispatch(registerSuccess());
        handleChangeSign();
    } catch (err) {
        dispatch(registerFailed(err.response.data));
    }
};

export const logoutUser = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post('http://api-ship.onrender.com/v1/auth/logout', id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(logoutFailed());
    }
};

export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(`http://api-ship.onrender.com/v1/user`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed(err.response.data));
    }
};
