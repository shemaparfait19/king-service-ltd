
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SplashScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2000); // Splash screen duration

    const exitTimer = setTimeout(() => {
      onFinished();
    }, 2500); // Match this with fade-out duration

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isExiting ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="KSTech Logo" width={48} height={48} />
        <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold font-headline">KSTech Solutions</h1>
            <p className="text-lg text-muted-foreground italic">The King of Electronics</p>
        </div>
      </div>
    </div>
  );
};


export function AppWithSplashScreen({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <SplashScreen onFinished={() => setLoading(false)} />;
    }

    return <>{children}</>;
}
