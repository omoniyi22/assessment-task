import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { title } from "process";

const initialState: AlertState = {
    status: null,
    message: "",
    title: "",
    loading: false,
    timeoutId: null
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<Omit<AlertState, "loading" | "timeoutId">>) => {
            state.message = action.payload.message
            state.status = action.payload.status
            state.title = action.payload.title
            state.loading = false
        },
        clearAlert: (state) => {
            state.message = null
            state.status = null
            state.title = null
            state.loading = false
        },
        stopLoader: (state) => {
            state.loading = false;
        },
        startLoader: (state) => {
            state.loading = true;
            state.message = null
            state.status = null
            state.title = null
        },
        setAlertTimeoutId(state, action: PayloadAction<NodeJS.Timeout | null>) {
            state.timeoutId = action.payload;
        },
    },
})


export const createAlert = createAsyncThunk(
    'alert/create',
    async (alertData: any, { dispatch, getState }) => {
        const state = getState() as { alert: AlertState };
        const currentTimeout = state.alert.timeoutId;

        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }

        dispatch(setAlert(alertData));

        // Set a timeout to clear the alert after 5 seconds
        const timeoutId = setTimeout(() => {
            dispatch(clearAlert());
        }, 5000);


        dispatch(setAlertTimeoutId(timeoutId))

    }
);



export const { setAlert, clearAlert, startLoader, stopLoader, setAlertTimeoutId } = alertSlice.actions;

export default alertSlice.reducer;