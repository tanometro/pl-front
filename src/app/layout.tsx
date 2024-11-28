import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import SessionWrapper from "@/components/Session/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App oficial",
  description: "Creada por mi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={`${inter.className} min-h-screen xl:min-w-[150dvh]`}>
        <div id="__next" className="px-6">
          <SessionWrapper>
            <Navbar />
            {children}
          </SessionWrapper>
        </div>
      </body>
    </html>
  );
}
