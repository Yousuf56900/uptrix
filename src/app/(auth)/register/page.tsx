"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Mail, User } from "lucide-react";
import * as yup from "yup";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthCopyrightFooter } from "@/components/auth/auth-copyright-footer";
import { AuthField } from "@/components/auth/auth-field";
import { AuthPasswordField } from "@/components/auth/auth-password-field";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthSignupHeader } from "@/components/auth/auth-headers";
import * as authApi from "@/api/auth";
import { getApiErrorMessage } from "@/api/errors";
import { registerSchema } from "@/lib/validation/auth";
import { toast } from "sonner";

type RegisterValues = yup.InferType<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await authApi.register(values);
      toast.success("Account created. We sent a verification code to your email.");
      router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    } catch (e) {
      setSubmitError(getApiErrorMessage(e));
    }
  });

  return (
    <>
      <AuthSignupHeader />
      <div className="flex w-full flex-col items-center px-4 py-10 sm:py-14">
        <AuthCard>
          <div className="space-y-8 px-6 pb-6 pt-10 sm:px-8 sm:pt-12">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create Account
              </h1>
              <p className="text-sm text-emerald-100/65">
                Join Uptrix today and start building.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <AuthField
                id="name"
                label="Full name"
                type="text"
                autoComplete="name"
                icon={User}
                placeholder="John Doe"
                error={errors.name?.message}
                {...register("name")}
              />
              <AuthField
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                icon={Mail}
                placeholder="name@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <AuthPasswordField
                id="password"
                label="Password"
                autoComplete="new-password"
                icon={Lock}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              {submitError ? (
                <p className="text-center text-sm text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}

              <AuthPrimaryButton loading={isSubmitting}>Get Started</AuthPrimaryButton>
            </form>

            <p className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-brand hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </AuthCard>
        <AuthCopyrightFooter />
      </div>
    </>
  );
}
