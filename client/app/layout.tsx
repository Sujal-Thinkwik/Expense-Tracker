import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

import "@mantine/core/styles.css";
import "./globals.css";

import { MantineProvider } from "@mantine/core";
import ReduxProvider from "@/providers/ReduxProvider";
import { theme } from "@/theme/color";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker Application",
  description: "Tracking your expense in a different way",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MantineProvider theme={theme}>
            <ReduxProvider>{children}</ReduxProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
