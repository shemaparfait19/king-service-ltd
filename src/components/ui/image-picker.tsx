"use client";

import React, { useMemo, useState } from "react";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ImagePickerProps = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  storageFolder?: string;
};

export function ImagePicker({
  value,
  onChange,
  label = "Image",
  storageFolder = "uploads",
}: ImagePickerProps) {
  const [mode, setMode] = useState<"url" | "upload">(value ? "url" : "upload");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const previewSrc = useMemo(() => value || "", [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const filePath = `${storageFolder}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filePath);
    const task = uploadBytesResumable(storageRef, file);
    setIsUploading(true);
    setUploadProgress(0);

    task.on(
      "state_changed",
      (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(pct));
      },
      () => {
        setIsUploading(false);
        // Error is silently ignored; caller can retry
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        onChange(url);
        setIsUploading(false);
      }
    );
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === "upload" ? "default" : "outline"}
          onClick={() => setMode("upload")}
        >
          Upload
        </Button>
        <Button
          type="button"
          variant={mode === "url" ? "default" : "outline"}
          onClick={() => setMode("url")}
        >
          Use URL
        </Button>
      </div>

      {mode === "url" ? (
        <Input
          placeholder="https://..."
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="grid gap-2">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {isUploading && (
            <div className="text-sm text-muted-foreground">
              Uploading… {uploadProgress}%
            </div>
          )}
        </div>
      )}

      {previewSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewSrc}
          alt="preview"
          className="mt-2 h-32 w-auto rounded border object-cover"
        />
      ) : null}
    </div>
  );
}
