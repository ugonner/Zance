import Logo from "@/components/Logo";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-semibold">Zance Ltd.</h1>
      <div className="fixed right-2 top-2 flex items-center gap-1">
        <ThemeToggler />
      </div>
      <Link
        href="/auth"
        className="fixed left-2 top-2 flex items-center gap-1 text-blue-500 underline"
      >
        Login
      </Link>
    </section>
  );
}
