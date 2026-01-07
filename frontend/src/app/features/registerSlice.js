import { apiSlice } from "./apiSlice";

export const registerSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
         query: (value) => ({
            url: "/register",
            method: "POST",
            body: value
         }),
         invalidatesTags: ["user"]
        })
    })
})

export const {useRegisterMutation} = registerSlice