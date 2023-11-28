import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export default globalSlice;
export const {setToken} = globalSlice.actions;