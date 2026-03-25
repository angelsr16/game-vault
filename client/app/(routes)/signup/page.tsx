"use client";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { DefaultLayout } from "@/shared/components/DefaultLayout";
import { FloatingCards } from "@/shared/components/FloatingCards";
import { GamepadIcon } from "@/shared/components/GamepadIcon";
import { FcGoogle } from "react-icons/fc";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  useAuthRedirect({ requireAuth: false });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      console.log(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/auth/user-registration`,
      );
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/auth/user-registration`,
        data,
      );
      return response.data;
    },
    onSuccess: (_, formData) => {
      setUserData(formData);
      setShowOtp(true);
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error) => {
      console.log("Error: " + error);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if (!userData) return;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/auth/verify-user`,
        {
          ...userData,
          otp: otp.join(""),
        },
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    if (userData) {
      signupMutation.mutate(userData);
    }
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

          <div
            className=" rounded-2xl overflow-hidden border border-white/10
  backdrop-blur-md bg-[linear-gradient(135deg,rgba(108,99,255,0.15),rgba(0,212,170,0.08))]
  shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="p-6">
              {!showOtp ? (
                <>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-widest mb-2 font-medium">
                        Name
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        placeholder="Angel Sanchez"
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {String(errors.name.message)}
                        </p>
                      )}
                    </div>

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
                    <div>
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

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={signupMutation.isPending}
                      className="w-full bg-[#2563EB] hover:bg-[#3B82F6] disabled:opacity-50
                  text-white text-sm font-semibold rounded-xl py-3 mt-2
                  transition-all duration-200 active:scale-[0.98]
                  flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                    >
                      {signupMutation.isPending ? (
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
                        <span>REGISTER</span>
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
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-center mb-4">
                      Enter OTP
                    </h3>

                    <div className="flex justify-center gap-6 my-10">
                      {otp?.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          ref={(el) => {
                            if (el) inputRefs.current[index] = el;
                          }}
                          maxLength={1}
                          className="w-12 h-12 text-center border border-gray-300 outline-none rounded"
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        />
                      ))}
                    </div>

                    <button
                      disabled={verifyOtpMutation.isPending}
                      onClick={() => verifyOtpMutation.mutate()}
                      className="w-full bg-[#2563EB] hover:bg-[#3B82F6] disabled:opacity-50
                  text-white text-sm font-semibold rounded-xl py-3 mt-2
                  transition-all duration-200 active:scale-[0.98]
                  flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                    >
                      {verifyOtpMutation.isPending
                        ? "Verifying OTP..."
                        : "Verify OTP"}
                    </button>

                    <p className="text-center text-sm mt-4">
                      {canResend ? (
                        <button
                          onClick={resendOtp}
                          className="text-blue-accent cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        `Resend OTP in ${timer}s`
                      )}
                    </p>

                    {verifyOtpMutation?.isError &&
                      verifyOtpMutation.error instanceof AxiosError && (
                        <p className="text-red-500 text-sm mt-2">
                          {verifyOtpMutation.error.response?.data?.message ||
                            verifyOtpMutation.error.message}
                        </p>
                      )}
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="text-center font-semibold text-text-primary  mt-5">
            Already have an account?{" "}
            <button
              onClick={() => redirect("/login")}
              className="cursor-pointer text-blue-accent transition-colors font-black"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
