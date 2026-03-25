"use client";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { DefaultLayout } from "@/shared/components/DefaultLayout";
import { FloatingCards } from "@/shared/components/FloatingCards";
import { GamepadIcon } from "@/shared/components/GamepadIcon";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  useAuthRedirect({ requireAuth: false });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/auth/login-user`,
        data,
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: () => {
      setServerError(null);
      router.push("/vault");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Invalid credentials";
      setServerError(errorMessage);
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto px-6 py-3 min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingCards />

        <div className="relative z-10 w-full max-w-sm mx-4 ">
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="text-[#5BA4F5]">
              <GamepadIcon />
            </div>
            <span
              className="text-[#F0F0F0] text-3xl font-bold tracking-[0.12em] uppercase"
              style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
            >
              GAME VAULT
            </span>
          </div>

          {/* Form Card */}
          <div
            className=" rounded-2xl overflow-hidden border border-white/10
  backdrop-blur-md bg-[linear-gradient(135deg,rgba(108,99,255,0.15),rgba(0,212,170,0.08))]
  shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-widest mb-2 font-medium">
                    Email
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="my-5">
                  <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-widest mb-2 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {String(errors.password.message)}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-[#2563EB] hover:bg-[#3B82F6] disabled:opacity-50
                  text-white text-sm font-semibold rounded-xl py-3 mt-2
                  transition-all duration-200 active:scale-[0.98]
                  flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                >
                  {loginMutation.isPending ? (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  ) : (
                    <span>ENTER THE VAULT</span>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-[#2A2A2A]" />
                <span className="text-[11px] text-[#3D3D3D] uppercase tracking-widest">
                  or
                </span>
                <div className="flex-1 h-px bg-[#2A2A2A]" />
              </div>

              <button
                type="button"
                className="w-full bg-surface hover:bg-elevated border border-[#2A2A2A] hover:border-[#3D3D3D]
                text-[#A0A0A0] hover:text-[#F0F0F0] text-sm font-medium rounded-xl py-3
                transition-all duration-200 active:scale-[0.98]
                flex items-center justify-center gap-3 cursor-pointer"
              >
                <FcGoogle size={18} />
                Continue with Google
              </button>
            </div>
          </div>

          <p className="text-center font-semibold text-text-primary  mt-5">
            New to Game Vault?{" "}
            <button
              onClick={() => redirect("/signup")}
              className="cursor-pointer text-blue-accent transition-colors font-black"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
