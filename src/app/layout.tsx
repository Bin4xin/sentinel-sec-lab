import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, LocaleProvider } from "@/lib/locale-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel Sec - Lab Simulator",
  description: "Sentinel Sec 实验室模拟器 - 交互式安全场景演示平台",
  icons: {
    icon: "/assets/pics/favicon.png",
    apple: "/assets/pics/logo-small.png",
  },
  openGraph: {
    title: "Sentinel Sec - Lab Simulator",
    description: "交互式安全场景模拟器",
    images: ["/assets/pics/logo-share.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentinel Sec - Lab Simulator",
    images: ["/assets/pics/logo-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
