import Link from "next/link"
import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { detailFacts, products } from "@/lib/site-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div>
      <section className="container grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="grid grid-cols-[72px_1fr] gap-4">
          <div className="grid content-start gap-3">
            {product.gallery.map((image) => (
              <div key={image} className="image-fill aspect-[3/4] border border-border" style={{ backgroundImage: `url(${image})` }} />
            ))}
          </div>
          <div className="image-fill min-h-[520px] bg-muted" style={{ backgroundImage: `url(${product.image})` }} />
        </div>

        <div className="lg:pl-4">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Home / {product.collection} / {product.name}
          </p>
          <div className="h-4 bg-background"></div>
          <h1 className="font-serif text-5xl text-primary">{product.title}</h1>
          <div className="h-4 bg-background"></div>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{product.priceLabel}</p>
          <div className="h-2 bg-background"></div>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">AVAILIBILITY</strong>
            </p>
            <p>{product.availability}</p>
          </div>
          <div className="h-2 bg-background"></div>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{product.description}</p>
          <div className="h-8 bg-background"></div>
          <div className="mt-8">
            {detailFacts.map((fact) => {
              const value = product[fact.key]

              return (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 py-5"
                >
                  <fact.icon className="h-4 w-4 shrink-0 text-primary" />
                  <p className="w-32 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    {fact.label}
                  </p>
                  <p className="text-sm text-foreground">
                    {value}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="h-8 bg-background"></div>
          <div className="mt-8 flex items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">
              Size
            </p>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="flex h-12 min-w-14 items-center justify-center border border-border px-5 text-sm"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="h-8 bg-background"></div>
          <Link
            href={`/enquire/${product.slug}`}
            className="relative mt-8 flex h-14 w-full items-center justify-center bg-primary px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:w-80"
          >
            <span className="text-white">
              Enquire on WhatsApp
            </span>

            <MessageCircle className="absolute right-8 h-4 w-4 text-white" />
          </Link>
        </div>
      </section>
    </div>
  )
}
