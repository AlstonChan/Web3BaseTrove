import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "~/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background
        data-[state=active]:text-foreground hover:text-foreground inline-flex items-center
        justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden
        disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-xs`,
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        `ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:outline-hidden`,
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
