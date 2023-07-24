import { createSlice } from '@reduxjs/toolkit';

const initialStateValue= {email: "", password: ""}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;