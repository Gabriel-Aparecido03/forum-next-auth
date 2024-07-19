import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex justify-between flex-col">
      <Header />
      <div className="flex flex-1 h-full">
      {children}
      </div>
      <Footer />
    </main>
  );
}
