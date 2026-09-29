"use client"

import { motion } from "framer-motion"
import { MessageSquare, Ruler, Scissors, Sparkles, Package, Heart } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { publicAsset } from "@/lib/utils"

const steps = [
  { icon: MessageSquare, title: "Consultation", duration: "30-60 mins", description: "We discuss your vision, preferences, and requirements." },
  { icon: Ruler, title: "Measurement", duration: "20-30 mins", description: "Precise measurements for a perfect fit." },
  { icon: Scissors, title: "Fabric Selection", duration: "30-45 mins", description: "Choose from our curated premium fabrics." },
  { icon: Sparkles, title: "Design Finalization", duration: "1-2 days", description: "Sketches and mockups based on your choices." },
  { icon: Heart, title: "Craftsmanship", duration: "7-14 days", description: "Artisans bring your design to life." },
  { icon: Package, title: "Fitting & Delivery", duration: "1-2 hours", description: "Final fitting and minor adjustments if needed." },
]

export default function CustomDesignPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${publicAsset("/images/model-2.jpg")}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-background" />
        <div className="relative z-10 container px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-white/80 text-xs tracking-[0.2em] uppercase">
              Bespoke Experience
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white mt-4 mb-6">
              Custom Design <span className="italic">Process</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              From concept to creation – your vision, crafted to perfection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary via-secondary to-transparent" />

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <FadeIn key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Icon */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center shrink-0 shadow-lg md:ml-auto md:mr-auto">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className={`flex-1 pt-1 ${index % 2 === 0 ? 'md:text-right md:pr-12 md:ml-0' : 'md:pl-12 md:mr-auto'}`}>
                        <div className="inline-block">
                          <span className="text-secondary text-xs tracking-widest uppercase">
                            Step {index + 1} — {step.duration}
                          </span>
                          <h3 className="font-serif text-2xl font-medium mt-2 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Empty space for opposite side */}
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
              Ready to Create Something <span className="italic">Beautiful</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Book your consultation today and let&apos;s bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex px-8 py-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white text-sm font-medium tracking-wide"
              >
                Book Consultation
              </a>
              <Link
                href="/shop"
                className="inline-flex px-8 py-4 border border-border text-sm font-medium tracking-wide hover:border-secondary transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
