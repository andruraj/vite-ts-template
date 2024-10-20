import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { clearCookies, getCookie, setCookie } from "@/utils/cookies";
import { isEmpty } from "@/utils/isEmpty";

// Define types for user details and the initial state
interface UserDetails {
  // Add the properties you expect in userDetails here
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  userDetails: UserDetails | null;
  isAuthenticated: boolean;
}

// Define the initial state
const initialState: AuthState = {
  userDetails: null,
  isAuthenticated: false,
};

// Initialize the state based on the cookie
const authtoken = getCookie(import.meta.env.VITE_COOKIE_NAME);

// Check if a token is stored in cookies
if (!isEmpty(authtoken)) {
  try {
    const { exp } = jwtDecode(authtoken);
    const isExpired = !isEmpty(exp) ? exp < Math.floor(Date.now() / 1000) : 0;
    if (!isExpired) {
      // Decode user details from token (update according to your token structure)
      initialState.userDetails = jwtDecode(authtoken);
      initialState.isAuthenticated = true;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; userDetails: UserDetails }>
    ) => {
      const { token, userDetails } = action.payload;

      if (!isEmpty(token)) {
        const { exp } = jwtDecode<{ exp: number }>(token); // Type the decoded JWT

        clearCookies();

        setCookie(import.meta.env.VITE_COOKIE_NAME, token, {
          maxAge: isEmpty(exp)
            ? 3600
            : Math.max(0, Math.floor((exp * 1000 - Date.now()) / 1000)),
        });

        state.userDetails = userDetails;
        state.isAuthenticated = true; // Set authentication status to true
      }
    },
    logout: (state) => {
      state.userDetails = null;
      state.isAuthenticated = false; // Update authentication status on logout
      clearCookies();
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export const isAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const getUserDetails = (state: { auth: AuthState }) =>
  state.auth.userDetails;

export const authReducer = authSlice.reducer;
