"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden bg-primary">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[var(--gradient-end)] to-[var(--gradient-start)] rounded-full blur-3xl opacity-10" />

            {/* Content */}
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center shrink-0">
                  <span className="text-white font-serif font-semibold text-xl">T</span>
                </div>
              </motion.div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6">
                Start Your Custom <span className="italic">Journey</span>
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
                Ready to create something extraordinary? Let&apos;s bring your vision to life with our bespoke tailoring service.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/custom-design"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-300"
                >
                  View Process
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
