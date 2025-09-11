import SiteHeader from '@/components/layout/header';
import SiteFooter from '@/components/layout/footer';
import AnnouncementBar from '@/components/layout/announcement-bar';
import { i18n, type Locale } from '@/i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <SiteHeader lang={params.lang} />
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
}
