import { createSlice } from "@reduxjs/toolkit";

const initialState = {email: null, fullname: null, id: null, role: null, token: null};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.token != null;
export const selectUserId = (state) => state.auth.id;
export const selectUserFullname = (state) => state.auth.fullname;
export const selectUserEmail = (state) => state.auth.email;
export const selectUserRole = (state) => state.auth.role;

export const { login, logout } = authSlice.actions;
export const { reducer: authReducer } = authSlice;

