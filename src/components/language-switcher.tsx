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
import { i18n } from "@/i18n-config"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    const currentLocale = i18n.locales.find(loc => loc === segments[1])
    
    if (currentLocale) {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }

    const newPath = segments.join('/') || '/'
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
