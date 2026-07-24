"use client"

import { FadeIn } from "@/components/animations/fade-in"

// Custom SVG icons for better alignment
const icons = {
  sparkles: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  gem: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  ruler: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.621.162-1.205.444-1.713m15 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128" />
    </svg>
  ),
  history: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const features = [
  {
    icon: icons.sparkles,
    title: "Handcrafted Excellence",
    description: "Every piece meticulously crafted by skilled artisans with years of expertise.",
  },
  {
    icon: icons.gem,
    title: "Premium Materials",
    description: "We source only the finest fabrics and materials for lasting quality.",
  },
  {
    icon: icons.ruler,
    title: "Custom Tailoring",
    description: "Perfect fit guaranteed with our personalized tailoring service.",
  },
  {
    icon: icons.history,
    title: "Heritage Craftsmanship",
    description: "Traditional techniques meeting modern design sensibilities.",
  },
]

export function Features() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-secondary text-xs tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 mb-6">
              The Art of <span className="italic">Craftsmanship</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Every piece we create is a testament to our commitment to quality, tradition, and timeless elegance.
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group text-center p-8 border border-border hover:border-secondary transition-all duration-500 h-full">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
