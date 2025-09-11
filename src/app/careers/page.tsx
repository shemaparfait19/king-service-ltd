import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="container py-12 md:py-24 text-center">
      <h1 className="text-4xl font-bold font-headline mb-4">Careers & Internships</h1>
      <p className="text-muted-foreground mb-8">We are always looking for talented individuals. This section is currently under construction. Please check back soon!</p>
       <Link href="/">
        <Button>Go back to Homepage</Button>
      </Link>
    </div>
  );
}
