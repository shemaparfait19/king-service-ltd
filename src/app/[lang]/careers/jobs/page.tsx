import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Locale } from "@/i18n-config";

type CareerItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl?: string;
};

async function getJobs(): Promise<CareerItem[]> {
  const ref = collection(db, "careers");
  const q = query(
    ref,
    where("type", "==", "job"),
    where("status", "==", "Published")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  })) as CareerItem[];
}

export default async function JobsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const items = await getJobs();
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          Open Positions
        </h1>
        <p className="text-muted-foreground mt-2">
          Join our team of skilled technicians and engineers.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/careers/${item.slug}`}
            className="block border rounded-lg p-5 hover:shadow-md transition-shadow bg-background"
          >
            <h3 className="font-headline text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {item.summary}
            </p>
          </Link>
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">
          No positions available at the moment.
        </p>
      )}
    </div>
  );
}
