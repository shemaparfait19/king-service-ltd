import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="container py-12 md:py-24 text-center">
      <h1 className="text-4xl font-bold font-headline mb-4">Our Portfolio</h1>
      <p className="text-muted-foreground mb-8">This section is currently under construction. Come back soon to see our completed projects!</p>
       <Link href="/">
        <Button>Go back to Homepage</Button>
      </Link>
    </div>
  );
}
