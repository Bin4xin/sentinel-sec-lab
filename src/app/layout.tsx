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
  metadataBase: new URL('https://bin4xin.github.io'),
  icons: {
    icon: "/assets/img/favicon.png",
    apple: "/assets/img/logo-small.png",
  },
  openGraph: {
    title: "Sentinel Sec - Lab Simulator",
    description: "交互式安全场景模拟器",
    images: ["/assets/img/logo-share.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentinel Sec - Lab Simulator",
    images: ["/assets/img/logo-share.png"],
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
        {/* 
          Inline script to prevent theme flash on page load.
          This runs before React hydrates and applies the stored theme immediately.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Get stored preferences
                var themeMode = localStorage.getItem('theme-mode');
                var colorScheme = localStorage.getItem('color-scheme');
                var systemFollow = localStorage.getItem('system-follow') === 'true';
                
                // Determine theme mode
                var isDark;
                if (systemFollow) {
                  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                } else {
                  isDark = themeMode === 'dark' || (!themeMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
                }
                
                // Apply dark class
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                
                // Apply color scheme
                if (colorScheme === 'highlight') {
                  document.documentElement.setAttribute('data-color-scheme', 'highlight');
                }
              })();
            `,
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
