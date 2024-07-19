import "bytemd/dist/index.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { Wrapper } from "./wrapper";

const geist = GeistSans;

export const metadata: Metadata = {
  title: "Forum",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} font-normal bg-zinc-50 text-zinc-800 min-w-max min-h-screen`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
