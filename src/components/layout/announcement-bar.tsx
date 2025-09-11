"use client";

import { Megaphone, X } from "lucide-react";
import { useState, useEffect } from "react";

const announcements = [
    "Grand Opening Special: 10% off all repairs this month!",
    "We now offer expert solar panel installation services.",
    "Need urgent help? Contact us on WhatsApp for a quick response."
];

export default function AnnouncementBar() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % announcements.length);
        }, 5000); // Change announcement every 5 seconds

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="bg-accent text-accent-foreground relative z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-10">
                    <div className="flex items-center">
                        <Megaphone className="h-5 w-5 mr-3" />
                        <p className="text-sm font-medium">
                            {announcements[currentIndex]}
                        </p>
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
