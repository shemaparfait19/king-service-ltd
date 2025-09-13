"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type HeroImage = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
  order: number;
  createdAt: any;
};

export default function HeroImagesPage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [imageToDelete, setImageToDelete] = useState<HeroImage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const heroImagesRef = collection(db, "heroImages");
        const heroImagesSnapshot = await getDocs(heroImagesRef);

        const images = heroImagesSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as HeroImage)
        );

        // Sort by order
        const sortedImages = images.sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
        setHeroImages(sortedImages);
      } catch (error) {
        console.error("Error fetching hero images:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to fetch hero images.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchHeroImages();
  }, [toast]);

  const handleToggleActive = (image: HeroImage) => {
    startTransition(async () => {
      try {
        const imageRef = doc(db, "heroImages", image.id);
        await updateDoc(imageRef, { isActive: !image.isActive });

        setHeroImages((prevImages) =>
          prevImages.map((img) =>
            img.id === image.id ? { ...img, isActive: !img.isActive } : img
          )
        );

        toast({
          title: "Success!",
          description: `Image ${
            image.isActive ? "hidden" : "shown"
          } successfully.`,
        });
      } catch (error) {
        console.error("Error updating image:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to update image status.",
        });
      }
    });
  };

  const handleDeleteImage = () => {
    if (!imageToDelete) return;

    startTransition(async () => {
      try {
        await deleteDoc(doc(db, "heroImages", imageToDelete.id));
        setHeroImages((prevImages) =>
          prevImages.filter((img) => img.id !== imageToDelete.id)
        );
        toast({
          title: "Success!",
          description: "Image deleted successfully.",
        });
      } catch (error) {
        console.error("Error deleting image:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to delete image.",
        });
      } finally {
        setImageToDelete(null);
      }
    });
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold font-headline">Hero Images</h1>
          <p className="text-muted-foreground mt-2">
            Manage homepage slider images
          </p>
        </div>
        <Link href="/admin/hero-images/new">
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Image
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroImages.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={image.isActive ? "default" : "secondary"}>
                    {image.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{image.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {image.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(image)}
                    disabled={isPending}
                  >
                    {image.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Link href={`/admin/hero-images/edit/${image.id}`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setImageToDelete(image)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {heroImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hero images yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first hero image to get started
          </p>
          <Link href="/admin/hero-images/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add First Image
            </Button>
          </Link>
        </div>
      )}

      <AlertDialog
        open={!!imageToDelete}
        onOpenChange={() => setImageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              hero image "{imageToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteImage}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
