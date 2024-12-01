import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ChatProvider } from "./Context";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

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
      <Head>
        <script
          src="https://cdn.socket.io/4.8.1/socket.io.min.js"
          integrity="sha384-mkQ3/7FUtcGyoppY6bz/PORYoGqOl7/aSUMn2ymDOJcapfS6PHqxhRTMh1RR0Q6+"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
