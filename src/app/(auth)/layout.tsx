import Logo from "@/components/Logo";
import ThemeToggler from "@/components/ThemeToggler";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen items-stretch justify-center">
      <div className="relative hidden flex-1 items-center justify-center lg:flex">
        <Image
          src="/images/auth-img.png"
          alt="People watching an event."
          fill
          objectFit="cover"
        />
      </div>
      <div className="relative flex flex-1 items-center justify-center p-4">
        <Logo className="absolute top-4" />
        <div className="fixed right-4 top-4">
          <ThemeToggler />
        </div>
        {children}
      </div>
    </section>
  );
}
