import { ProductGrid } from "@/components/storefront/product-grid"
import { trustPoints } from "@/lib/site-data"

export default function ShopPage() {
  return <div><section className="py-12 text-center md:py-16"><div className="container px-4"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Collection Page</p><h1 className="mt-3 font-serif text-5xl text-primary md:text-6xl">Mukaish Edit</h1></div></section><section className="py-10 md:py-14"><div className="container px-4 sm:px-6 lg:px-8"><ProductGrid /></div></section><div className="container grid px-4 sm:grid-cols-2 lg:grid-cols-4">{trustPoints.map((point) => <div key={point.title} className="flex flex-col items-center justify-center py-20 text-center"><point.icon className="mb-6 h-6 w-6 text-primary" /><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{point.title}</p><p className="mt-4 mb-6 text-sm leading-7 text-muted-foreground">{point.text}</p><p className="text-sm leading-7 text-muted-foreground/80">{point.subText}</p></div>)}</div></div>
}
