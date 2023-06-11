import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: {},
    },
    reducers: {
        getUser: (state, action) => {
            state.userInfo = {...state.userInfo, ...action.payload}
        }
    },
});

export const { getUser } = authSlice.actions

export default authSlice.reducer;
