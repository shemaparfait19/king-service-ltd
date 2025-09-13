
"use client";

import { useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { seedDatabase } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function SeedPage() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleSeed = () => {
        startTransition(async () => {
            const result = await seedDatabase();
            if (result.success) {
                toast({
                    title: 'Success!',
                    description: result.message,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error!',
                    description: result.message,
                });
            }
        });
    };


  return (
    <div className="bg-secondary/50 flex-grow">
      <div className="container py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Seed Database</h1>
          <p className="text-muted-foreground mt-2">Populate your Firestore database with initial sample data.</p>
        </header>

        <main>
          <Card>
            <CardHeader>
                <CardTitle>Restore Sample Content</CardTitle>
                <CardDescription>
                    Clicking this button will add sample data for services, blog posts, and portfolio projects to your database.
                    This is useful for seeing how the site looks with content.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will first delete all existing content in the services, blogPosts, and portfolioProjects collections before adding the sample data.
                    </AlertDescription>
                </Alert>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSeed} disabled={isPending}>
                    {isPending ? 'Seeding...' : 'Seed Database'}
                </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}

