import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-24 text-center">
      <h1 className="text-4xl font-bold font-headline mb-4">Blog</h1>
      <p className="text-muted-foreground mb-8">This section is currently under construction. Check back soon for news and articles!</p>
      <Link href="/">
        <Button>Go back to Homepage</Button>
      </Link>
    </div>
  );
}
