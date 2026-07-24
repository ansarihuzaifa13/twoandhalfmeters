"use client"

import Link from "next/link"
import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { collectionTabs, products, trustPoints } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("All")
  const filteredProducts =
    activeTab === "All" ? products : products.filter((product) => product.category === activeTab || product.badge === activeTab)

  return (
    <div>
      <section className=" py-12 text-center md:py-16">
              <div className="h-4 bg-background"></div>

        <div className="container px-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Collection Page</p>
          <h1 className="mt-3 font-serif text-5xl text-primary md:text-6xl">Mukaish Edit</h1>
        </div>
      </section>
      <div className="h-2 bg-background"></div>

      <section className="sticky top-[7rem] z-30 bg-background/95 backdrop-blur">
        <div className="h-10 bg-background"></div>

        <div className="container px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="flex w-full gap-4 overflow-x-auto md:grid md:grid-cols-5 md:gap-6 lg:gap-10">
            {collectionTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "min-w-[150px] border-b px-5 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition-colors md:min-w-0 md:px-4 lg:px-6 lg:py-5",
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="h-10 bg-background"></div>

      <section className="py-10 md:py-14">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.slug} className="group border-b border-border pb-5">
                <Link href={`/shop/${product.slug}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <div className="image-fill h-full transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${product.image})` }} />
                    <span className="absolute top-1 left-1 flex h-10 w-20 flex-col items-center justify-center bg-primary px-4 py-3 text-center text-white">
                      {product.badge.split(" ").map((word) => (
                        <span
                          key={word}
                          className="text-[10px] font-semibold uppercase tracking-[0.18em] leading-none"
                        >
                          {word}
                        </span>
                      ))}
                    </span>
                  </div>
                </Link>
                <div className="pt-4">
                  <h2 className="font-serif text-2xl text-primary">{product.name}</h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{product.collection}</p>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{product.short}</p>
                  <Link
                    href={`/enquire/${product.slug}`}
                    className="group mt-4 inline-flex flex-col items-start"
                  >
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                      Enquire on WhatsApp
                      <MessageCircle className="h-4 w-4" />
                    </span>

                    <span className="mt-2 h-px w-full bg-primary transition-all duration-300 group-hover:w-0" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="h-10 bg-background"></div>

      <div className="h-10 bg-background"></div>

      <div className="container grid px-4 sm:grid-cols-2 lg:grid-cols-4">

        {trustPoints.map((point) => (
          <div
            key={point.title}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <point.icon className="mb-6 h-6 w-6 text-primary" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {point.title}
            </p>
            <p className="mt-4 mb-6 text-sm leading-7 text-muted-foreground">
              {point.text}
            </p>
            <p className="text-sm leading-7 text-muted-foreground/80">
              {point.subText}
            </p>
          </div>

        ))}
      </div>
      <div className="h-10 bg-background"></div>

    </div>
  )
}
