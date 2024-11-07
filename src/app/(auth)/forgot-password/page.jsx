import ForgotPasswordForm from "@/app/(auth)/components/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex justify-center items-center h-full dark:text-gray-200">
      <div className="max-w-md w-full p-4 sm:p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Forgot Password?
        </h1>
        <div className="flex justify-center text-center gap-2">
          <p className="text-sm items-center mb-4">Remembered your password?</p>
          <Link href="/login" className="text-sm hover:underline">
            Sign in
          </Link>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
