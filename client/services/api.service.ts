import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.BASE_URL ?? 'http://localhost:5000/api/v1',
  prepareHeaders: (headers, { getState }) => {
    // Add auth mechanism to pass tokens to the header
    const token = (getState as unknown as RootState)?.app?.auth?.token;
    if (token?.access) {
      headers.set('Authorization', `Bearer ${token.access}`);
    } else {
      headers.delete('Authorization');
    }
    return headers;
  }
});


const tags = ['GET_ALL_REPO'] ;

export const apiService = createApi({
  baseQuery: baseQuery,
  tagTypes: tags,
  refetchOnReconnect: true,
  endpoints: () => ({})
});
