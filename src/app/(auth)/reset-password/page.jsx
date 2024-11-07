import ResetPasswordForm from "@/app/(auth)/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="flex justify-center items-center h-full dark:text-gray-200">
      <div className="max-w-md w-full p-4 sm:p-6 border shadow-md rounded-lg bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Reset Password
        </h1>
        <p className="text-sm font-medium text-center mb-4">
          Put your new password correctly to reset
        </p>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
