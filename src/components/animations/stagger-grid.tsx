"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StaggerGridProps {
  children: ReactNode[]
  delay?: number
  staggerDelay?: number
  duration?: number
}

export function StaggerGrid({
  children,
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.5,
}: StaggerGridProps) {
  return (
    <>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  )
}
