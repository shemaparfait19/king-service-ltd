"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const heroImageSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  isActive: z.boolean().default(true),
  order: z.number().min(0).default(0),
});

type HeroImageFormValues = z.infer<typeof heroImageSchema>;

export default function NewHeroImagePage() {
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<HeroImageFormValues>({
    resolver: zodResolver(heroImageSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      isActive: true,
      order: 0,
    },
  });

  const isActive = watch("isActive");
  const imageUrl = watch("imageUrl");

  // Update preview when image URL changes
  React.useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const onSubmit: SubmitHandler<HeroImageFormValues> = (data) => {
    startTransition(async () => {
      try {
        await addDoc(collection(db, "heroImages"), {
          ...data,
          createdAt: new Date(),
        });

        toast({
          title: "Success!",
          description: "Hero image created successfully.",
        });
        router.push("/admin/hero-images");
      } catch (error) {
        console.error("Error creating hero image:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to create hero image.",
        });
      }
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/admin/hero-images"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Hero Images
        </Link>
        <h1 className="text-4xl font-bold font-headline">Add New Hero Image</h1>
        <p className="text-muted-foreground mt-2">
          Create a new hero image for the homepage slider
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Image Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter image title"
                />
                {errors.title && (
                  <p className="text-destructive text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter image description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-destructive text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  {...register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && (
                  <p className="text-destructive text-sm">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  {...register("order", { valueAsNumber: true })}
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first in the slider
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={(checked) => setValue("isActive", checked)}
                />
                <Label htmlFor="isActive">Active (visible on homepage)</Label>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Image"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {imagePreview ? (
              <div className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview("")}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
                  </p>
                  <p>
                    <strong>Order:</strong> {watch("order")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-video border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Image preview will appear here
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
