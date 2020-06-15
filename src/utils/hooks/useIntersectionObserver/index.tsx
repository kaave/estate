import { useEffect } from 'react';
import type { RefObject } from 'react';

type Callback = (value: IntersectionObserverEntry, index: number, array: IntersectionObserverEntry[]) => void;

export function useIntersectionObserver(
  target: RefObject<HTMLElement | SVGElement>,
  callback: Callback = (entry) => console.log(entry),
  options: IntersectionObserverInit = {},
) {
  useEffect(() => {
    if (!target.current) return;
    const element = target.current;

    const observer = new IntersectionObserver((entries) => entries.forEach(callback), { ...options });

    observer.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => observer.unobserve(element);
  }, [target, callback, options]);
}
