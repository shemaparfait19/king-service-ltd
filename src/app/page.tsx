import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Lightbulb,
  Users,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSlider from '@/components/hero-slider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Service } from '@/lib/definitions';
import { serviceIcons } from '@/lib/data';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function getServices(): Promise<Service[]> {
  const servicesCollection = collection(db, 'services');
  const q = query(servicesCollection, limit(8));
  const servicesSnapshot = await getDocs(q);
  const servicesList = servicesSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      short_desc: data.short_desc,
      long_desc: data.long_desc,
      details: data.details,
      icon: serviceIcons[data.slug as keyof typeof serviceIcons] || Wrench,
    } as Service;
  });
  return servicesList;
}

export default async function Home() {
  const portfolioImage = PlaceHolderImages.find(p => p.id === 'portfolio-1');
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[70vh] md:h-[90vh]">
        <HeroSlider />
      </section>

      <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="border-accent text-accent">Our Services</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">What We Offer</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From household appliance repair to complex industrial solutions, we provide expert technical services to solve your problems efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
             {services.map((service) => {
                const serviceImage = PlaceHolderImages.find(p => p.id === `service-${service.slug}`)
                return (
                <Card key={service.id} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300 bg-background">
                    <Link href={`/services/${service.slug}`} className="flex flex-col h-full">
                        <CardHeader className="p-0 border-b relative aspect-[4/3] overflow-hidden">
                           {serviceImage ? (
                                <Image
                                    src={serviceImage.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    data-ai-hint={serviceImage.imageHint}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="bg-muted flex items-center justify-center h-full">
                                    <service.icon className="h-16 w-16 text-muted-foreground" />
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="p-6 flex flex-col items-start text-left gap-2 flex-grow">
                            <service.icon className="h-8 w-8 text-accent mb-2" />
                            <h3 className="text-xl font-bold font-headline">{service.title}</h3>
                            <p className="text-sm text-muted-foreground flex-grow">{service.short_desc}</p>
                            <Button variant="link" size="sm" className="mt-auto text-accent group-hover:underline p-0">
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Link>
                </Card>
            )})}
          </div>
          <div className="flex justify-center">
            <Link href="/services">
              <Button>
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <Badge className="bg-accent text-accent-foreground">Featured Project</Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Advanced CCTV & Internet Installation for a Commercial Complex
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We designed and deployed a state-of-the-art surveillance and networking solution, ensuring robust security and high-speed connectivity for a multi-tenant commercial building.
            </p>
            <Link href="/portfolio">
              <Button variant="link" className="p-0 text-accent">
                Explore Our Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            {portfolioImage && (
              <Image
                src={portfolioImage.imageUrl}
                alt="Featured Project"
                width={700}
                height={500}
                className="overflow-hidden rounded-xl object-cover"
                data-ai-hint={portfolioImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>
      
      <section id="ads" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Client Advertisements</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Promoting local businesses and partners.
            </p>
          </div>
          {/* Ad Carousel/Banner will go here */}
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Advertisement area is under construction.</p>
          </div>
        </div>
      </section>

      <section id="careers-cta" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-xl font-bold font-headline"><Briefcase /> Careers</h3>
              <p className="text-muted-foreground">Join our team of skilled technicians and innovators.</p>
              <Link href="/careers">
                <Button variant="outline">View Open Positions</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-xl font-bold font-headline"><Lightbulb /> Internships</h3>
              <p className="text-muted-foreground">Gain hands-on experience and grow your skills with us.</p>
              <Link href="/careers">
                 <Button variant="outline">Apply for Internship</Button>
              </Link>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-xl font-bold font-headline"><Users /> Training</h3>
              <p className="text-muted-foreground">We offer specialized training programs for aspiring technicians.</p>
              <Link href="/services">
                <Button variant="outline">Explore Training</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/250787649480?text=Hello%20KSTech!%20I%20have%20a%20question."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  );
}
