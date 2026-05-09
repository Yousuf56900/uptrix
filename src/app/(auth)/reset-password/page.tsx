"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Key, Mail, RefreshCw, Shield } from "lucide-react";
import * as yup from "yup";

import { AuthCard, AuthCardFooterBar } from "@/components/auth/auth-card";
import { AuthComplianceFooter } from "@/components/auth/auth-compliance-footer";
import { AuthField } from "@/components/auth/auth-field";
import { AuthOtpRow } from "@/components/auth/auth-otp-row";
import { AuthPasswordField } from "@/components/auth/auth-password-field";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthRecoveryHeader } from "@/components/auth/auth-headers";
import * as authApi from "@/api/auth";
import { getApiErrorMessage } from "@/api/errors";
import { resetPasswordSchema } from "@/lib/validation/auth";
import { toast } from "sonner";

type ResetValues = yup.InferType<typeof resetPasswordSchema>;

function CredentialsDivider() {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <span className="w-full border-t border-white/10" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-[#111827] px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          New credentials
        </span>
      </div>
    </div>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const emailFromQuery = params.get("email")?.trim() ?? "";
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [resendBusy, setResendBusy] = useState(false);

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromQuery,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (emailFromQuery) setValue("email", emailFromQuery);
  }, [emailFromQuery, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await authApi.resetPassword({
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      });
      toast.success("Password updated. Sign in with your new password.");
      router.replace("/login");
    } catch (e) {
      setSubmitError(getApiErrorMessage(e));
    }
  });

  async function handleResend() {
    const email = watch("email")?.trim();
    if (!email) {
      setResendMsg("Enter your email first.");
      return;
    }
    setResendBusy(true);
    setResendMsg(null);
    try {
      await authApi.forgotPassword(email);
      toast.success("New reset code sent.");
      setResendMsg("A fresh code was sent to your inbox.");
    } catch (e) {
      setResendMsg(getApiErrorMessage(e));
    } finally {
      setResendBusy(false);
    }
  }

  return (
    <>
      <AuthRecoveryHeader />
      <div className="flex w-full flex-col items-center px-2 py-8 sm:py-10">
        <AuthCard className="max-w-[480px]">
          <div className="space-y-6 px-6 pb-2 pt-8 sm:px-8 sm:pt-10">
            <div className="flex justify-center">
              <div
                className="flex size-14 items-center justify-center rounded-full border-2 border-brand/70 bg-emerald-500/10"
                aria-hidden
              >
                <RefreshCw className="size-7 text-brand" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Reset Password
              </h1>
              <p className="text-sm text-emerald-100/65">
                Secure your account by updating your credentials below.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <AuthField
                id="reset-email"
                label="Email address"
                type="email"
                autoComplete="email"
                icon={Mail}
                placeholder="name@company.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                  <AuthOtpRow
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    error={errors.otp?.message}
                  />
                )}
              />

              <p className="text-center text-xs text-zinc-500">
                We sent a 6-digit code to your email.{" "}
                <button
                  type="button"
                  className="font-semibold text-brand hover:underline disabled:opacity-50"
                  onClick={handleResend}
                  disabled={resendBusy}
                >
                  Resend code
                </button>
              </p>

              {resendMsg ? (
                <p className="text-center text-sm text-emerald-300/90">{resendMsg}</p>
              ) : null}

              <CredentialsDivider />

              <div className="grid gap-5 sm:grid-cols-2">
                <AuthPasswordField
                  id="new-password"
                  label="New password"
                  autoComplete="new-password"
                  icon={Key}
                  placeholder="••••••••"
                  error={errors.newPassword?.message}
                  {...register("newPassword")}
                />
                <AuthPasswordField
                  id="confirm-password"
                  label="Confirm password"
                  autoComplete="new-password"
                  icon={Shield}
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>

              {submitError ? (
                <p className="text-center text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}

              <AuthPrimaryButton loading={isSubmitting}>Reset Password</AuthPrimaryButton>
            </form>
          </div>

          <AuthCardFooterBar>
            <Link
              href="/login"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              ← Back to Login
            </Link>
          </AuthCardFooterBar>
        </AuthCard>
        <AuthComplianceFooter />
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center text-zinc-500">Loading…</div>}
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
