
"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function FileUpload({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file: File | undefined) => {
    try {
      if (!file) {
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      data.set("userId", userId);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      await uploadRequest.json();
      setUploading(false);
      setSuccess(true);
      window.location.reload();
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFile(e.target?.files?.[0]);
  };

  return (
    <>
      <input
        id="upload"
        type="file"
        onChange={handleChange}
        accept="image/*"
        hidden
      />
      <label htmlFor="upload" className="cursor-pointer h-full">
        <Button
          size="lg"
          disabled={uploading}
          className="pointer-events-none text-white text-2xl font-bold py-2"
        >
          {uploading ? "Uploading..." : success ? "Uploaded!" : "Scan Meal"}
        </Button>
      </label>
    </>
  );
}
