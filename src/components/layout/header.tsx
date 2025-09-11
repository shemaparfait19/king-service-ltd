import Link from "next/link"
import { Menu, Phone, Power, Search } from "lucide-react"
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

const navLinks = [
  { href: "/services", label: "Services", dropdown: true },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <Power className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">KSTech</span>
          </Link>
        </div>

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
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                   <Power className="h-6 w-6 text-primary" />
                   <span className="font-bold font-headline">KSTech</span>
                </Link>
                {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

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
                      <Link href={`/services/${service.slug}`}>{service.title}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/services">View All Services</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
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
          <SearchDialog />
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/contact" className="hidden lg:inline-flex">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
