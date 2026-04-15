"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flexitems-center justify-center whitespace-nowrap text-sm font-headline font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-zinc-200",
        outline:
          "border border-white/20 text-white hover:border-white",
        ghost:
          "hover:bg-white/10 text-white",
        link:
          "border-b-4 border-white pb-2 hover:text-white/50 hover:border-white/50 text-2xl md:text-4xl px-0 underline-offset-4",
      },
      size: {
        default: "px-6 py-2",
        sm: "px-4 py-1.5 text-xs",
        lg: "px-12 py-5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
