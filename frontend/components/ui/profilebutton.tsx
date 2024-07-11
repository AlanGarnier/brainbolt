import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-green-600 hover:text-green-700", // Utilisation de la même couleur que la bordure
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary-purple bg-primary-black text-primary-purple hover:bg-primary-purple",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        white: "border-2 border-primary-black dark:border-white dark:hover:bg-white dark:hover:text-primary-black text-primary-black dark:text-white hover:text-accent-foreground",
        grey: "text-primary-black dark:text-[#BBBBBF]",
        link: "text-primary underline-offset-4 hover:underline",
        navigation: "flex items-center justify-center space-x-2 bg-white text-primary-black text-base disabled:cursor-not-allowed disabled:opacity-50 shado-md",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 py-10",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        custom: "h-14 px-5 py-2.5", // Ajouté pour le style personnalisé
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

const ProfileButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "box-border flex flex-row justify-center items-center px-5 py-2.5 gap-2.5 w-48 h-14 border-2 border-green-600 rounded-md", // Ajouté pour le style personnalisé
          "font-family: 'Jost', sans-serif; font-style: normal; font-weight: 500; font-size: 24px; line-height: 35px; text-align: center;", // Ajouté pour le style de texte
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ProfileButton.displayName = "Button";

export { ProfileButton, buttonVariants };
