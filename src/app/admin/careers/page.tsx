"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Career, CareerType } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Plus, Trash2 } from "lucide-react";

export default function AdminCareersPage() {
  const [items, setItems] = useState<Career[]>([]);
  const [type, setType] = useState<CareerType | "all">("all");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const ref = collection(db, "careers");
      const snap = await getDocs(ref);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Career));
      setItems(list);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (type === "all") return items;
    return items.filter((i) => i.type === type);
  }, [items, type]);

  const toggleStatus = (item: Career) => {
    startTransition(async () => {
      try {
        const ref = doc(db, "careers", item.id);
        await updateDoc(ref, {
          status: item.status === "Published" ? "Draft" : "Published",
          updatedAt: new Date(),
        });
        setItems((prev) =>
          prev.map((p) =>
            p.id === item.id
              ? {
                  ...p,
                  status: p.status === "Published" ? "Draft" : "Published",
                }
              : p
          )
        );
        toast({ title: "Updated", description: "Status updated" });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update status",
        });
      }
    });
  };

  const removeItem = (item: Career) => {
    startTransition(async () => {
      try {
        await deleteDoc(doc(db, "careers", item.id));
        setItems((prev) => prev.filter((p) => p.id !== item.id));
        toast({ title: "Deleted", description: "Career entry removed" });
      } catch (e) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete",
        });
      }
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Careers</h1>
          <p className="text-muted-foreground">
            Manage jobs, internships and trainings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/careers/new?type=job">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </Button>
          </Link>
          <Link href="/admin/careers/new?type=internship">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Internship
            </Button>
          </Link>
          <Link href="/admin/careers/new?type=training">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Training
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={type} onValueChange={(v) => setType(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="internship">Internships</TabsTrigger>
          <TabsTrigger value="training">Trainings</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge
                  variant={
                    item.status === "Published" ? "default" : "secondary"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{item.type}</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.summary}
              </p>
              <div className="flex items-center gap-2">
                <Link href={`/admin/careers/edit/${item.id}`}>
                  <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleStatus(item)}
                  disabled={isPending}
                >
                  {item.status === "Published" ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => removeItem(item)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
