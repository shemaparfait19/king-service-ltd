"use client";

import Image from "next/image";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackIcon?: React.ComponentType<{ className?: string }>;
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes,
  priority = false,
  fallbackIcon: FallbackIcon = AlertCircle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
      >
        <FallbackIcon className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-muted animate-pulse flex items-center justify-center ${className}`}
        >
          <div className="h-8 w-8 rounded bg-muted-foreground/20" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        sizes={sizes}
        priority={priority}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}
