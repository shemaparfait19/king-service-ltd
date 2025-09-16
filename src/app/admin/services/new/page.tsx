"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePicker } from "@/components/ui/image-picker";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Wrench } from "lucide-react";
import Link from "next/link";

const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  short_desc: z
    .string()
    .min(10, "Short description must be at least 10 characters"),
  long_desc: z
    .string()
    .min(20, "Long description must be at least 20 characters"),
  imageUrl: z.string().url("Please enter a valid image URL"),
  details: z.array(z.string()).min(1, "At least one detail is required"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function NewServicePage() {
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [details, setDetails] = useState<string[]>([""]);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      slug: "",
      short_desc: "",
      long_desc: "",
      imageUrl: "",
      details: [""],
    },
  });

  const imageUrl = watch("imageUrl");

  // Update preview when image URL changes
  React.useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setValue("slug", slug);
  };

  const addDetail = () => {
    setDetails([...details, ""]);
  };

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const updateDetail = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const onSubmit: SubmitHandler<ServiceFormValues> = (data) => {
    startTransition(async () => {
      try {
        // Filter out empty details
        const filteredDetails = details.filter(
          (detail) => detail.trim() !== ""
        );

        await addDoc(collection(db, "services"), {
          ...data,
          details: filteredDetails,
        });

        toast({
          title: "Success!",
          description: "Service created successfully.",
        });
        router.push("/admin/services");
      } catch (error) {
        console.error("Error creating service:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to create service.",
        });
      }
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Link>
        <h1 className="text-4xl font-bold font-headline">Add New Service</h1>
        <p className="text-muted-foreground mt-2">
          Create a new technical service
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="e.g., Fridge Repair"
                />
                {errors.title && (
                  <p className="text-destructive text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="slug">Slug (URL-friendly)</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="e.g., fridge-repair"
                />
                {errors.slug && (
                  <p className="text-destructive text-sm">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="short_desc">Short Description</Label>
                <Textarea
                  id="short_desc"
                  {...register("short_desc")}
                  placeholder="Brief description for service cards"
                  rows={2}
                />
                {errors.short_desc && (
                  <p className="text-destructive text-sm">
                    {errors.short_desc.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="long_desc">Long Description</Label>
                <Textarea
                  id="long_desc"
                  {...register("long_desc")}
                  placeholder="Detailed description for service page"
                  rows={4}
                />
                {errors.long_desc && (
                  <p className="text-destructive text-sm">
                    {errors.long_desc.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <ImagePicker
                  label="Service Image"
                  value={imageUrl}
                  onChange={(url) =>
                    setValue("imageUrl", url, { shouldValidate: true })
                  }
                  storageFolder="services"
                />
                {errors.imageUrl && (
                  <p className="text-destructive text-sm">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Service Details</Label>
                {details.map((detail, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={detail}
                      onChange={(e) => updateDetail(index, e.target.value)}
                      placeholder={`Detail ${index + 1}`}
                    />
                    {details.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeDetail(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDetail}
                  className="w-fit"
                >
                  Add Detail
                </Button>
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
                  {isPending ? "Creating..." : "Create Service"}
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
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg border">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview("")}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Wrench className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {watch("title") || "Service Title"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {watch("short_desc") ||
                    "Service description will appear here"}
                </p>
                <div className="text-xs text-muted-foreground">
                  <p>
                    <strong>Slug:</strong> {watch("slug") || "service-slug"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
