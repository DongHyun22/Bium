import { createSlice } from '@reduxjs/toolkit';

const initialStateValue= {email: "", password: ""}

const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue},
    reducers: {
        getUserInfo(state,action) {
            state.value = action.payload;
        }
    },
});

export const loginActions = userSlice.actions;

export default userSlice.reducer;