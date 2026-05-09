"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import * as yup from "yup";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthField } from "@/components/auth/auth-field";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthRecoveryHeader } from "@/components/auth/auth-headers";
import { AuthComplianceFooter } from "@/components/auth/auth-compliance-footer";
import * as authApi from "@/api/auth";
import { getApiErrorMessage } from "@/api/errors";
import { forgotPasswordSchema } from "@/lib/validation/auth";
import { toast } from "sonner";

type ForgotValues = yup.InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await authApi.forgotPassword(values.email);
      toast.success("Reset code sent to your email.");
      router.push(`/reset-password?email=${encodeURIComponent(values.email)}`);
    } catch (e) {
      setSubmitError(getApiErrorMessage(e));
    }
  });

  return (
    <>
      <AuthRecoveryHeader />
      <div className="flex w-full flex-col items-center px-4 py-10 sm:py-14">
        <AuthCard>
          <div className="space-y-8 px-6 pb-6 pt-10 sm:px-8 sm:pt-12">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Forgot password
              </h1>
              <p className="text-sm text-emerald-100/65">
                We&apos;ll email you a 6-digit code to reset your password.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <AuthField
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                icon={Mail}
                placeholder="name@company.com"
                error={errors.email?.message}
                {...register("email")}
              />

              {submitError ? (
                <p className="text-center text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}

              <AuthPrimaryButton loading={isSubmitting}>Send reset code</AuthPrimaryButton>
            </form>

            <p className="text-center text-sm text-zinc-400">
              Remembered it?{" "}
              <Link href="/login" className="font-medium text-brand hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </AuthCard>
        <AuthComplianceFooter />
      </div>
    </>
  );
}
