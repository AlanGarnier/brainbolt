import { Variants } from "framer-motion";

// in this file, we store the animations 

interface textContainerProps extends Variants{
    hidden: {
        opacity: number;
    },
    show: (i: number) => {
        opacity: number;
        transition: {
            staggerChildren: number;
            delayChildren: number;
        };
    }
}

interface typingTextProps extends Variants{
    hidden: {
        opacity: number;
        y: number;
    },
    show: {
        opacity: number;
        y: number;
        transition: {
            type: string;
            ease: string;
        }
    }
}



export const textContainer: textContainerProps = {
    hidden: {
        opacity: 0,
      },
      show: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
      }),
}

export const typingText: typingTextProps = {
    hidden: {
        opacity: 0,
        y: 20,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'tween',
          ease: 'easeIn',
        },
    },
}

export const staggerContainer = (staggerChildren: number, delayChildren: number) => ({
    hidden: {},
    show: {
        transition: {
        staggerChildren,
        delayChildren,
        },
    },
});

export const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  });