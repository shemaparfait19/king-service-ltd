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
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="KSTech Logo"
          width={96}
          height={96}
          priority
        />
      </div>
    </div>
  );
};

export function AppWithSplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  // This is a temporary fix to avoid splash screen on every navigation
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setLoading(true);
      setIsFirstLoad(false);
    } else {
      setLoading(false);
    }
  }, [isFirstLoad]);

  if (loading) {
    return <SplashScreen onFinished={() => setLoading(false)} />;
  }

  return <>{children}</>;
}
