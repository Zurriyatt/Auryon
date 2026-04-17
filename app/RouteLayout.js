"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Toaster
          position="top-center"
          expand={true}
          richColors
          closeButton
          toastOptions={{
    style: {
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(10, 10, 15, 0.85)",
    },
  }}
        />
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <main className="flex-1 ">{children}</main>

        <div className="sticky bottom-0">
          <Footer />
        </div>
      </div>
    </SessionProvider>
  );
}
