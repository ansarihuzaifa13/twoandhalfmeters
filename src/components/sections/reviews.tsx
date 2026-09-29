"use client"

import { useEffect, useState } from "react"
import { Quote, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"

type ReviewRecord = Record<string, unknown>

function text(record: ReviewRecord, ...keys: string[]) {
  const value = keys
    .map((key) => record[key])
    .find((item) => typeof item === "string" && item.trim())
  return typeof value === "string" ? value : ""
}

function number(record: ReviewRecord, ...keys: string[]) {
  const value = keys
    .map((key) => record[key])
    .find((item) => typeof item === "number" || typeof item === "string")
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.max(1, Math.min(5, Math.round(parsed))) : 5
}

export function Reviews() {
  const [reviews, setReviews] = useState<ReviewRecord[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadReviews() {
      try {
        const { data, error: queryError } = await supabase
          .from("reviews")
          .select("*")

        if (!active) return
        if (queryError) {
          setError(true)
          return
        }

        const visible = (data ?? []).filter(
          (review: ReviewRecord) =>
            review.visible !== false && review.is_visible !== false,
        )
        setReviews(visible)
      } catch {
        if (active) setError(true)
      }
    }

    void loadReviews()

    return () => {
      active = false
    }
  }, [])

  return (
    <section
      className="bg-card py-20 text-center md:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="container flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            From our customers
          </p>
          <h2
            id="reviews-heading"
            className="mt-4 font-serif text-4xl text-primary md:text-5xl"
          >
            Worn and loved
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Thoughts shared by the people who bring our pieces into their own
            stories.
          </p>
        </div>

        {error ? (
          <p
            role="status"
            className="mx-auto mt-12 w-full max-w-2xl border border-border bg-background p-6 text-center text-sm text-muted-foreground"
          >
            Customer stories are temporarily unavailable. Please visit again
            soon.
          </p>
        ) : reviews === null ? (
          <p className="mt-12 w-full text-center text-sm text-muted-foreground">
            Loading customer stories…
          </p>
        ) : reviews.length === 0 ? (
          <p className="mx-auto mt-12 w-full max-w-2xl border border-border bg-background p-6 text-center text-sm text-muted-foreground">
            Our customer stories will be shared here soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => {
              const name =
                text(review, "customer_name", "name", "customerName") ||
                "A Two And Half Meters customer"
              const city = text(review, "city", "location")
              const body = text(review, "review", "content", "message", "body")
              const image = text(
                review,
                "customer_image",
                "image_url",
                "avatar_url",
                "image",
              )
              const rating = number(review, "rating", "stars")

              return (
                <article
                  key={String(review.id ?? index)}
                  className="flex flex-col items-center border border-border bg-background p-6 text-center"
                >
                  <Quote className="h-7 w-7 text-primary/50" />
                  <div
                    className="mt-6 flex justify-center gap-1 text-primary"
                    aria-label={`${rating} out of 5 stars`}
                  >
                    {Array.from({ length: rating }).map((_, star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 font-serif text-2xl leading-snug text-primary">
                    “{body || "Beautifully made, with the kind of detail you can feel."}”
                  </blockquote>
                  <div className="mt-8 flex items-center justify-center gap-3 text-center">
                    {image ? (
                      <div
                        role="img"
                        aria-label={`${name}'s photo`}
                        className="h-11 w-11 rounded-full bg-muted bg-cover bg-center"
                        style={{ backgroundImage: `url("${image}")` }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="grid h-11 w-11 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                      >
                        {name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {name}
                      </p>
                      {city && (
                        <p className="text-xs text-muted-foreground">{city}</p>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
