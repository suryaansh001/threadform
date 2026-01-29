import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-neu disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] hover-press relative overflow-hidden button-glow button-ripple",
  {
    variants: {
      variant: {
        default: "neu-flat hover:neu-raised bg-primary text-primary-foreground hover:scale-[1.05] hover:shadow-2xl active:neu-pressed active:scale-[0.97] hover:brightness-110",
        destructive:
          "neu-flat hover:neu-raised bg-destructive text-white hover:scale-[1.05] hover:shadow-2xl active:neu-pressed active:scale-[0.97] focus-visible:ring-destructive/20 hover:brightness-110",
        outline:
          "clay-button hover:scale-[1.05] hover:shadow-xl active:scale-[0.97] backdrop-blur-xl bg-background/80 text-foreground hover:bg-background/95 hover:border-foreground/30",
        secondary:
          "neu-flat hover:neu-raised bg-secondary text-secondary-foreground hover:scale-[1.05] hover:shadow-2xl active:neu-pressed active:scale-[0.97] hover:brightness-105",
        ghost:
          "hover:clay-button hover:scale-[1.05] hover:shadow-lg active:scale-[0.97] hover:backdrop-blur-xl hover:bg-secondary/50",
        link: "text-primary underline-offset-4 hover:underline hover:brightness-110",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
