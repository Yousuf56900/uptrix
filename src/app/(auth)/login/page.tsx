"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";
import * as yup from "yup";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthCopyrightFooter } from "@/components/auth/auth-copyright-footer";
import { AuthField } from "@/components/auth/auth-field";
import { AuthPasswordField } from "@/components/auth/auth-password-field";
import { AuthPrimaryButton } from "@/components/auth/auth-primary-button";
import { AuthSignupHeader } from "@/components/auth/auth-headers";
import * as authApi from "@/api/auth";
import { getApiErrorMessage } from "@/api/errors";
import { loginSchema } from "@/lib/validation/auth";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

type LoginValues = yup.InferType<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { setSession } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const rawFrom = params.get("from") ?? "/";
  const from =
    rawFrom === "/dashboard" || rawFrom.startsWith("/dashboard/")
      ? "/"
      : rawFrom;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const data = await authApi.login(values.email, values.password);
      setSession(data.accessToken, {
        id: String(data.id),
        name: data.name,
        email: data.email,
      });
      toast.success("Signed in successfully");
      router.replace(from.startsWith("/") ? from : "/");
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
                Welcome back
              </h1>
              <p className="text-sm text-emerald-100/65">
                Sign in to continue to your workspace.
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
              <AuthPasswordField
                id="password"
                label="Password"
                autoComplete="current-password"
                icon={Lock}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              {submitError ? (
                <p className="text-center text-sm text-red-400" role="alert">
                  {submitError}{" "}
                  {submitError.toLowerCase().includes("verify") &&
                  watch("email")?.trim() ? (
                    <Link
                      href={`/verify-otp?email=${encodeURIComponent(watch("email"))}`}
                      className="font-medium text-brand underline"
                    >
                      Verify email
                    </Link>
                  ) : null}
                </p>
              ) : null}

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-brand hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <AuthPrimaryButton loading={isSubmitting}>Sign in</AuthPrimaryButton>
            </form>

            <p className="text-center text-sm text-zinc-400">
              No account?{" "}
              <Link href="/register" className="font-medium text-brand hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </AuthCard>
        <AuthCopyrightFooter />
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-zinc-500">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
