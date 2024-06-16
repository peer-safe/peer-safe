import React from "react";
import { cn } from "~/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
  color?: string;
}

export function Spinner({
  size,
  show,
  children,
  className,
  color,
}: SpinnerContentProps) {
  return (
    <span className={cn(spinnerVariants({ show }), className)}>
      <Loader2
        className={cn(loaderVariants({ size }), className)}
        color={color}
      />
      {children}
    </span>
  );
}
