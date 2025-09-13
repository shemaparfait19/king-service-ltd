import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

import { services, faqs } from "@/lib/data";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }
  
  const otherServices = services.filter(s => s.slug !== params.slug).slice(0, 5);
  const validGallery = service.gallery.filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative h-full flex flex-col justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-gray-300 hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services" className="text-gray-300 hover:text-white">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold font-headline">{service.title}</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 lg:order-first order-last">
            <ContactForm 
                title="Request a Quote"
                description="Fill in your details for this service."
            />
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">Other Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {otherServices.map(s => (
                    <li key={s.id}>
                      <Link href={`/services/${s.slug}`} className="flex justify-between items-center text-muted-foreground hover:text-primary group">
                        <span>{s.title}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold font-headline text-lg">Contact Us Directly</h3>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <a href="tel:+250787649480" className="text-muted-foreground hover:text-primary">+250 787 649 480</a>
                </div>
                 <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <a href="mailto:kstrwanda@gmail.com" className="text-muted-foreground hover:text-primary">kstrwanda@gmail.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">V34R+P56, RN15, Nyamata</p>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-2 bg-background p-6 md:p-8 rounded-lg shadow-sm border">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="lead text-xl text-muted-foreground">{service.long_desc}</p>
              
              <h2 className="font-headline mt-12">What's Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose list-none p-0">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {validGallery.length > 0 && (
                <>
                  <h2 className="font-headline mt-12">Our Work</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {validGallery.map((image) => (
                      <Image
                        key={image.id}
                        src={image.imageUrl}
                        alt={`${service.title} - ${image.imageHint}`}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    ))}
                  </div>
                </>
              )}

              <h2 className="font-headline mt-12">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

        </div>
      </div>
      </div>
    </>
  );
}
