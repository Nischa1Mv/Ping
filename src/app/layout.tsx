import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ContextProvider } from "../app/Context"; // Adjust the path as necessary
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ping",
  description: "A simple Chat Appication",
  icons: {
    icon: ["/favicon.ico"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
