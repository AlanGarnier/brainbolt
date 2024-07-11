import type { Metadata } from "next";
import { Ubuntu, Jost } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import AuthProvider from "@/providers/AuthProvider";
import ToastProvider from "@/providers/ToastProvider";

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
  title: "Brainbolt | Plateforme de jeux vidéo en ligne",
  description: "Découvrez Brainbolt - notre plateforme de jeux vidéo en ligne, conçu pour offrir des performances inégalées et une expérience de jeu coopératif fluide avec vos amis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link rel="icon" href="/favicon.ico" />
      <body className={`${ubuntu.variable} ${jost.variable}`}>
        <AuthProvider>
          <ToastProvider />
          {children}
          <GoogleTagManager gtmId="GTM-NQ3HFVFF" />
        </AuthProvider>
      </body>
    </html>
  );
}
