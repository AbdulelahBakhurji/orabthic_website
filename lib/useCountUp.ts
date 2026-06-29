"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp(
  end: number,
  inView: boolean,
  options: Omit<UseCountUpOptions, "end"> = {}
) {
  const { duration = 1500, decimals = 0, suffix = "", prefix = "" } = options;
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  const formatted =
    prefix +
    (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()) +
    suffix;

  return formatted;
}
