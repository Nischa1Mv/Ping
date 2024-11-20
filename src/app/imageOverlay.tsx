"use Client";
import Image from "next/image";

import React from "react";

interface ImageOverlayProps {
  src: string;
}
function ImageOverlay({ src }: ImageOverlayProps) {
  return (
    <Image
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="rounded-full aspect-square max-w-full max-h-full "
      src={src}
      height={500}
      width={500}
      alt="ProfilePicture"
    />
  );
}

export default ImageOverlay;
