"use client"

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ImagePlus, Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { supabase } from "@/lib/supabase"

type Option = { id: string; name: string }
const initialForm = { name: "", slug: "", categoryId: "", collectionId: "", shortDescription: "", description: "", price: "", fabric: "" }

function makeSlug(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }
function safeFileName(name: string) { return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-") }

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [files, setFiles] = useState<File[]>([])
  const [categories, setCategories] = useState<Option[]>([])
  const [collections, setCollections] = useState<Option[]>([])
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const previews = useMemo(() => files.map((file) => ({ file, url: URL.createObjectURL(file) })), [files])
  useEffect(() => () => previews.forEach(({ url }) => URL.revokeObjectURL(url)), [previews])
  useEffect(() => { Promise.all([supabase.from("categories").select("id, name").order("name"), supabase.from("collections").select("id, name").order("name")]).then(([categoryResult, collectionResult]) => { setCategories((categoryResult.data ?? []) as Option[]); setCollections((collectionResult.data ?? []) as Option[]); setLoadingOptions(false) }) }, [])
  function update(key: keyof typeof form, value: string | boolean) { setForm((current) => ({ ...current, [key]: value })) }
  function selectFiles(event: ChangeEvent<HTMLInputElement>) { setFiles(Array.from(event.target.files ?? []).slice(0, 8)) }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("")
    if (!files.length) { setMessage("Please select at least one product image."); return }
    setSubmitting(true)
    const { data: product, error: productError } = await supabase.from("products").insert({ name: form.name, slug: form.slug, category_id: form.categoryId || null, collection_id: form.collectionId || null, short_description: form.shortDescription || null, description: form.description || null, price: form.price ? Number(form.price) : null, fabric: form.fabric || null }).select("id").single()
    if (productError || !product) { setMessage(productError?.message ?? "Product could not be created."); setSubmitting(false); return }
    const imageRows: { product_id: string; image_url: string; display_order: number }[] = []
    for (const [index, file] of files.entries()) {
      const path = `${product.id}/${Date.now()}-${index + 1}-${safeFileName(file.name)}`
      const { error: uploadError } = await supabase.storage.from("products").upload(path, file, { upsert: false, contentType: file.type })
      if (uploadError) { setMessage(`Product created, but image upload failed: ${uploadError.message}`); setSubmitting(false); return }
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(path)
      imageRows.push({ product_id: product.id, image_url: urlData.publicUrl, display_order: index + 1 })
    }
    const { error: imageError } = await supabase.from("product_images").insert(imageRows)
    if (imageError) { setMessage(`Product and files were uploaded, but image records could not be saved: ${imageError.message}`); setSubmitting(false); return }
    router.replace("/admin/products")
  }
  const field = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
  return <AdminShell><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Catalogue</p><h1 className="mt-2 text-4xl text-primary sm:text-5xl">Add product</h1><p className="mt-3 max-w-2xl text-sm text-muted-foreground">Images are uploaded to Supabase Storage when you save this product.</p></div><form onSubmit={handleSubmit} className="mt-8 max-w-4xl space-y-8"><section className="grid gap-5 border border-border bg-card p-5 sm:grid-cols-2 sm:p-7"><label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Product name<input required value={form.name} onChange={(event) => { update("name", event.target.value); update("slug", makeSlug(event.target.value)) }} className={field} /></label><label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Slug<input required value={form.slug} onChange={(event) => update("slug", makeSlug(event.target.value))} className={field} /></label><label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Category<select value={form.categoryId} onChange={(event) => update("categoryId", event.target.value)} className={field} disabled={loadingOptions}><option value="">Select category</option>{categories.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label><label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Collection<select value={form.collectionId} onChange={(event) => update("collectionId", event.target.value)} className={field} disabled={loadingOptions}><option value="">Select collection</option>{collections.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label><label className="sm:col-span-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Short description<textarea value={form.shortDescription} onChange={(event) => update("shortDescription", event.target.value)} rows={2} className={field} /></label><label className="sm:col-span-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">Description<textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows={5} className={field} /></label></section><section className="grid gap-5 border border-border bg-card p-5 sm:grid-cols-2 sm:p-7"><label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Price (₹)<input type="number" min="0" value={form.price} onChange={(event) => update("price", event.target.value)} className={field} /></label><label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Fabric<input value={form.fabric} onChange={(event) => update("fabric", event.target.value)} className={field} /></label></section><section className="border border-border bg-card p-5 sm:p-7"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Product images</p><p className="mt-1 text-sm text-muted-foreground">JPG, PNG or WebP. Choose up to 8 images.</p></div><label className="inline-flex cursor-pointer items-center gap-2 border border-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary hover:text-primary-foreground"><ImagePlus className="h-4 w-4" /> Select images<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={selectFiles} /></label></div>{previews.length > 0 && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{previews.map(({ file, url }, index) => <figure key={`${file.name}-${index}`} className="relative aspect-square overflow-hidden bg-muted"><Image src={url} alt="Selected product preview" fill unoptimized sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" /><button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="absolute right-2 top-2 grid h-8 w-8 place-items-center bg-card text-primary shadow"><Trash2 className="h-4 w-4" /></button></figure>)}</div>}</section>{message && <p role="alert" className="border-l-2 border-error bg-red-50 p-4 text-sm text-error">{message}</p>}<button disabled={submitting} className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60">{submitting ? "Saving product…" : "Save product"}</button></form></AdminShell>
}
