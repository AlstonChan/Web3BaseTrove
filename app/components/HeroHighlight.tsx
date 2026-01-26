// External Modules
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

// Internal Modules
import { cn } from "~/lib/utils";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "group relative flex h-full min-h-120 w-full items-center justify-center bg-white dark:bg-black",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-indigo-500
          group-hover:opacity-100 dark:bg-dot-thick-indigo-500"
        style={{
          WebkitMaskImage: useMotionTemplate`
          radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
              )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
                black 0%,
              transparent 100%
              )
              `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
      <div className="pointer-events-none absolute inset-0 bg-top-bottom-fade" />
    </div>
  );
};

export const Highlight = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-linear-to-r from-indigo-300 to-purple-300 px-1 pb-1
        dark:from-indigo-500 dark:to-purple-500`,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
