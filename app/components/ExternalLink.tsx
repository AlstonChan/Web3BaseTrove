import type React from "react";
import { cn } from "~/lib/utils";

interface ExternalLinkProps extends React.ComponentProps<"a"> {
  href: string;
  noDefaultStyles?: boolean;
}

export default function ExternalLink({
  href,
  children,
  className,
  target = "_blank",
  rel = "noreferrer noopener",
  referrerPolicy = "no-referrer",
  noDefaultStyles = false,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      referrerPolicy={referrerPolicy}
      className={cn(
        !noDefaultStyles &&
          `text-primary hover:text-primary/80 font-medium underline underline-offset-4
          transition-colors`,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
