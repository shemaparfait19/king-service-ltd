import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AnnouncementBar from "@/components/layout/announcement-bar";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/footer";
import { AppWithSplashScreen } from "@/components/splash-screen";
import { i18n } from "@/i18n-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "KSTech Solutions - King of Electronics",
  description:
    "We love what we do !! We do what we love. Electronics and IT services in Bugesera and nationwide.",
  keywords: [
    "electronics repair",
    "IT services",
    "Rwanda",
    "Bugesera",
    "KSTech",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "KSTech Solutions - King of Electronics",
    description: "Electronics and IT services in Bugesera and nationwide.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    images: [
      {
        url:
          (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com") +
          "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KSTech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KSTech Solutions - King of Electronics",
    description: "Electronics and IT services in Bugesera and nationwide.",
    images: [
      (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com") +
        "/og-image.png",
    ],
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        <ThemeProvider storageKey="kstech-ui-theme">
          <AppWithSplashScreen>
            <div className="min-h-screen flex flex-col bg-background">
              <AnnouncementBar />
              <SiteHeader />
              <main className="flex-grow">{children}</main>
              <SiteFooter />
            </div>
          </AppWithSplashScreen>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
