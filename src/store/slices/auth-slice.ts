import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminUser } from "@/types";

type AuthState = {
  token: string | null;
  user: AdminUser | null;
  hydrated: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  hydrated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AdminUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.hydrated = true;
    },
    hydrateAuth: (
      state,
      action: PayloadAction<{ token: string | null; user: AdminUser | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.hydrated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.hydrated = true;
    }
  }
});

export const { setCredentials, hydrateAuth, logout } = authSlice.actions;

export default authSlice.reducer;
