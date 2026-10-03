import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "John Doe — Senior Software Engineer",
    template: "%s | John Doe",
  },
  description:
    "Portfolio of John Doe, a Senior Software Engineer specialising in React, Next.js, TypeScript, and distributed systems. Based in Nairobi, Kenya.",
  keywords: ["software engineer", "Next.js", "TypeScript", "React", "portfolio"],
  openGraph: {
    title: "John Doe — Senior Software Engineer",
    description:
      "Portfolio of John Doe, a Senior Software Engineer specialising in React, Next.js, TypeScript, and distributed systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 px-8 py-6">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} John Doe. Built with Next.js &amp;
            TypeScript.
          </p>
        </footer>
      </body>
    </html>
  );
}
