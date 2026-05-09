import { api } from "@/api/client";
import type { ApiEnvelope, AuthUserData, LoginPayload } from "@/types/api";

async function unwrap<T>(promise: Promise<{ data: ApiEnvelope<T> }>): Promise<T> {
  const { data } = await promise;
  if (!data.success) throw new Error(data.message || "Request failed");
  return data.data;
}

export function login(email: string, password: string) {
  return unwrap(
    api.post<ApiEnvelope<LoginPayload>>(`/api/v1/auth/login`, { email, password })
  );
}

export function register(body: { name: string; email: string; password: string }) {
  return unwrap(
    api.post<ApiEnvelope<Record<string, never>>>(`/api/v1/auth/register`, body)
  );
}

export function verifyOtp(email: string, otp: string) {
  return unwrap(
    api.post<ApiEnvelope<LoginPayload>>(`/api/v1/auth/verify-otp`, { email, otp })
  );
}

export function forgotPassword(email: string) {
  return unwrap(
    api.post<ApiEnvelope<Record<string, never>>>(`/api/v1/auth/forgot-password`, {
      email,
    })
  );
}

export function resetPassword(body: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  return unwrap(api.post<ApiEnvelope<Record<string, never>>>(`/api/v1/auth/reset-password`, body));
}

export function logoutRequest() {
  return unwrap(api.post<ApiEnvelope<Record<string, never>>>(`/api/v1/auth/logout`));
}

export function getMe() {
  return unwrap(api.get<ApiEnvelope<AuthUserData>>(`/api/v1/auth/me`));
}
