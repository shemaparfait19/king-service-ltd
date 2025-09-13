import Link from "next/link";
import { UserCog } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HeaderClient } from "./header-client";
import type { Service } from "@/lib/definitions";
import Image from "next/image";
import { headers } from "next/headers";

export default async function SiteHeader() {
  const servicesCollection = collection(db, "services");
  const servicesSnapshot = await getDocs(servicesCollection);
  const services = servicesSnapshot.docs
    .map((doc) => doc.data() as Omit<Service, "icon" | "id">)
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 8);

  const pathname = headers().get("next-url") || "";
  const lang = pathname.split("/")[1];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={`/${lang}`} className="mr-6 flex items-center">
          <Image src="/logo.png" alt="KSTech Logo" width={32} height={32} />
        </Link>

        <HeaderClient services={services} />

        <Link href="/admin" className="ml-2">
          <UserCog className="h-5 w-5" />
          <span className="sr-only">Admin Panel</span>
        </Link>
      </div>
    </header>
  );
}
