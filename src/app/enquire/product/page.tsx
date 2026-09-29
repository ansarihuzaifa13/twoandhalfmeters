import { Suspense } from "react"
import EnquireProductClient from "./enquire-product-client"

export default function LiveEnquirePage() {
  return (
    <Suspense fallback={<p className="container px-4 py-20 text-center text-sm text-muted-foreground">Loading product…</p>}>
      <EnquireProductClient />
    </Suspense>
  )
}
