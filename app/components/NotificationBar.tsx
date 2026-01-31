import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleX } from "lucide-react";

import { cn } from "~/lib/utils";
import { useNotification } from "~/context/NotificationContext";

interface NotificationBarProps {
  className?: string;
}

export default function NotificationBar({ className }: NotificationBarProps) {
  const { message, hideNotification } = useNotification();

  const [floatTop, setFloatTop] = useState(false);

  useEffect(() => {
    const handleOnScroll = () => {
      if (window.scrollY > 5) {
        setFloatTop(true);
        return;
      }
      if (window.scrollY <= 5) {
        setFloatTop(false);
        return;
      }
    };

    handleOnScroll();

    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.aside
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0, transition: { duration: 0.5 } }}
          transition={{ duration: 1.5 }}
          className={cn(
            `bg-destructive text-destructive-foreground fixed top-0 left-0 z-9999 flex w-full
            items-center px-3 py-2 transition-[width,padding,top,left,border-radius] duration-1000`,
            floatTop
              ? `fixed-fill top-1.5 mx-auto rounded-xl min-[400px]:left-4 xl:w-300
                dark:border-white/20`
              : "",
            className,
          )}
        >
          {message}
          <button
            onClick={hideNotification}
            className="ml-auto transition-transform hover:scale-105"
          >
            <CircleX size={20} />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
