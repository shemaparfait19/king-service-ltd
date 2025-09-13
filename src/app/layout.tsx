import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AnnouncementBar from '@/components/layout/announcement-bar';
import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import { AppWithSplashScreen } from '@/components/splash-screen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'KSTech Solutions - King of Electronics',
  description: 'We love what we do !! We do what we love. Electronics and IT services in Bugesera and nationwide.',
  keywords: ['electronics repair', 'IT services', 'Rwanda', 'Bugesera', 'KSTech'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
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
