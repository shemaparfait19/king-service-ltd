import Link from "next/link"
import { Power, UserCog } from "lucide-react"

import prisma from "@/lib/prisma"
import { HeaderClient } from "./header-client"

export default async function SiteHeader() {
  const services = await prisma.service.findMany({
    take: 8,
    orderBy: {
      title: 'asc'
    }
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Power className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg hidden sm:inline-block">KSTech</span>
        </Link>
        
        <HeaderClient services={services} />

        <Link href="/admin" className="ml-2">
            <UserCog className="h-5 w-5" />
            <span className="sr-only">Admin Panel</span>
        </Link>
      </div>
    </header>
  )
}
