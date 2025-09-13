"use client";

import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/definitions";

type Announcement = BlogPost & {
  isUrgent?: boolean;
};

export default function AnnouncementsBanner() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const announcementsRef = collection(db, "blogPosts");
        const q = query(
          announcementsRef,
          where("status", "==", "Published"),
          where("category", "==", "Announcement")
        );
        const announcementsSnapshot = await getDocs(q);

        const posts = announcementsSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Announcement)
        );

        // Sort by date and get only the latest 3
        const sortedPosts = posts
          .sort((a, b) => {
            const dateA = new Date(a.date?.toDate?.() || a.date);
            const dateB = new Date(b.date?.toDate?.() || b.date);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 3);

        setAnnouncements(sortedPosts);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-4 bg-secondary/50">
        <div className="container px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-4 bg-secondary/50 border-b">
      <div className="container px-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            📢 Latest Announcements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {announcement.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(
                      new Date(
                        announcement.date?.toDate?.() || announcement.date
                      ),
                      "MMM d, yyyy"
                    )}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {announcement.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {announcement.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
