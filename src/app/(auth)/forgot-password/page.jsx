import ForgotPasswordForm from "@/app/(auth)/components/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex justify-center items-center h-full">
      <div className="max-w-md w-full p-4 border-2 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">
          Forgot Password?
        </h1>
        <div className="flex justify-center text-center gap-2">
          <p className="text-sm font-semi-bold items-center mb-4">
            Remembered your password?
          </p>
          <Link href="/login" className="text-sm hover:underline">
            Sign in
          </Link>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
