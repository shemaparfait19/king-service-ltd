"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"

import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "./ui/button"
import { MoveRight } from "lucide-react"

export default function HeroSlider() {
  const heroImages = PlaceHolderImages.filter((p) => p.id.startsWith("hero-"))
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-0 h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id} className="pl-0 relative w-full h-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  data-ai-hint={image.imageHint}
                  sizes="100vw"
                />
            </CarouselItem>
          ))}
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
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Request a Service
                    <MoveRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
            <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-black">
                    Contact Us
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
