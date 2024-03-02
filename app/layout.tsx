import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {ClerkProvider} from "@clerk/nextjs";
import {ModalProvider} from "@/components/providers/modal-provider";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Admin Dashboard",
  description: "Admin dashboard for ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <ClerkProvider>
        <body className={
            cn("min-h-screen bg-background font-sans antialiased",
            inter.className)
        }>
        <ModalProvider/>
        {children}
        <Toaster />
        </body>
    </ClerkProvider>
    </html>
  );
}
