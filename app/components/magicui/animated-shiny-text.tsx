import { cn } from "~/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const AnimatedShinyText = ({ children, className, shimmerWidth = 100 }: AnimatedShinyTextProps) => {
  return (
    <p
      style={{ "--shimmer-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",

        // Shimmer effect
        `animate-shimmer bg-size-[var(--shimmer-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat
        [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]`,

        // Shimmer gradient
        "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",

        className,
      )}
    >
      {children}
    </p>
  );
};
AnimatedShinyText.displayName = "AnimatedShinyText";

export default AnimatedShinyText;
