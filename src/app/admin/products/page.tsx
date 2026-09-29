"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { supabase } from "@/lib/supabase"

type Product = { id: string; name: string; slug: string; price: number | null; created_at?: string }
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState("")
  useEffect(() => { supabase.from("products").select("id, name, slug, price, created_at").order("created_at", { ascending: false }).then(({ data, error }) => { if (error) setError(error.message); else setProducts((data ?? []) as Product[]) }) }, [])
  return <AdminShell><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Catalogue</p><h1 className="mt-2 text-4xl text-primary sm:text-5xl">Products</h1></div><Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground"><Plus className="h-4 w-4" /> Add product</Link></div>{error ? <p className="mt-8 border-l-2 border-error bg-red-50 p-4 text-sm text-error">Could not load products: {error}</p> : <div className="mt-8 overflow-hidden border border-border bg-card"><div className="hidden grid-cols-[1.5fr_1fr_120px_130px] gap-4 border-b border-border bg-muted px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground sm:grid"><span>Product</span><span>Slug</span><span>Catalogue</span><span>Price</span></div>{products === null ? <p className="p-5 text-sm text-muted-foreground">Loading products…</p> : products.length === 0 ? <div className="p-8 text-center"><p className="font-serif text-2xl text-primary">Your catalogue is ready.</p><p className="mt-2 text-sm text-muted-foreground">Add your first piece to see it here.</p></div> : products.map((product) => <article key={product.id} className="grid gap-2 border-b border-border px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_120px_130px] sm:items-center sm:gap-4"><div><p className="font-serif text-xl text-primary">{product.name}</p><p className="sm:hidden text-xs text-muted-foreground">{product.slug}</p></div><p className="hidden text-sm text-muted-foreground sm:block">{product.slug}</p><span className="text-xs text-muted-foreground">Product</span><span className="text-sm text-primary">{product.price == null ? "Price on request" : `₹${product.price.toLocaleString("en-IN")}`}</span></article>)}</div>}</AdminShell>
}
