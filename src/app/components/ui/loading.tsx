"use client";

import { cn } from "../../lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  className,
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingProps {
  children?: React.ReactNode;
  className?: string;
}

export function Loading({ children, className }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 space-y-4",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <span className="animate-dog-walk text-3xl">🐕</span>
        <LoadingSpinner size="lg" />
        <span className="animate-dog-walk text-3xl">🐱</span>
      </div>
      {children && <p className="text-muted-foreground">{children}</p>}
    </div>
  );
}
