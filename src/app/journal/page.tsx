import Link from "next/link"
import { journalPosts } from "@/lib/site-data"

const categories = ["All", "Styling Guides", "Craft Stories", "Festive Edit", "Fabric Notes"]

export default function JournalPage() {
  return (
    <div>
      <section className="border-b border-border py-12 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Journal Page</p>
        <h1 className="mt-3 font-serif text-5xl text-primary">Stories, styling guides & inspiration</h1>
      </section>
      <section className="container px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <span key={category} className="min-w-fit border-b border-border px-5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {journalPosts.map((post) => (
            <Link key={post.slug} href="/journal" className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <div className="image-fill h-full transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${post.image})` }} />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{post.category}</p>
              <h2 className="mt-1 font-serif text-2xl text-primary">{post.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
