"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { MessageCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export type StorefrontProduct = {
  id: string
  name: string
  slug: string
  short_description: string | null
  description: string | null
  price: number | null
  fabric: string | null
  product_images?: { image_url: string; display_order: number | null }[] | null
}

export function productImage(product: StorefrontProduct) {
  return [...(product.product_images ?? [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))[0]?.image_url
}

function ProductCard({ product }: { product: StorefrontProduct }) {
  const image = productImage(product)
  return <article className="group border-b border-border pb-5"><Link href={`/shop/product?slug=${encodeURIComponent(product.slug)}`}><div className="relative aspect-[4/5] overflow-hidden bg-muted">{image ? <div className="image-fill h-full transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} /> : <div className="grid h-full place-items-center text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Image coming soon</div>}</div></Link><div className="pt-4"><h2 className="font-serif text-2xl text-primary">{product.name}</h2><p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{product.short_description || product.description || "Handcrafted with care."}</p><p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">{product.price == null ? "Price on request" : `₹${product.price.toLocaleString("en-IN")}`}</p><Link href={`/enquire/product?slug=${encodeURIComponent(product.slug)}`} className="group mt-4 inline-flex flex-col items-start"><span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Enquire on WhatsApp <MessageCircle className="h-4 w-4" /></span><span className="mt-2 h-px w-full bg-primary transition-all duration-300 group-hover:w-0" /></Link></div></article>
}

export function ProductGrid({ limit }: { limit?: number }) {
  const [products, setProducts] = useState<StorefrontProduct[] | null>(null)
  const [error, setError] = useState("")
  useEffect(() => { let active = true; supabase.from("products").select("id, name, slug, short_description, description, price, fabric, product_images(image_url, display_order)").order("created_at", { ascending: false }).then(({ data, error: queryError }) => { if (!active) return; if (queryError) setError(queryError.message); else setProducts((data ?? []) as StorefrontProduct[]) }); return () => { active = false } }, [])
  const visibleProducts = useMemo(() => { const allProducts = products ?? []; return limit ? allProducts.slice(0, limit) : allProducts }, [limit, products])
  if (error) return <p className="border-l-2 border-error bg-red-50 p-4 text-sm text-error">Our collection could not be loaded. Please try again shortly.</p>
  if (products === null) return <p className="py-12 text-center text-sm text-muted-foreground">Loading the collection…</p>
  if (!visibleProducts.length) return <p className="py-12 text-center text-sm text-muted-foreground">Our new collection is arriving soon.</p>
  return <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
