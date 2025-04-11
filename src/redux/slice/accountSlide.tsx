import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../config/api';

// ✅ Thunk lấy thông tin tài khoản
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await callFetchAccount();
            console.log("✅ [fetchAccount] API Response:", response);
            return response.data; // nên là object chứa { user: ... }
        } catch (error) {
            console.error("❌ [fetchAccount] Error:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        _id: string;
        email: string;
        name: string;
    };
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        _id: "",
        email: "",
        name: ""
    },
    activeMenu: 'home'
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action) => {
            console.log("⚡ setUserLoginInfo payload:", action.payload);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user._id = action.payload?._id ?? "";
            state.user.email = action.payload?.email ?? "";
            state.user.name = action.payload?.name ?? "";
        },
        setLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = { _id: "", email: "", name: "" };
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        },
        findUserInfo: (state, action) => {
            state.isAuthenticated = true;
            state.user._id = action.payload?._id ?? "";
            state.user.email = action.payload?.email ?? "";
            state.user.name = action.payload?.name ?? "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccount.pending, (state) => {
                console.log("🚀 fetchAccount.pending");
                state.isAuthenticated = false;
                state.isLoading = true;
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                console.log("✅ fetchAccount.fulfilled", action.payload);
                const user = action.payload?.data?.user;
                if (user) {
                    state.isAuthenticated = true;
                    state.isLoading = false;
                    state.user._id = user._id || "";
                    state.user.email = user.email || "";
                    state.user.name = user.name || "";
                } else {
                    state.isAuthenticated = false;
                    state.isLoading = false;
                }
            })
            .addCase(fetchAccount.rejected, (state, action) => {
                console.error("❌ fetchAccount.rejected", action.payload);
                state.isAuthenticated = false;
                state.isLoading = false;
            });
    },
});

export const {
    setActiveMenu,
    setUserLoginInfo,
    setLogoutAction,
    setRefreshTokenAction
} = accountSlice.actions;

export default accountSlice.reducer;
