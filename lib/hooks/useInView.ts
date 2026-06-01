"use client";

import { useEffect, useRef, useState } from "react";

export const useInView = <T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) => {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: options?.threshold ?? 0.2,
        rootMargin: options?.rootMargin ?? "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options?.rootMargin, options?.threshold]);

  return { ref, isInView };
};
