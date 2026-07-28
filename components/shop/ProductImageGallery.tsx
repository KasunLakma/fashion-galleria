"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  tag?: string;
  tagColor?: string;
}

export default function ProductImageGallery({
  images,
  productName,
  tag,
  tagColor,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedImageIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Selector List (Horizontal on Mobile, Vertical Left Strip on Desktop) */}
      <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto custom-scrollbar shrink-0 py-1 md:py-0">
        {images.map((img, idx) => {
          const isSelected = selectedImageIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-stone-100 rounded-xs overflow-hidden border-2 transition-all shrink-0 ${
                isSelected ? "border-amber-800 ring-1 ring-amber-800 scale-105" : "border-stone-200 opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Main High-Res Image with Interactive Zoom Lens Effect */}
      <div className="flex-1 relative aspect-[3/4] bg-stone-100 border border-stone-200 rounded-xs overflow-hidden group cursor-crosshair">
        <div
          className="relative w-full h-full overflow-hidden"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt={productName}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              isZoomed ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Zoom Lens Background View */}
          {isZoomed && (
            <div
              className="absolute inset-0 w-full h-full bg-no-repeat transition-all duration-75"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: "220%",
              }}
            />
          )}

          {/* Hover Zoom Hint */}
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded flex items-center space-x-1 opacity-90 group-hover:opacity-100 pointer-events-none">
            <ZoomIn size={12} />
            <span>Hover to Zoom</span>
          </div>

          {/* Tag Badge Overlay */}
          {tag && (
            <span
              className={`absolute top-4 left-4 text-xs font-extrabold uppercase tracking-wider px-3 py-1 border shadow-xs ${tagColor}`}
            >
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
