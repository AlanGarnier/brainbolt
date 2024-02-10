import type { Metadata } from "next";
import { Ubuntu, Jost } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: '--font-ubuntu',
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${jost.variable}`}>{children}</body>
    </html>
  );
}
