"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ScrollRevealProps {
  children: ReactNode
  scale?: number
  rotate?: number
}

export function ScrollReveal({ children, scale = 1, rotate = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale * 0.9, scale, scale * 0.9])
  const rotateValue = useTransform(scrollYProgress, [0, 0.5, 1], [rotate * 0.5, rotate, rotate * 0.5])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale: scaleValue, rotate: rotateValue }}
    >
      {children}
    </motion.div>
  )
}
