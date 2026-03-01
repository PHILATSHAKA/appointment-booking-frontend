"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <Image
        src="/loader.svg"
        width={20}
        height={20}
        alt="Loading..."
        className="size-14 animate-none"
      />
    </div>
  );
}
