"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ImageIcon, Package, Plus, Star } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { supabase } from "@/lib/supabase"

type Counts = { products: number; images: number }
export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null)
  useEffect(() => { Promise.all([supabase.from("products").select("id", { count: "exact" }), supabase.from("product_images").select("id", { count: "exact" })]).then(([products, images]) => setCounts({ products: products.count ?? 0, images: images.count ?? 0 })) }, [])
  const cards = [{ label: "Products", value: counts?.products, icon: Package }, { label: "New catalogue", value: counts?.products, icon: Star }, { label: "Product images", value: counts?.images, icon: ImageIcon }]
  return <AdminShell><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Overview</p><h1 className="mt-2 text-4xl text-primary sm:text-5xl">Dashboard</h1></div><Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground"><Plus className="h-4 w-4" /> Add product</Link></div><section className="mt-9 grid gap-4 sm:grid-cols-3">{cards.map(({ label, value, icon: Icon }) => <article key={label} className="border border-border bg-card p-5"><Icon className="h-5 w-5 text-primary" /><p className="mt-8 text-3xl font-serif text-primary">{value ?? "—"}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p></article>)}</section><section className="mt-8 border border-border bg-card p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Next step</p><h2 className="mt-2 text-3xl text-primary">Add your first product</h2><p className="mt-3 max-w-2xl text-sm text-muted-foreground">Create the product, select its category and collection, then upload its images directly from your computer.</p></section></AdminShell>
}
