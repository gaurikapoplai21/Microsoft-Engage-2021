import {createSlice} from "@reduxjs/toolkit"
import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
    },
    reducers:{
        logins: (state,action) => {
            state.user = action.payload;
        },
        logout:(state) =>{
            state.user = null
        },
    },

});

export const {logins,logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

//export default userSlice.reducer;

export default persistReducer(persistConfig,userSlice.reducer)