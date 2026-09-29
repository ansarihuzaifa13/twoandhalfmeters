"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { productImage, type StorefrontProduct } from "@/components/storefront/product-grid"
import { brand } from "@/lib/site-data"
import { supabase } from "@/lib/supabase"

export default function EnquireProductClient() {
  const slug = useSearchParams().get("slug"); const [product, setProduct] = useState<StorefrontProduct | null>(null)
  useEffect(() => { if (slug) supabase.from("products").select("id, name, slug, short_description, description, price, fabric, product_images(image_url, display_order)").eq("slug", slug).single().then(({ data }) => setProduct(data as StorefrontProduct | null)) }, [slug])
  if (!product) return <p className="container px-4 py-20 text-center text-sm text-muted-foreground">Loading product…</p>
  const image = productImage(product); const message = encodeURIComponent(`Hi, I am interested in ${product.name}. Please share more details.`); const whatsappHref = `https://wa.me/${brand.whatsapp.replace("+", "")}?text=${message}`
  return <section className="container grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8"><div className="image-fill min-h-[520px] bg-muted" style={image ? { backgroundImage: `url(${image})` } : undefined} /><div className="flex items-center"><div className="w-full max-w-xl"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Enquire about</p><h1 className="mt-3 font-serif text-5xl text-primary">{product.name}</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">We will get back to you with details and options.</p><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="relative mt-8 flex h-16 w-full items-center justify-center bg-primary px-8 text-[11px] font-bold uppercase tracking-[0.14em] sm:w-96"><span className="text-white">Enquire on WhatsApp</span><MessageCircle className="absolute right-8 h-5 w-5 text-white" /></a></div></div></section>
}