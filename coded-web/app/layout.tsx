import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NeuralOrbLauncher from "@/components/widgets/NeuralOrbLauncher";
import { ThemeProvider } from "@/components/providers/ThemeContext";
import LenisProvider from "@/components/providers/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CODED | Coding Bootcamps & Tech Programs in Kuwait",
  description:
    "Kuwait's first coding bootcamp. Learn web development, data science, AI, and cybersecurity through hands-on, project-based programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-theme="bootcamp">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LenisProvider>
            {children}
            <NeuralOrbLauncher />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
