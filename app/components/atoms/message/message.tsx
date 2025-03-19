import type { HTMLAttributes } from 'react';
import "./message.css";

interface MessageProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "success" | "error" | "info";
  className?: string;
  children: React.ReactNode;
}

export function Message({
  children,
  variant = "info",
  className = "",
  ...props
}: MessageProps) {
  const messageClasses = [
    "message",
    `${variant}-message`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={messageClasses} {...props}>
      {children}
    </p>
  );
}
