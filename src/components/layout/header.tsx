import Link from "next/link"
import { UserCog } from "lucide-react"
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HeaderClient } from "./header-client"
import type { Service } from "@/lib/definitions";
import Image from "next/image";

export default async function SiteHeader() {
  const servicesCollection = collection(db, 'services');
  const q = query(servicesCollection, orderBy('title', 'asc'), limit(8));
  const servicesSnapshot = await getDocs(q);
  const services = servicesSnapshot.docs.map(doc => doc.data() as Omit<Service, 'icon' | 'id'>);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Image src="/logo.png" alt="KSTech Logo" width={32} height={32} />
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
