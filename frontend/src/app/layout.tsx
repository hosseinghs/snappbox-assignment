import type { Metadata } from "next";
import "./globals.css";

import { NotifyProvider } from "@/context/notify-context";
import AppWrapper from "@/components/layout/AppWrapper";
import ErrorBoundary from "@/components/base/ErrorBoundary";

export const metadata: Metadata = {
  title: "Snapbox Assignment",
  description: "Authored by Hossein Ghobadi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ErrorBoundary >
          <AppWrapper>
            {children}
            </AppWrapper>
        </ErrorBoundary>
        <NotifyProvider/>
      </body>
    </html>
  );
}
