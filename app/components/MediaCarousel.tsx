"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import type { ProjectMediaItem } from "@/data/content";

interface MediaCarouselProps {
  items: ProjectMediaItem[];
  title: string;
  objectFit?: "cover" | "contain";
}

const DRAG_THRESHOLD = 60;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 };

export default function MediaCarousel({ items, title, objectFit = "cover" }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visitedSlides, setVisitedSlides] = useState(() => new Set<number>([0]));

  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const hasDragged = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSlideWidth(el.offsetWidth);
    });
    ro.observe(el);
    setSlideWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // On resize: snap x to current slide without animation
  useEffect(() => {
    if (slideWidth > 0) {
      x.set(-(currentIndexRef.current * slideWidth));
    }
  }, [slideWidth, x]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      currentIndexRef.current = clamped;
      setCurrentIndex(clamped);
      setVisitedSlides((prev) => {
        if (prev.has(clamped)) return prev;
        return new Set([...prev, clamped]);
      });
      if (slideWidth > 0) {
        animate(x, -(clamped * slideWidth), SPRING);
      }
    },
    [x, slideWidth, items.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        goTo(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        goTo(currentIndex + 1);
      }
    },
    [currentIndex, goTo]
  );

  if (items.length === 0) return null;

  const isSingle = items.length === 1;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`${title} media carousel`}
      aria-roledescription="carousel"
      className={`relative w-full aspect-video overflow-hidden select-none ${
        objectFit === "contain"
          ? "bg-stone-900"
          : "bg-stone-100 dark:bg-stone-800"
      }`}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (hasDragged.current) {
          e.stopPropagation();
          hasDragged.current = false;
        }
      }}
      tabIndex={isSingle ? undefined : 0}
    >
      {/* Slide track */}
      <motion.div
        className="flex h-full"
        style={{ x, width: slideWidth > 0 ? slideWidth * items.length : "100%" }}
        drag={isSingle ? undefined : "x"}
        dragMomentum={false}
        dragElastic={0.12}
        dragConstraints={
          isSingle ? undefined : { left: -(items.length - 1) * slideWidth, right: 0 }
        }
        onDragStart={() => {
          hasDragged.current = false;
        }}
        onDrag={() => {
          hasDragged.current = true;
        }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -DRAG_THRESHOLD) {
            goTo(currentIndex + 1);
          } else if (info.offset.x > DRAG_THRESHOLD) {
            goTo(currentIndex - 1);
          } else {
            animate(x, -(currentIndex * slideWidth), SPRING);
          }
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${items.length}`}
            style={{ width: slideWidth > 0 ? slideWidth : undefined }}
            className="flex-shrink-0 h-full relative w-full"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt ?? `${title} preview`}
                fill
                className={objectFit === "contain" ? "object-contain" : "object-cover"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 672px"
                draggable={false}
              />
            ) : visitedSlides.has(i) ? (
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${item.id}?rel=0`}
                title={`${title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
                <Image
                  src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                  alt={`${title} video thumbnail`}
                  fill
                  className="object-cover opacity-60"
                  draggable={false}
                />
                <div className="relative z-10 w-12 h-12 rounded-full bg-amber-400 border-2 border-stone-900 flex items-center justify-center shadow-md">
                  <svg
                    className="w-5 h-5 text-stone-900 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Arrow buttons — visible on group-hover via card's group class */}
      {!isSingle && currentIndex > 0 && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/50 hover:bg-stone-900/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            goTo(currentIndex - 1);
          }}
          aria-label="Previous slide"
          tabIndex={-1}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {!isSingle && currentIndex < items.length - 1 && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/50 hover:bg-stone-900/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            goTo(currentIndex + 1);
          }}
          aria-label="Next slide"
          tabIndex={-1}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Pagination dots */}
      {!isSingle && (
        <div
          className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? "w-4 h-1.5 bg-amber-400"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              tabIndex={-1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
