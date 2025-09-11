import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import AnnouncementBar from '@/components/layout/announcement-bar';

export const metadata: Metadata = {
  title: 'KSTech Solutions - King of Electronics',
  description: 'We love what we do !! We do what we love. Electronics and IT services in Bugesera and nationwide.',
  keywords: ['electronics repair', 'IT services', 'Rwanda', 'Bugesera', 'KSTech'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider storageKey="kstech-ui-theme">
          <div className="min-h-screen flex flex-col bg-background">
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-grow">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
