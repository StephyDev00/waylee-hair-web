import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-20">
      <h1 className="font-serif text-2xl font-bold">Owner Sign In</h1>
      <p className="mt-1 text-sm text-ink/60">Waylee Hair &amp; Beauty admin</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
