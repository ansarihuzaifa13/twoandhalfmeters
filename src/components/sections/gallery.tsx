"use client"

import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"

const galleryItems = [
  { src: "/images/model-1.jpg", alt: "Handcrafted attire", span: "row-span-2" },
  { src: "/images/model-2.jpg", alt: "Artisanal jewelry", span: "row-span-1" },
  { src: "/images/model-3.jpg", alt: "Premium fabrics", span: "row-span-1" },
  { src: "/images/model-4.jpg", alt: "Custom tailoring", span: "row-span-2" },
]

export function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-secondary text-xs tracking-[0.2em] uppercase">
              Our Craftsmanship
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
              Handmade with <span className="italic">Love</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Each piece is meticulously crafted by skilled artisans, combining traditional techniques with modern design.
            </p>
          </div>
        </FadeIn>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
          {galleryItems.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`${item.span} relative overflow-hidden rounded-lg group cursor-pointer`}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-serif text-lg">{item.alt}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
