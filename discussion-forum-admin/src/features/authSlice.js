import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = {...state.userInfo, ...action.payload}
        }
    },
});

export const { setUser } = authSlice.actions

export default authSlice.reducer;
