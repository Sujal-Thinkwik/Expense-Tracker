import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export type IAuthToken = {
  readonly access: string;
  readonly refresh: string;
  readonly expires: string | number;
};

export type IUserProfile = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly createdAt?: string | null;
};

export type IAuthSlice = {
  token: IAuthToken;
  user: IUserProfile | null;
  isLoggedIn: boolean;
};

const initialState: IAuthSlice = {
  token: {
    access: '',
    refresh: '',
    expires: ''
  },
  user: null,
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_AUTH_TOKEN: (state, action: PayloadAction<IAuthToken>) => ({
      ...state,
      token: action.payload,
      isLoggedIn: !!action.payload.access
    }),
    SET_AUTH_USER: (state, action: PayloadAction<IUserProfile | null>) => ({
      ...state,
      user: action.payload
    })
  }
});

export const { SET_AUTH_TOKEN, SET_AUTH_USER } = authSlice.actions;

export const GET_AUTH_CONFIG = (state: RootState) => state.app.auth;
