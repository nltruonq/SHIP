import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isLoading: false,
            error: false,
        },
        register: {
            isLoading: false,
            error: false,
            success: false,
        },
        msg: '',
    },
    reducers: {
        //Login
        loginStart: (state) => {
            state.login.isLoading = true;
        },

        loginSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.msg = '';
        },

        loginFailed: (state, action) => {
            state.login.isLoading = false;
            state.login.error = true;
            state.msg = action.payload;
        },

        //Register
        registerStart: (state) => {
            state.register.isLoading = true;
        },

        registerSuccess: (state, action) => {
            state.register.isLoading = false;
            state.register.error = false;
            state.register.success = true;
            state.msg = '';
        },

        registerFailed: (state, action) => {
            state.register.isLoading = false;
            state.register.error = true;
            state.register.success = false;
            state.msg = action.payload;
        },

        //Logout
        logoutStart: (state) => {
            state.login.isLoading = true;
            state.login.currentUser = null;
        },

        logoutSuccess: (state) => {
            state.login.isLoading = false;
            state.login.currentUser = null;
            state.login.error = false;
            state.msg = '';
        },

        logoutFailed: (state, action) => {
            state.login.isLoading = false;
            state.login.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
