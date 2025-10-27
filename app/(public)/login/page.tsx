"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { FiLogIn } from "react-icons/fi";
import { Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { setCookie } from "cookies-next";

type LoginForm = {
  email: string;
  password: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await api.post("/api/login", data);
      const token = res.data?.token;
      if (token) {
        // ✅ simpan token di cookie, expired 1 hari
        setCookie("token", token);
        router.push("/dashboard");
      } else {
        setErrorMsg("Token tidak ditemukan dalam respons server.");
      }
    } catch (error) {
      if (isAxiosError(error))
        setErrorMsg(
          error.response?.data?.message || "Email atau password salah"
        );
      else setErrorMsg("Terjadi kesalahan tak terduga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl px-8 py-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            🧠 IT Bug Tracker
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Dashboard Internal Tim IT
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email wajib diisi" })}
              className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition
              ${
                errors.email
                  ? "border-red-500 focus:ring-1 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
              }
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password wajib diisi" })}
              className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition
              ${
                errors.password
                  ? "border-red-500 focus:ring-1 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
              }
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <p className="text-red-500 text-center text-sm -mt-2">{errorMsg}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 text-sm font-medium rounded-lg
              bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 disabled:opacity-70"
          >
            {loading ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <FiLogIn className="h-4 w-4" />
            )}
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <p className="text-center text-gray-400 dark:text-gray-500 text-xs mt-8">
          © 2025 Internal IT — Kobi Education
        </p>
      </motion.div>
    </div>
  );
}
