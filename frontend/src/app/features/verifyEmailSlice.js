import { apiSlice } from "./apiSlice";

export const verifyEmailSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation({
      query: () => ({
        url: "/verify-email",
        method: "POST",
      }),
    }),
  }),
});

export const { useVerifyEmailMutation } = verifyEmailSlice;
