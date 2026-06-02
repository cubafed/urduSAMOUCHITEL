import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { ConfettiCanvas } from "@/components/ui/Confetti";
import { AchievementToast } from "@/components/ui/AchievementToast";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Самоучитель урду",
  description: "Интерактивный самоучитель языка урду по учебнику Давидовой",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.variable} font-sans bg-slate-950 text-white antialiased`}>
        <Navbar />
        <ConfettiCanvas />
        <AchievementToast />
        <main className="ml-56 min-h-screen p-8">{children}</main>
      </body>
    </html>
  );
}
