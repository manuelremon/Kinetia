import { useState, useCallback, useRef } from 'react';

interface UseAnimatedCounterOptions {
  target: number;
  duration?: number;
}

export function useAnimatedCounter({
  target,
  duration = 1800
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (isComplete) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * target);

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setIsComplete(true);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, isComplete]);

  return { count, isComplete, startAnimation };
}
