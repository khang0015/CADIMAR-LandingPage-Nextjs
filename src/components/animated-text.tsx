"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedText({ children, className = "", delay = 0, direction = "up" }: AnimatedTextProps) {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ text, className = "", delay = 0, speed = 0.05 }: TypewriterTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + index * speed,
            duration: 0.1
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function CountUp({ end, duration = 2, delay = 0, className = "", suffix = "", prefix = "" }: CountUpProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay,
          duration,
          ease: "easeOut"
        }}
        onUpdate={(latest) => {
          if (typeof latest.opacity === 'number') {
            const currentValue = Math.floor(end * latest.opacity);
            const element = document.querySelector(`[data-countup="${end}"]`);
            if (element) {
              element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;
            }
          }
        }}
      >
        <span data-countup={end}>{prefix}0{suffix}</span>
      </motion.span>
    </motion.span>
  );
} 