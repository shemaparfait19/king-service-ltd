import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Users, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find((p) => p.id === 'about-hero');
  const ceoImage = PlaceHolderImages.find((p) => p.id === 'ceo-portrait');

  const trustElements = [
    { icon: Award, title: 'Professional Expertise', description: 'Our certified technicians bring years of experience to every job.' },
    { icon: Heart, title: 'Customer-Centric', description: 'We prioritize your needs, ensuring transparent communication and reliable solutions.' },
    { icon: Users, title: 'Community Focused', description: 'Proudly serving Bugesera and contributing to local growth through training and service.' },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-primary text-primary-foreground flex items-center justify-center">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover opacity-20"
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="relative container text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline">About KSTech Solutions</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">The King of Electronics</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12 md:py-24">
        {/* Intro Section */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-6">
            <Badge variant="outline" className="border-accent text-accent">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Your Trusted Technical Partner</h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground text-lg">
                <p>
                KING SERVICE TECH LTD (KST) solves electronics and IT service gaps in Eastern Province (Bugesera) and nationwide. We provide installation, maintenance, repair, training, internships, and client advertising.
                </p>
                <p>
                Our mission is driven by a simple philosophy: <em className="font-semibold text-foreground">"We love what we do !! We do what we love"</em>. This passion translates into high-quality, reliable services for all our clients, from individual households to large industrial operations.
                </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
                <CardContent className="p-6 text-center bg-secondary">
                    {ceoImage && (
                        <Image
                            src={ceoImage.imageUrl}
                            alt={ceoImage.description}
                            width={150}
                            height={150}
                            className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                            data-ai-hint={ceoImage.imageHint}
                        />
                    )}
                    <h3 className="text-xl font-bold font-headline">HABIMANA Celestin</h3>
                    <p className="text-muted-foreground">Founder & CEO</p>
                    <p className="mt-4 text-sm italic">"Our goal is to bring world-class technical solutions to our community, fostering growth and innovation."</p>
                </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Why Choose KSTech?</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed mt-4">
              We are committed to excellence, professionalism, and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustElements.map(item => (
                <div key={item.title} className="text-center p-6 bg-secondary/50 rounded-lg">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4">
                           <item.icon className="h-8 w-8" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
