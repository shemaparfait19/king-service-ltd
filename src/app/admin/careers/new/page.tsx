"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import type { CareerType } from "@/lib/definitions";

function slugify(v: string) {
  return v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NewCareerPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<CareerType>(
    (params.get("type") as CareerType) || "job"
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [applicationEmail, setApplicationEmail] = useState(
    "kstrwanda@gmail.com"
  );
  const [applicationWhatsapp, setApplicationWhatsapp] =
    useState("+250787649480");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");

  // type-specific
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [salaryRange, setSalaryRange] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [startDate, setStartDate] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!title) return;
    setSlug(slugify(title));
  }, [title]);

  const onSubmit = () => {
    startTransition(async () => {
      try {
        const payload: any = {
          type,
          title,
          slug,
          summary,
          description,
          imageUrl,
          location,
          applicationEmail,
          applicationWhatsapp,
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        if (type === "job")
          Object.assign(payload, { department, employmentType, salaryRange });
        if (type === "internship")
          Object.assign(payload, { duration, stipend });
        if (type === "training")
          Object.assign(payload, { startDate, duration, price });

        await addDoc(collection(db, "careers"), payload);
        toast({ title: "Created", description: "Career entry created" });
        router.push("/admin/careers");
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create",
        });
      }
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">
          New {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>
        <p className="text-muted-foreground">Create a new career entry</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Type</Label>
            <div className="flex gap-2">
              {(["job", "internship", "training"] as CareerType[]).map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant={type === t ? "default" : "outline"}
                  onClick={() => setType(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="applicationEmail">Application Email</Label>
              <Input
                id="applicationEmail"
                value={applicationEmail}
                onChange={(e) => setApplicationEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="applicationWhatsapp">Application WhatsApp</Label>
              <Input
                id="applicationWhatsapp"
                value={applicationWhatsapp}
                onChange={(e) => setApplicationWhatsapp(e.target.value)}
              />
            </div>
          </div>

          {type === "job" && (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Department</Label>
                <Input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Employment Type</Label>
                <Input
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Salary Range</Label>
                <Input
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                />
              </div>
            </div>
          )}

          {type === "internship" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Duration</Label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Stipend</Label>
                <Input
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                />
              </div>
            </div>
          )}

          {type === "training" && (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Duration</Label>
                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Price</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStatus("Draft")}
              disabled={status === "Draft"}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={() => setStatus("Published")}
              disabled={status === "Published"}
            >
              Set Published
            </Button>
            <Button type="button" onClick={onSubmit} disabled={isPending}>
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
