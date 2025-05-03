// Button component (shadcn/ui, production-ready)
import React from "react";
import { cn } from "../../lib/utils";

/**
 * Button component using shadcn/ui conventions.
 * @param {object} props
 * @param {string} [props.variant] - Button style variant
 * @param {string} [props.size] - Button size
 * @param {string} [props.className] - Additional class names
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - Other button props
 */
export function Button({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" && "bg-zinc-900 text-white hover:bg-zinc-800",
        variant === "outline" &&
          "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100",
        size === "sm" && "h-8 px-3 text-sm",
        size === "md" && "h-10 px-4 text-base",
        size === "lg" && "h-12 px-6 text-lg",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
