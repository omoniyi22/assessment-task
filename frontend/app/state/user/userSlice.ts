import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { createAlert, setAlert, startLoader, stopLoader } from "../alert/alertSlice";
import { BACKEND_URL } from "../../utils/utils";
import { redirect } from "next/navigation";

const initialState: UserState = {
    profile: (localStorage.getItem("profile") || null) as UserState["profile"] | null,
    token: localStorage.getItem("token")
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            state.token = null
            state.profile = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState | null>) => {
            if (action.payload) {
                state.profile = action.payload.profile;
                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token)
                    state.token = localStorage.getItem("token")
                }
                if (action.payload.profile) {                    
                    localStorage.setItem("username", action.payload.profile.username)
                    state.profile = action.payload.profile
                }
            }
        })
    }
})


export const loginUser = createAsyncThunk<
    UserState,
    { email: string; password: string },
    { rejectValue: string }
>(
    'user/loginUser',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.post(`${BACKEND_URL}/auth/login`, credentials);
            const user: UserState = response.data;
            console.log({ user })
            return user;
        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to log in. Please check your credentials and try again',
                title: "Login Failed",
                status: "ERROR"
            }))
            return rejectWithValue("")
        } finally {
            dispatch(stopLoader());
        }
    }
);

export const RegisterUser = createAsyncThunk(
    'user/register',
    async (credentials: RegisterProps, { dispatch }) => {
        try {
            dispatch(startLoader());
            console.log({ credentials })
            const response = await axios.post(`${BACKEND_URL}/auth/register`, credentials);
            const user: UserState = response.data;
            dispatch(stopLoader());
            // router.push("/login")
            return user;
        } catch (error) {
            let { response }: any = await error;
            let alertdata: Omit<AlertProps, "closeModal">
            dispatch(stopLoader());
            if (response.data.message == "Arguments are invalid.") {
                alertdata = { title: "Wrong sign up data", message: `${response.data.messages.join(" ")}`, status: "ERROR" }
                dispatch(createAlert(alertdata))
            }
            console.log({ register: error })
        }
    }
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;