import ResetPasswordForm from "@/app/(auth)/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="flex justify-center items-center h-full">
      <div className="max-w-md w-full p-4 border-2 shadow-md rounded-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        <p className="text-sm font-semi-bold text-center mb-4">
          Put your new password correctly to reset
        </p>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
