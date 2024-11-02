import { createSlice } from '@reduxjs/toolkit';

type TAuthProps = {
  isAuthenticated: boolean;
  token: string | null;
}

export const DEFAULT_AUTH_STATE: TAuthProps = {
  isAuthenticated: false,
  token: null,
}

const persistedState = localStorage.getItem("__auth__");
const initialAuthState = persistedState ? JSON.parse(persistedState) : null;

const initialState = initialAuthState || DEFAULT_AUTH_STATE;


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
