
import Link from 'next/link';
import {
  Home,
  Newspaper,
  Wrench,
  FolderKanban,
  ImageIcon,
  CalendarCheck,
  Languages,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const sidebarNavItems = [
  { href: '/admin', icon: Home, label: 'Dashboard' },
  { href: '/admin/services', icon: Wrench, label: 'Services' },
  { href: '/admin/announcements', icon: Newspaper, label: 'Announcements' },
  { href: '/admin/portfolio', icon: FolderKanban, label: 'Portfolio' },
  { href: '/admin/images', icon: ImageIcon, label: 'Pictures' },
  { href: '/admin/bookings', icon: CalendarCheck, label: 'Bookings' },
  { href: '/admin/translations', icon: Languages, label: 'Translations' },
  { href: '/admin/seed', icon: Database, label: 'Seed Data' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Wrench className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">KSTech Admin</span>
            </Link>
            {sidebarNavItems.map(({ href, icon: Icon, label }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-grow">
        {children}
      </div>
    </div>
  );
}
