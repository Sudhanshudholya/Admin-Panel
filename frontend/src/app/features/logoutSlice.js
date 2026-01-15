import { apiSlice } from "./apiSlice";

export const logoutSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
         logout: builder.mutation({
              query: () => ({
                url: "/user/logout",
                method: "POST"
              }),
              invalidatesTags: ["User"]
         })
    })
})

export const {useLogoutMutation} = logoutSlice