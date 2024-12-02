import { URL } from "@/App";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(Logout.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (formData) => {
    const response = await axios.post(`${URL}/auth/signup`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/signin", async (formData) => {
  const response = await axios.post(`${URL}/auth/signin`, formData, {
    withCredentials: true,
  });
  return response.data;
});

export const Logout = createAsyncThunk("/auth/logout", async () => {
  const { data } = await axios.post(
    `${URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return data;
});

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const response = await axios.get(`${URL}/auth/check-auth`, {
    withCredentials: true,
    Headers: {
      "Cache-Control":
        "no-store , no-cache , must-revalidate , proxy-revalidate",
      expires: "0",
    },
  });
  return response.data;
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
