import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "teal" | "navy" | "green" | "purple";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-coded-navy text-white hover:bg-coded-navy/90",
  secondary: "bg-coded-surface text-coded-text hover:bg-coded-bg border border-coded-border",
  ghost: "text-coded-muted hover:text-coded-text hover:bg-coded-bg",
  outline: "border border-coded-border text-coded-text hover:bg-coded-bg",
  teal: "bg-coded-teal text-white hover:bg-coded-teal/90",
  navy: "bg-coded-navy text-white hover:bg-coded-navy/90",
  green: "bg-coded-green text-white hover:bg-coded-green/90",
  purple: "bg-coded-purple text-white hover:bg-coded-purple/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium rounded-[8px] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
