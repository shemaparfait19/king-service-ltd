import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/lib/data";

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
             <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {services.map((service) => (
                <Link href={`/services/${service.slug}`} key={service.id}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group bg-secondary/50 hover:bg-secondary">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4">
                        <service.icon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold font-headline">{service.title}</h3>
                        <p className="text-sm text-muted-foreground flex-grow">{service.short_desc}</p>
                        <Button variant="link" size="sm" className="mt-auto text-accent group-hover:underline p-0">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                    </Card>
                </Link>
                ))}
            </div>
        </div>
    </div>
  )
}
