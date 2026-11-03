import {
  IUserProfile,
  SET_AUTH_TOKEN,
  SET_AUTH_USER,
} from "@/store/app/auth.slice";
import { apiService } from "./api.service";

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  details?: unknown;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  tokenExpiry: string | number;
};

const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse<{ userId?: number }>, SignUpRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation<
      ApiResponse<{ user: IUserProfile; token: TokenResponse }>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.success && data.data) {
            const { user, token } = data.data;

            dispatch(
              SET_AUTH_USER({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
              }),
            );

            dispatch(
              SET_AUTH_TOKEN({
                access: token.accessToken,
                refresh: token.refreshToken,
                expires: token.tokenExpiry,
              }),
            );
          }
        } catch (error) {
          console.error("Signin failed:", error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
