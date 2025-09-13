"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
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
import type { Service } from "@/lib/definitions";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchServices() {
      try {
        const servicesRef = collection(db, "services");
        const servicesSnapshot = await getDocs(servicesRef);

        const servicesList = servicesSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Service)
        );

        setServices(servicesList);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to fetch services.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [toast]);

  const handleDeleteService = () => {
    if (!serviceToDelete) return;

    startTransition(async () => {
      try {
        await deleteDoc(doc(db, "services", serviceToDelete.id));
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== serviceToDelete.id)
        );
        toast({
          title: "Success!",
          description: "Service deleted successfully.",
        });
      } catch (error) {
        console.error("Error deleting service:", error);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Failed to delete service.",
        });
      } finally {
        setServiceToDelete(null);
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
          <h1 className="text-4xl font-bold font-headline">Services</h1>
          <p className="text-muted-foreground mt-2">
            Manage your technical services
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0">
              <div className="aspect-video relative overflow-hidden">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Wrench className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {service.short_desc}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {service.slug}
                </Badge>
                <div className="flex gap-2">
                  <Link href={`/admin/services/edit/${service.id}`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setServiceToDelete(service)}
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

      {services.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No services yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first service to get started
          </p>
          <Link href="/admin/services/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add First Service
            </Button>
          </Link>
        </div>
      )}

      <AlertDialog
        open={!!serviceToDelete}
        onOpenChange={() => setServiceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              service "{serviceToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
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
