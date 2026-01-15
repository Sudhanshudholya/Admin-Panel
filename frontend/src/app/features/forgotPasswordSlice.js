import { apiSlice } from "./apiSlice";

export const forgotPasswordSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        forgotPassword: builder.mutation({
            query: (value) => ({
                url: "/user/forgot-password",
                method: "POST",
                body: value
            }),
            invalidatesTags: ['User'],
        })
    })
})

export const {useForgotPasswordMutation} = forgotPasswordSlice