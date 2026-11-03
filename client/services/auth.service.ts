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

const authApi = apiService.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<ApiResponse<{ userId?: number }>, SignUpRequest>({
      query: body => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
