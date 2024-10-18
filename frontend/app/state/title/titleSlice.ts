import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { createAlert, setAlert, startLoader, stopLoader } from "../alert/alertSlice";
import { BACKEND_URL } from "../../utils/utils";
import { redirect } from "next/navigation";

const initialState: TitleState | [] = {
    titles: [],
}

const titleSlice = createSlice({
    name: "title",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(createTitle.fulfilled, (state, action: PayloadAction<SingleTitleState | null>) => {
            if (action.payload) {
                state.titles = [action.payload, ...state.titles];
            }
        })

        builder.addCase(deleteTitle.fulfilled, (state, action: PayloadAction<string>) => {
            state.titles = state.titles.filter((title: SingleTitleState) => title.uuid !== action.payload);
        });

        builder.addCase(fetchTitles.fulfilled, (state, action: PayloadAction<SingleTitleState[]>) => {

            state.titles = action.payload
        });
    }
})


export const createTitle = createAsyncThunk<
    SingleTitleState,
    { title: string; subject: string },
    { rejectValue: string }
>(
    'title/createTitle',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.post(`${BACKEND_URL}/title`, data, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            const title: SingleTitleState = response.data;
            dispatch(setAlert({
                message: 'Title was successfully created',
                title: "Title Created",
                status: "SUCCESS"
            }));
            return title;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to create title.',
                title: "Creation Failed",
                status: "ERROR"
            }));
            return rejectWithValue("Error creating title");
        } finally {
            dispatch(stopLoader());
        }
    }
);



export const fetchTitles = createAsyncThunk<
    SingleTitleState[],
    void,
    { rejectValue: string }
>(
    'title/fetchTitles',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.get(`${BACKEND_URL}/title`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data) {
                console.log({ data: response.data })
            }else{
                console.log({ data: "nont found yet" })
                
            }
            const titles: SingleTitleState[] = response.data;
            return titles;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to fetch Titles, try again later.',
                title: "Failed to fetch",
                status: "ERROR"
            }));
            return rejectWithValue("Error fetching titles");
        } finally {
            dispatch(stopLoader());
        }
    }
);

export const getTitle = createAsyncThunk<
    SingleTitleState,
    void,
    { rejectValue: string }
>(
    'title/getTitle',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            const response = await axios.get(`${BACKEND_URL}/title`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            const title: SingleTitleState = response.data;
            return title;

        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to fetch Title, try again later.',
                title: "Failed to fetch",
                status: "ERROR"
            }));
            return rejectWithValue("Error fetching title");
        } finally {
            dispatch(stopLoader());
        }
    }
);
// Define the deleteTitle thunk
export const deleteTitle = createAsyncThunk<
    string,
    { id: string },
    { rejectValue: string }
>(
    'title/delete',
    async ({ id }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(startLoader());
            await axios.delete(`${BACKEND_URL}/title/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                },
            });
            return id;
        } catch (error) {
            console.error(error);
            dispatch(setAlert({
                message: 'Failed to delete Title, try again later.',
                title: "Failed to delete Title",
                status: "ERROR"
            }));
            return rejectWithValue("Error deleting title");
        } finally {
            dispatch(stopLoader());
        }
    }
);

export const { } = titleSlice.actions;
export default titleSlice.reducer;