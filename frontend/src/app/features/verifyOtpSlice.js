import { apiSlice } from "./apiSlice";

export const verifyOtpSLice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            verifyOtp: builder.mutation({
                query: ({email, otp}) => ({
                    url: '/verify-otp',
                    method: "POST",
                    body: {email, otp}
                }),
                invalidatesTags: ["user"]
            })
    })
})

export const {useVerifyOtpMutation} = verifyOtpSLice