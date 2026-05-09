import * as yup from "yup";

export const emailSchema = yup
  .string()
  .trim()
  .email("Enter a valid email")
  .required("Email is required");

export const passwordSchema = yup
  .string()
  .min(8, "Use at least 8 characters")
  .required("Password is required");

export const loginSchema = yup.object({
  email: emailSchema,
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().trim().min(2, "Enter your full name").required("Name is required"),
  email: emailSchema,
  password: passwordSchema,
});

export const verifyOtpSchema = yup.object({
  email: emailSchema,
  otp: yup
    .string()
    .length(6, "Enter the 6-digit code")
    .matches(/^\d+$/, "Digits only")
    .required("Verification code is required"),
});

export const forgotPasswordSchema = yup.object({
  email: emailSchema,
});

export const resetPasswordSchema = yup.object({
  email: emailSchema,
  otp: yup
    .string()
    .length(6, "Enter the 6-digit code")
    .matches(/^\d+$/, "Digits only")
    .required("Verification code is required"),
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your password"),
});
