import * as React from "react";

import { cn } from "~/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        `border-input bg-background ring-offset-background placeholder:text-muted-foreground
        focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
        file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed
        disabled:opacity-50`,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
