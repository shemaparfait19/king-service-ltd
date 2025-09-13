
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { sampleServices, sampleBlogPosts, samplePortfolioProjects } from '@/lib/sample-data';
import { Progress } from '@/components/ui/progress';

export default function SeedPage() {
    const [isSeeding, setIsSeeding] = useState(false);
    const [progress, setProgress] = useState(0);
    const { toast } = useToast();

    const handleSeed = async () => {
        setIsSeeding(true);
        setProgress(0);

        try {
            const batch = writeBatch(db);
            const collections = ['services', 'blogPosts', 'portfolioProjects'];
            
            // 1. Clear existing data
            setProgress(10);
            for (const col of collections) {
                const snapshot = await getDocs(collection(db, col));
                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });
            }
            await batch.commit(); // Commit deletions
            
            // Start a new batch for additions
            let newBatch = writeBatch(db);
            setProgress(30);

            // 2. Seed services
            sampleServices.forEach((service) => {
                const { icon, ...serviceData } = service; // Exclude icon from data
                const docRef = doc(collection(db, 'services'));
                newBatch.set(docRef, serviceData);
            });
            setProgress(50);

            // 3. Seed blog posts
            sampleBlogPosts.forEach((post) => {
                const docRef = doc(collection(db, 'blogPosts'));
                newBatch.set(docRef, {...post, date: new Date(post.date) });
            });
            setProgress(70);

            // 4. Seed portfolio projects
            samplePortfolioProjects.forEach((project) => {
                const docRef = doc(collection(db, 'portfolioProjects'));
                newBatch.set(docRef, project);
            });
            setProgress(90);

            // 5. Commit all additions
            await newBatch.commit();
            setProgress(100);

            toast({
                title: 'Success!',
                description: 'Database seeded successfully!',
            });

        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Error!',
                description: `Database seeding failed: ${error.message || 'Unknown error'}`,
            });
        } finally {
            setIsSeeding(false);
        }
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
            <CardContent className="space-y-4">
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will first delete all existing content in the services, blogPosts, and portfolioProjects collections before adding the sample data.
                    </AlertDescription>
                </Alert>
                {isSeeding && (
                    <div className="space-y-2 pt-4">
                        <Progress value={progress} />
                        <p className="text-sm text-muted-foreground text-center">Seeding in progress... please wait.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSeed} disabled={isSeeding}>
                    {isSeeding ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Seeding...</> : 'Seed Database'}
                </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}

