"use client";

import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion, useInView } from "motion/react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} });
export const useMotionPreference = () => useContext(MotionContext);
const subscribeReduced = (notify: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const reducedSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverReducedSnapshot = () => false;

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribeReduced, reducedSnapshot, serverReducedSnapshot);
  const [manualPause, setManualPause] = useState(false);
  const paused = Boolean(reduced) || manualPause;
  return (
    <MotionContext.Provider value={{ paused, reduced, toggle: () => setManualPause((p) => !p) }}>
      <div data-motion={paused ? "paused" : "running"}>{children}</div>
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const { paused, reduced, toggle } = useMotionPreference();
  return (
    <button
      className="motion-toggle"
      onClick={toggle}
      disabled={Boolean(reduced)}
      aria-pressed={paused}
    >
      {paused ? <Play size={12} /> : <Pause size={12} />}
      {reduced ? "Reduced motion" : paused ? "Play motion" : "Pause motion"}
    </button>
  );
}

// Adapted from ddoemonn's Text Reveal, retrieved via 21st.dev (demo 23571).
// SSR text stays visible. Decorative duplicates are hidden from screen readers.
export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { paused } = useMotionPreference();
  return (
    <span className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index) => (
          <Fragment key={index}>
            <span className="word-wrap">
              <motion.span
                initial={false}
                animate={
                  inView && !paused ? { y: [24, 0], opacity: [0.25, 1] } : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.7, delay: index * 0.065, ease: [0.23, 1, 0.32, 1] }}
              >
                {word}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { paused } = useMotionPreference();
  useEffect(() => {
    const element = ref.current;
    if (!element || paused) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [paused]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
