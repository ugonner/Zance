import ThemeToggler from "@/components/ThemeToggler";

export default function Home() {
  return (
    <section className="flex justify-center min-h-screen items-center">
      <h1 className="text-6xl font-semibold">Zance Ltd.</h1>
      <div className="fixed top-2 right-2 flex items-center gap-1">
        Select Theme (This toggler will be here temporarily) <ThemeToggler />
      </div>
    </section>
  );
}
