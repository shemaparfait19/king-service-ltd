"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ExternalImage } from "@/components/ui/external-image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type HeroImage = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
};

export default function HeroSlider() {
  const [heroImages, setHeroImages] = React.useState<HeroImage[]>([]);
  const [loading, setLoading] = React.useState(true);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    async function fetchHeroImages() {
      try {
        const heroImagesRef = collection(db, "heroImages");
        const q = query(heroImagesRef, where("isActive", "==", true));
        const heroImagesSnapshot = await getDocs(q);

        const images = heroImagesSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as HeroImage)
        );

        setHeroImages(images);
      } catch (error) {
        // Fallback to placeholder images if Firebase fails
        setHeroImages([
          {
            id: "fallback-1",
            title: "Welcome to KSTech",
            imageUrl:
              "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
            description: "Professional technical services",
            isActive: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroImages();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-0 h-full">
          {heroImages.length > 0 ? (
            heroImages.map((image, index) => (
              <CarouselItem
                key={image.id}
                className="pl-0 relative w-full h-full"
              >
                <ExternalImage
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="pl-0 relative w-full h-full">
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">No hero images available</p>
                  <p className="text-sm">
                    Please add images from the admin panel
                  </p>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl font-headline">
            KING SERVICE TECH LTD
          </h1>
          <p className="text-xl md:text-2xl font-light italic">
            We love what we do !! We do what we love
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Request a Service
                <MoveRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-black"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
