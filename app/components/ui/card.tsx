import * as React from "react";

import { cn } from "~/lib/utils";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn("bg-card text-card-foreground rounded-lg border shadow-xs", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

const CardTitle = ({ className, children, ...props }: React.ComponentProps<"h3">) => (
  <h3 className={cn("text-2xl leading-none font-semibold tracking-tight", className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
