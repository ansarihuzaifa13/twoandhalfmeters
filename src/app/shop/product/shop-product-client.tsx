"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { productImage, type StorefrontProduct } from "@/components/storefront/product-grid"
import { supabase } from "@/lib/supabase"

export default function ShopProductClient() {
  const slug = useSearchParams().get("slug")
  const [product, setProduct] = useState<StorefrontProduct | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { if (!slug) return; supabase.from("products").select("id, name, slug, short_description, description, price, fabric, product_images(image_url, display_order)").eq("slug", slug).single().then(({ data }) => { setProduct(data as StorefrontProduct | null); setLoading(false) }) }, [slug])
  if (!slug) return <div className="container px-4 py-20 text-center"><h1 className="font-serif text-4xl text-primary">Product not found</h1><Link className="mt-5 inline-block text-sm text-primary underline" href="/shop">Return to collection</Link></div>
  if (loading) return <p className="container px-4 py-20 text-center text-sm text-muted-foreground">Loading product…</p>
  if (!product) return <div className="container px-4 py-20 text-center"><h1 className="font-serif text-4xl text-primary">Product not found</h1><Link className="mt-5 inline-block text-sm text-primary underline" href="/shop">Return to collection</Link></div>
  const images = [...(product.product_images ?? [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)); const heroImage = productImage(product)
  return <section className="container grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div className="grid grid-cols-[72px_1fr] gap-4"><div className="grid content-start gap-3">{images.map((image) => <div key={image.image_url} className="image-fill aspect-[3/4] border border-border" style={{ backgroundImage: `url(${image.image_url})` }} />)}</div><div className="image-fill min-h-[520px] bg-muted" style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined} /></div><div className="lg:pl-4"><p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Collection / {product.name}</p><h1 className="font-serif text-5xl text-primary">{product.name}</h1><p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{product.price == null ? "Price on request" : `₹${product.price.toLocaleString("en-IN")}`}</p><p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{product.description || product.short_description}</p><div className="mt-8 text-sm"><span className="mr-5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Fabric</span>{product.fabric || "—"}</div><Link href={`/enquire/product?slug=${encodeURIComponent(product.slug)}`} className="relative mt-10 flex h-14 w-full items-center justify-center bg-primary px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:w-80">Enquire on WhatsApp <MessageCircle className="absolute right-8 h-4 w-4" /></Link></div></section>
}