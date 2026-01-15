import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/me", // 🔥 override baseUrl
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetMeQuery } = authApi;
