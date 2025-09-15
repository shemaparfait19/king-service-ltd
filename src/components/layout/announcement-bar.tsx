"use client";

import { Megaphone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const fallbackAnnouncements = [
  "Grand Opening Special: 10% off all repairs this month!",
  "We now offer expert solar panel installation services.",
  "Need urgent help? Contact us on WhatsApp for a quick response.",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState<string[]>(fallbackAnnouncements);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const postsRef = collection(db, "blogPosts");
        // Use single where and filter status on client to avoid composite index
        const q = query(postsRef, where("category", "==", "Announcement"));
        const snap = await getDocs(q);
        const titles = snap.docs
          .map((d) => d.data() as any)
          .filter((p) => p.status === "Published")
          .map((p) => p.title || p.excerpt || "Announcement");
        if (mounted && titles.length > 0) setItems(titles);
      } catch {
        // keep fallbacks
      }
    })();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [items.length]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-accent text-accent-foreground relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            <Megaphone className="h-5 w-5 mr-3" />
            <p className="text-sm font-medium">{items[currentIndex]}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss"
            className="p-2 -mr-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
