import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'auth',
    initialState: {
        loading:false
    },
    reducers: {
        
        triggerLoading:(state,action)=>{
            state.loading = action.payload
        }
    },
});

export const { triggerLoading } = loadingSlice.actions

export default loadingSlice.reducer;
