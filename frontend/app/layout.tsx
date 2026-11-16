import type { Metadata } from "next";

import { Sidebar } from "@/components/Sidebar";

import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Smart Factory Monitor",
  description: "Lightweight industrial monitoring dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <div className="flex min-h-screen bg-surface">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden p-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
