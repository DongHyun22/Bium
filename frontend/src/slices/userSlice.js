import { createSlice } from '@reduxjs/toolkit';

const initialStateValue= {email: "", password: ""}

const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue},
    reducers: {
        // login: (state, action) => {
        //     state.value = action.payload
        // },
        getUserInfo(state,action) {
            state.value = action.payload;
        }
    },
});

//api 폴더에 axios 요청 코드를 작성하고
// 여기에 acions를 만들어서 actions 안에 
// api 폴더에서 만든 axios를 불러온다
export const loginActions = userSlice.actions;

export default userSlice.reducer;