import yup from "yup"

export const userSchema = yup.object().shape({
    username: yup.string().trim().min(3, "Username must have 3 character").required("Name is required"),
    email: yup.string().trim().email("Invalid email format").required("Email is required"),
    password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required")
})

export const validateUser = (schema) => async(req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.errors
        });
    }
}