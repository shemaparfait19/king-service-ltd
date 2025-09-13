import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { services } from "@/lib/data";
import Image from "next/image";

export default function ServicesPage() {

  return (
    <div className="bg-background">
        <div className="container py-12 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Expert Services</h1>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                    We offer a wide range of technical services to meet your needs. Explore our offerings below.
                </p>
            </div>
             <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {services.map((service) => (
                    <Card key={service.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/services/${service.slug}`} className="flex flex-col h-full">
                             {service.gallery.length > 0 && service.gallery[0] && (
                                <CardHeader className="p-0 border-b">
                                    <div className="overflow-hidden aspect-[4/3] relative">
                                        <Image
                                            src={service.gallery[0].imageUrl}
                                            alt={service.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            data-ai-hint={service.gallery[0].imageHint}
                                        />
                                    </div>
                                </CardHeader>
                            )}
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4 flex-grow">
                                <div className="bg-primary text-primary-foreground rounded-full p-3 -mt-12 z-10 border-4 border-background">
                                <service.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold font-headline">{service.title}</h3>
                                <p className="text-sm text-muted-foreground flex-grow">{service.short_desc}</p>
                                <Button variant="link" size="sm" className="mt-auto text-accent group-hover:underline p-0">
                                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  )
}
