"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const newPath = `/${locale}${pathname.startsWith('/en') || pathname.startsWith('/fr') ? pathname.substring(3) : pathname}`;
    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage('en')} className="font-bold">
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('fr')}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
