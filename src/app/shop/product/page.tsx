import { Suspense } from "react"
import ShopProductClient from "./shop-product-client"

export default function LiveProductPage() {
  return (
    <Suspense fallback={<p className="container px-4 py-20 text-center text-sm text-muted-foreground">Loading product…</p>}>
      <ShopProductClient />
    </Suspense>
  )
}
