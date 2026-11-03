import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";

export const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    import.meta.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:5000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    // Add auth mechanism to pass tokens to the header
    const token = (getState as unknown as RootState)?.app?.auth?.token;
    if (token?.access) {
      headers.set("Authorization", `Bearer ${token.access}`);
    } else {
      headers.delete("Authorization");
    }
    return headers;
  },
});

const tags = ["GET_ALL_REPO"];

export const apiService = createApi({
  baseQuery,
  tagTypes: tags,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
