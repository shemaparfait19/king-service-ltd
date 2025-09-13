import { notFound } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { serviceIcons } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/definitions";
import type { Locale } from "@/i18n-config";

async function getService(slug: string): Promise<Service | null> {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("slug", "==", slug));
    const servicesSnapshot = await getDocs(q);

    if (servicesSnapshot.empty) {
      return null;
    }

    const doc = servicesSnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      short_desc: data.short_desc,
      long_desc: data.long_desc,
      details: data.details || [],
      imageUrl: data.imageUrl,
      icon:
        serviceIcons[data.slug as keyof typeof serviceIcons] ||
        serviceIcons["all-electronic-repair"],
    } as Service;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

export default async function ServiceDetailPage({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string };
}) {
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            {service.imageUrl ? (
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                <service.icon className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <service.icon className="h-6 w-6 text-accent" />
              <Badge variant="outline">Service</Badge>
            </div>
            <h1 className="text-4xl font-bold font-headline mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {service.short_desc}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <a
                  href="tel:+250787649480"
                  className="text-lg font-medium hover:text-primary"
                >
                  +250 787 649 480
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a
                  href="mailto:info@kstech.rw"
                  className="text-lg font-medium hover:text-primary"
                >
                  info@kstech.rw
                </a>
              </div>
            </div>

            <div className="mt-8">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold font-headline mb-4">
            Service Description
          </h2>
          <p className="text-muted-foreground mb-6">{service.long_desc}</p>

          {service.details && service.details.length > 0 && (
            <>
              <h2 className="text-2xl font-bold font-headline mb-4">
                What We Offer
              </h2>
              <ul className="space-y-2 mb-8">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
