import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductGrid } from "@/components/storefront/product-grid"
import { Reviews } from "@/components/sections/reviews"
import { brand, journalPosts, story, trustPoints } from "@/lib/site-data"

export default function HomePage() {
  return (
    <>
      <section className="relative h-[100vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background.jpeg')" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                Timeless Mukaish
              </p>

              <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-8xl">
                Handcrafted
                <br />
                Elegance.
              </h1>

              <p className="mt-10 max-w-lg text-lg leading-9 text-white/85">
                Intricate Mukaish detailing. Thoughtful craftsmanship.
                Pieces designed to become part of your most cherished moments.
              </p>

              <Link
                href="/shop"
                className="mt-28 inline-flex h-14 min-w-[280px] items-center justify-center gap-4 border border-white bg-white px-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary transition-all duration-300 hover:bg-transparent hover:text-white"              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="h-10 bg-background"></div>

      <section className="bg-background">
        <div className="container grid gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="border-border py-12 lg:py-16 text-center sm:border-r">
              <div className="mb-5 flex justify-center">
                <point.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                {point.title}
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-sm leading-7 text-muted-foreground">
                  {point.text}
                </p>

                <p className="text-sm leading-7 text-muted-foreground/80">
                  {point.subText}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>
      <div className="h-8 bg-background"></div>

      <section className="py-16 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center sm:mb-24 md:mb-28">
            <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-primary">Mukaish Edit</p>
            <h2 className="mt-2 font-serif text-4xl text-primary md:text-5xl">
              THE COLLECTION
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Delicate handwork. Subtle shimmer. Effortless grace.
            </p>
            <Link
              href="/shop"
              className="group mt-6 mb-10 inline-flex flex-col items-center text-[11px] font-bold uppercase tracking-[0.14em] text-primary sm:mb-12 md:mb-14"
            >
              VIEW ALL COLLECTIONS
              <span className="mt-1 h-px w-full bg-primary transition-all duration-300 group-hover:w-0" />
            </Link>
            <div className="h-8 bg-background"></div>

          </div>
          <div className="mt-12"><ProductGrid limit={4} /></div>
        </div>
      </section>
      <div className="h-8 bg-background"></div>

      <section className=" bg-card py-16 lg:py-20 mb-32">
        <div className="h-8 bg-background"></div>

        <div className="container">
          <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="h-[500px]  overflow-hidden shadow-sm"
              style={{
                backgroundImage: "url('/images/model-3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                {story.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-5xl leading-tight text-primary">
                {story.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {story.body[0]}
              </p>
              <Link
                href="/about"
                className="group mt-10 inline-flex h-14 min-w-[240px] items-center justify-center gap-3 bg-primary px-10 text-[11px] font-semibold uppercase tracking-[0.18em] !text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <span className="!text-white">
                  Learn Our Story
                </span>

                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="h-8 bg-background"></div>

      <section className="pb-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mt-24 text-center">
            <p className="text-[18px] font-bold uppercase tracking-[0.18em] text-primary">
              Follow our journey
            </p>

            <p className="mt-2 text-md text-muted-foreground">
              {brand.instagram}
            </p>
            <div className="h-8 bg-background"></div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {journalPosts.map((post) => (
                <Link
                  href="/journal"
                  key={post.slug}
                  className="block aspect-square overflow-hidden"
                >
                  <div
                    className="image-fill h-full transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Reviews />
    </>
  )
}
