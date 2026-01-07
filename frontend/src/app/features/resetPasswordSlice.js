import { apiSlice } from "./apiSlice";

export const resetPasswordSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordSlice;
