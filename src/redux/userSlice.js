import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isLoading: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isLoading = true;
        },

        getUsersSuccess: (state, action) => {
            state.users.isLoading = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },

        getUsersFailed: (state) => {
            state.users.isLoading = false;
            state.users.error = true;
        },
    },
});

export const { getUsersStart, getUsersSuccess, getUsersFailed } = userSlice.actions;
export default userSlice.reducer;
