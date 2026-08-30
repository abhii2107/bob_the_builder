import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { setAuth } from "@/store/authStore";
import { loginUser } from "../services/authServices";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error(
        "Please enter email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await loginUser({
          email,
          password,
        });

      const data = response.data;

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setAuth(data.user);

      toast.success(
        "Login successful!"
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#625E57]"
        >
          Email address
        </label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49F95]" />

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            disabled={loading}
            className="h-12 rounded-lg border-[#DCD9D1] bg-[#FAFAF8] pl-10 text-sm text-[#191A1C] shadow-none placeholder:text-[#AAA69D] transition-all focus:border-[#C9952E] focus:bg-white focus:ring-2 focus:ring-[#F5EBD5] disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#625E57]"
          >
            Password
          </label>

          <span className="text-[10px] font-medium text-[#B0ACA3]">
            Secure access
          </span>
        </div>

        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49F95]" />

          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            disabled={loading}
            className="h-12 rounded-lg border-[#DCD9D1] bg-[#FAFAF8] pl-10 pr-11 text-sm text-[#191A1C] shadow-none placeholder:text-[#AAA69D] transition-all focus:border-[#C9952E] focus:bg-white focus:ring-2 focus:ring-[#F5EBD5] disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              setShowPassword(
                (value) => !value
              )
            }
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#A49F95] transition-colors hover:bg-[#F1F0EB] hover:text-[#55524D] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="group mt-2 h-12 w-full rounded-lg bg-[#1C1D1F] text-sm font-semibold text-white shadow-[0_8px_18px_rgba(25,26,28,0.12)] transition-all duration-200 hover:bg-[#292A2C] hover:shadow-[0_10px_24px_rgba(25,26,28,0.16)] disabled:cursor-not-allowed disabled:bg-[#8C8B86] disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in

            <ArrowRight className="ml-2 h-4 w-4 text-[#D8C17D] transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </Button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#5D7D68]" />

        <p className="text-[10px] font-medium text-[#A49F95]">
          Your workspace connection is protected
        </p>
      </div>
    </form>
  );
}

export default LoginForm;