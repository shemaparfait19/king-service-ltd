import Link from "next/link"
import { Menu, Phone, Power, Search, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SearchDialog } from "@/components/search-dialog"
import { services } from "@/lib/data"
import { type Locale } from "@/i18n-config"

const navLinks = [
  { href: "/services", label: "Services", dropdown: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export default function SiteHeader({ lang }: { lang: Locale }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={`/${lang}`} className="mr-6 flex items-center gap-2">
          <Power className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg hidden sm:inline-block">KSTech</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link =>
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none">
                  {link.label}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {services.slice(0, 8).map(service => (
                    <DropdownMenuItem key={service.id} asChild>
                      <Link href={`/${lang}/services/${service.slug}`}>{service.title}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${lang}/services`}>View All Services</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={link.href} href={`/${lang}${link.href}`} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden sm:flex items-center gap-2 border-r pr-4 mr-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href="tel:+250787649480" className="text-sm font-medium hover:text-primary transition-colors">+250 787 649 480</a>
          </div>
          <SearchDialog lang={lang} />
          <LanguageSwitcher />
          <ThemeToggle />
           <Link href="/admin">
              <Button variant="ghost" size="icon" aria-label="Admin Panel">
                <UserCog className="h-5 w-5" />
              </Button>
            </Link>
          <Link href={`/${lang}/contact`} className="hidden lg:inline-flex">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href={`/${lang}`} className="flex items-center gap-2 text-lg font-semibold mb-4">
                     <Power className="h-6 w-6 text-primary" />
                     <span className="font-bold font-headline">KSTech Solutions</span>
                  </Link>
                  {navLinks.map(link => (
                      <Link key={link.href} href={`/${lang}${link.href}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                      </Link>
                  ))}
                  <Link href={`/${lang}/contact`} className="mt-4">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}
