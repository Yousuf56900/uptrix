"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import * as yup from "yup";

import { AuthOtpRow } from "@/components/auth/auth-otp-row";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthCopyrightFooter } from "@/components/auth/auth-copyright-footer";
import { AuthField } from "@/components/auth/auth-field";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthSignupHeader } from "@/components/auth/auth-headers";
import { useAuth } from "@/context/auth-context";
import * as authApi from "@/api/auth";
import { getApiErrorMessage } from "@/api/errors";
import { verifyOtpSchema } from "@/lib/validation/auth";
import { toast } from "sonner";

type VerifyValues = yup.InferType<typeof verifyOtpSchema>;

function VerifyOtpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { setSession } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [resendBusy, setResendBusy] = useState(false);

  const emailFromQuery = params.get("email")?.trim() ?? "";

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyValues>({
    resolver: yupResolver(verifyOtpSchema),
    defaultValues: { email: emailFromQuery, otp: "" },
  });

  useEffect(() => {
    if (emailFromQuery) setValue("email", emailFromQuery);
  }, [emailFromQuery, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const data = await authApi.verifyOtp(values.email, values.otp);
      setSession(data.accessToken, {
        id: String(data.id),
        name: data.name,
        email: data.email,
      });
      toast.success("Email verified. You're signed in.");
      router.replace("/");
    } catch (e) {
      setSubmitError(getApiErrorMessage(e));
    }
  });

  async function handleResend() {
    const resolved = watch("email")?.trim();
    if (!resolved) {
      setResendMsg("Enter your email first.");
      return;
    }
    setResendBusy(true);
    setResendMsg(null);
    try {
      await authApi.forgotPassword(resolved);
      toast.success("New verification code sent.");
      setResendMsg("A fresh code was sent to your inbox.");
    } catch (e) {
      setResendMsg(getApiErrorMessage(e));
    } finally {
      setResendBusy(false);
    }
  }

  return (
    <>
      <AuthSignupHeader />
      <div className="flex w-full flex-col items-center px-4 py-10 sm:py-14">
        <AuthCard>
          <div className="space-y-8 px-6 pb-6 pt-10 sm:px-8 sm:pt-12">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Verify your email
              </h1>
              <p className="text-sm text-emerald-100/65">
                Enter the 6-digit code we sent you to activate your account.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <AuthField
                id="verify-email"
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
                    id="otp"
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

              {submitError ? (
                <p className="text-center text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}

              <AuthPrimaryButton loading={isSubmitting}>Verify & continue</AuthPrimaryButton>
            </form>

            <p className="text-center text-sm text-zinc-400">
              Wrong inbox?{" "}
              <Link href="/register" className="font-medium text-brand hover:underline">
                Start over
              </Link>
            </p>
          </div>
        </AuthCard>
        <AuthCopyrightFooter />
      </div>
    </>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center text-zinc-500">Loading…</div>}
    >
      <VerifyOtpForm />
    </Suspense>
  );
}
