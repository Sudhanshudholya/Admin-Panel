import { apiSlice } from "./apiSlice";

export const verifyOtpSLice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
            verifyOtp: builder.mutation({
                query: ({email, otp}) => ({
                    url: '/user/verify-otp',
                    method: "POST",
                    body: {email, otp}
                }),
                invalidatesTags: ["user"]
            })
    })
})

export const {useVerifyOtpMutation} = verifyOtpSLice