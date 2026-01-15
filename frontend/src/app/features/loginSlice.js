import { apiSlice } from "./apiSlice";

export const loginSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (value) => ({
        url: "/user/login",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {useLoginMutation} = loginSlice
