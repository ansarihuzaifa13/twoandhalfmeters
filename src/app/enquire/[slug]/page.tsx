import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { brand, products } from "@/lib/site-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export default async function EnquirePage({ params }: PageProps) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    notFound()
  }

  const message = encodeURIComponent(`Hi, I am interested in ${product.title}. Please share more details.`)
  const whatsappHref = `https://wa.me/${brand.whatsapp.replace("+", "")}?text=${message}`

  return (
    <section className="container grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="image-fill min-h-[520px]" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="flex items-center">
        <div className="w-full max-w-xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Enquire About</p>
          <h1 className="mt-3 font-serif text-5xl text-primary">{product.title}</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">We will get back to you with details and options.</p>
          <form className="mt-8 grid gap-4">
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Your name
              <input className="h-12 border border-border bg-background pl-8 pr-5 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" placeholder="  Enter your name" />
            </label>
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Phone number
              <input className="h-12 border border-border bg-background px-5 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" placeholder="  Enter your number" />
            </label>
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Message
              <textarea className="min-h-28 resize-none border border-border bg-background px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" defaultValue={`I'm interested in ${product.title}. Please share more details.`} />
            </label>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex h-16 w-full items-center justify-center bg-primary px-8 text-[11px] font-bold uppercase tracking-[0.14em] sm:w-96"
            >
              <span className="text-white">
                Enquire on WhatsApp
              </span>

              <MessageCircle className="absolute right-8 h-5 w-5 text-white" />
            </a>
            <p className="text-xs text-muted-foreground">You will be redirected to WhatsApp.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
