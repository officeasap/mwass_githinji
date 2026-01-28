import { ReactNode, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface SculpturalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  href?: string;
  external?: boolean;
}

export function SculpturalButton({
  children,
  variant = "outline",
  size = "default",
  href,
  external,
  className = "",
  disabled,
  ...props
}: SculpturalButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium uppercase tracking-widest transition-all";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm",
  };

  const variantStyles = {
    primary: `bg-foreground text-background shadow-deep rounded-[var(--radius-primary)] ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-1 hover:scale-[1.02] hover:shadow-cathedral active:translate-y-0.5 active:scale-[0.98]"
    }`,
    outline: `bg-transparent border border-foreground text-foreground shadow-elevated rounded-[var(--radius-primary)] ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-foreground hover:text-background hover:-translate-y-1 hover:scale-[1.02] hover:shadow-deep active:translate-y-0.5 active:scale-[0.98]"
    }`,
    ghost: `bg-transparent text-foreground rounded-[var(--radius-primary)] ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted hover:-translate-y-1 active:translate-y-0.5"
    }`,
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
