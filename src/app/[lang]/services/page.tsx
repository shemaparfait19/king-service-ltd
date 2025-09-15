import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serviceIcons } from "@/lib/data";
import Image from "next/image";
import { ExternalImage } from "@/components/ui/external-image";
import type { Service } from "@/lib/definitions";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Locale } from "@/i18n-config";

async function getServices(): Promise<Service[]> {
  const servicesCollection = collection(db, "services");
  const servicesSnapshot = await getDocs(servicesCollection);
  const servicesList = servicesSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      short_desc: data.short_desc,
      long_desc: data.long_desc,
      details: data.details,
      imageUrl: data.imageUrl,
      icon: serviceIcons[data.slug as keyof typeof serviceIcons] || Wrench,
    } as Service;
  });

  return servicesList;
}

export default async function ServicesPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const services = await getServices();

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Our Expert Services
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We offer a wide range of technical services to meet your needs.
            Explore our offerings below.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                href={`/${lang}/services/${service.slug}`}
                className="flex flex-col h-full"
              >
                <CardHeader className="p-0 border-b">
                  <div className="overflow-hidden aspect-[4/3] relative">
                    {service.imageUrl ? (
                      <ExternalImage
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="bg-muted flex items-center justify-center h-full">
                        <service.icon className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4 flex-grow">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 -mt-12 z-10 border-4 border-background">
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {service.short_desc}
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <Link href={`/${lang}/services/${service.slug}`}>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-accent p-0"
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <a
                      href={`https://wa.me/250787649480?text=${encodeURIComponent(
                        "Hello KSTech! I need a quote for: " + service.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                    >
                      WhatsApp Quote
                    </a>
                    <a
                      href={`mailto:kstrwanda@gmail.com?subject=${encodeURIComponent(
                        "Quote Request: " + service.title
                      )}&body=${encodeURIComponent(
                        "Hello KSTech,%0D%0A%0D%0AI'd like a quote for: " +
                          service.title +
                          ".%0D%0A%0D%0AThanks."
                      )}`}
                      className="text-sm text-accent hover:underline"
                    >
                      Email Quote
                    </a>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
