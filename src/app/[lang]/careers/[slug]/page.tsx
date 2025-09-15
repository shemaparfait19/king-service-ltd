import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";

type CareerDoc = any & { id: string };

async function getCareer(slug: string): Promise<CareerDoc | null> {
  const ref = collection(db, "careers");
  const q = query(ref, where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...(snap.docs[0].data() as any) };
}

export default async function CareerDetail({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const item = await getCareer(slug);
  if (!item) return null;

  const wa = item.applicationWhatsapp || "+250787649480";
  const email = item.applicationEmail || "kstrwanda@gmail.com";
  const title = item.title || "Opportunity";

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold font-headline">{item.title}</h1>
        <p className="text-muted-foreground">{item.summary}</p>

        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full rounded-lg border"
          />
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: (item.description || "").toString().replace(/\n/g, "<br/>"),
          }}
        />

        <div className="flex flex-wrap items-center gap-3 pt-4">
          <a
            href={`https://wa.me/${wa.replace(
              /\D/g,
              ""
            )}?text=${encodeURIComponent(
              "Hello, I am interested in: " + title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              WhatsApp
            </Button>
          </a>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              title
            )}&body=${encodeURIComponent(
              "Hello,%0D%0A%0D%0AI am interested in: " + title
            )}`}
          >
            <Button variant="outline">Email</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
