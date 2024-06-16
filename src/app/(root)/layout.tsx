import Logo from "@/components/ui/common/Logo";
import Navbar from "@/components/ui/common/Navbar";
import ThemeToggler from "@/components/ui/common/ThemeToggler";
import Container from "@/components/ui/containers/Container";
import Image from "next/image";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container className="py-28">{children}</Container>
    </>
  );
}
