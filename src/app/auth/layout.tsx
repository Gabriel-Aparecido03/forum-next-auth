export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-[25%] max-w-[1000px] mx-auto flex items-center justify-center min-h-svh overflow-scroll">
      {children}
    </main>
  );
}
