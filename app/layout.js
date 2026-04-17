import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./RouteLayout";
import Script from "next/script"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Auryon - Fund Your Favorite One's Aura",
  description: "Aura booster web app by funding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`overflow-x-hidden overflow-y-scroll ${geistSans.variable} ${geistMono.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
