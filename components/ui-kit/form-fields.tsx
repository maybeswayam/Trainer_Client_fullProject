"use client"

import { cn } from "@/lib/utils"
import type React from "react"

export function FieldLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label
      className={cn(
        "font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground block mb-1.5",
        className
      )}
    >
      {children}
    </label>
  )
}

export const inputClass =
  "w-full bg-surface-2 border border-border rounded-md px-3 py-2.5 text-[13.5px] font-mono-ui placeholder:text-faint focus:outline-none focus:border-primary focus:bg-surface transition-colors"

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClass, "appearance-none cursor-pointer", props.className)} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(inputClass, "min-h-[88px] resize-y", props.className)}
    />
  )
}

export function PrimaryButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-[13px] px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center gap-2 border border-border-strong text-foreground font-medium text-[13px] px-4 py-2.5 rounded-md hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  )
}
