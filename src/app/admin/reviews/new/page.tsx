"use client"

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ImagePlus, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"
import { supabase } from "@/lib/supabase"

const imageTypes = ["image/jpeg", "image/png", "image/webp"]
const maxImageSize = 8 * 1024 * 1024

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-")
}

export default function NewReviewPage() {
  const router = useRouter()
  const [customerName, setCustomerName] = useState("")
  const [city, setCity] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState("5")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoError, setPhotoError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const preview = useMemo(
    () => (photo ? URL.createObjectURL(photo) : ""),
    [photo],
  )

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setPhotoError("")
    if (!file) {
      setPhoto(null)
      return
    }
    if (!imageTypes.includes(file.type)) {
      setPhoto(null)
      setPhotoError("Choose a JPG, PNG, or WebP image.")
      event.target.value = ""
      return
    }
    if (file.size > maxImageSize) {
      setPhoto(null)
      setPhotoError("Choose an image smaller than 8 MB.")
      event.target.value = ""
      return
    }
    setPhoto(file)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")
    if (!photo) {
      setMessage("Please select a customer photo.")
      return
    }

    setSubmitting(true)
    let uploadedPath: string | null = null

    try {
      const path = `reviews/${Date.now()}-${crypto.randomUUID()}-${safeFileName(photo.name)}`
      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(path, photo, {
          upsert: false,
          contentType: photo.type,
        })

      if (uploadError) {
        setMessage(`Customer photo could not be uploaded: ${uploadError.message}`)
        return
      }

      uploadedPath = path
      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(path)
      const { error: reviewError } = await supabase.from("reviews").insert({
        customer_name: customerName.trim(),
        city: city.trim() || null,
        review: review.trim(),
        rating: Number(rating),
        customer_image: urlData.publicUrl,
      })

      if (reviewError) {
        const { error: cleanupError } = await supabase.storage
          .from("products")
          .remove([path])
        const cleanupMessage = cleanupError
          ? ` The uploaded photo could not be removed: ${cleanupError.message}`
          : ""
        setMessage(
          `Review could not be saved: ${reviewError.message}.${cleanupMessage}`,
        )
        return
      }

      router.replace("/admin")
    } catch (error) {
      let cleanupMessage = ""
      if (uploadedPath) {
        const { error: cleanupError } = await supabase.storage
          .from("products")
          .remove([uploadedPath])
        if (cleanupError) {
          cleanupMessage = ` The uploaded photo could not be removed: ${cleanupError.message}`
        }
      }
      const detail =
        error instanceof Error ? error.message : "An unexpected error occurred."
      setMessage(`Review could not be saved: ${detail}${cleanupMessage}`)
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"

  return (
    <AdminShell>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Customer stories
        </p>
        <h1 className="mt-2 text-4xl text-primary sm:text-5xl">Add review</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Share a buyer’s review and photo on the homepage.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-3xl space-y-6"
      >
        <section className="grid gap-5 border border-border bg-card p-5 sm:grid-cols-2 sm:p-7">
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Buyer name
            <input
              required
              maxLength={120}
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className={field}
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            City or location
            <input
              maxLength={120}
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className={field}
            />
          </label>
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            Rating
            <select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              className={field}
            >
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value} {value === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold uppercase tracking-[0.14em] text-primary sm:col-span-2">
            Review
            <textarea
              required
              maxLength={2000}
              rows={5}
              value={review}
              onChange={(event) => setReview(event.target.value)}
              className={field}
            />
          </label>
        </section>

        <section className="border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Buyer photo
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                JPG, PNG, or WebP. Maximum size 8 MB.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 border border-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary hover:bg-primary hover:text-primary-foreground">
              <ImagePlus className="h-4 w-4" />
              Select photo
              <input
                className="sr-only"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={selectPhoto}
                required={!photo}
              />
            </label>
          </div>
          {photoError && (
            <p role="alert" className="mt-4 text-sm text-error">
              {photoError}
            </p>
          )}
          {preview && (
            <div className="relative mt-5 aspect-square max-w-56 overflow-hidden bg-muted">
              <Image
                src={preview}
                alt="Selected buyer photo preview"
                fill
                unoptimized
                sizes="224px"
                className="object-cover"
              />
            </div>
          )}
        </section>

        {message && (
          <p
            role="alert"
            className="border-l-2 border-error bg-red-50 p-4 text-sm text-error"
          >
            {message}
          </p>
        )}
        <button
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
        >
          <Star className="h-4 w-4" />
          {submitting ? "Saving review…" : "Publish review"}
        </button>
      </form>
    </AdminShell>
  )
}
