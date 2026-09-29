"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"
import { FolderKanban, LayoutDashboard, LogOut, Package, Plus, ShieldCheck, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add product", icon: Plus },
  { href: "/admin/reviews/new", label: "Add review", icon: Star },
]

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return
      if (!session) router.replace("/admin/login")
      else setCheckingSession(false)
    })
    return () => { active = false }
  }, [router])

  async function signOut() {
    await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  const selectedHref = navigation
    .filter(
      ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
    )
    .sort((a, b) => b.href.length - a.href.length)[0]?.href

  if (checkingSession) {
    return <main className="grid min-h-screen place-items-center bg-background"><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Checking secure session</p></main>
  }

  return (
    <div className="min-h-screen bg-[#f8f1ec] text-foreground">
      <header className="border-b border-border bg-card px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><ShieldCheck className="h-5 w-5" /></span>
            <span><span className="brand-mark block text-lg text-primary">Two And Half Meters</span><span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Administration</span></span>
          </Link>
          <button onClick={signOut} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary"><LogOut className="h-4 w-4" /> Logout</button>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl md:grid-cols-[220px_1fr]">
        <aside className="border-b border-border bg-card px-4 py-5 md:min-h-[calc(100vh-73px)] md:border-b-0 md:border-r">
          <nav className="flex gap-2 overflow-x-auto md:block md:space-y-1">
            {navigation.map(({ href, label, icon: Icon }) => {
              const selected = href === selectedHref
              return <Link key={href} href={href} className={cn("flex shrink-0 items-center gap-3 rounded-md px-3 py-3 text-xs font-bold uppercase tracking-[0.13em] transition", selected ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-primary")}><Icon className="h-4 w-4" />{label}</Link>
            })}
          </nav>
          <div className="mt-8 hidden border-t border-border pt-5 text-xs leading-6 text-muted-foreground md:block"><FolderKanban className="mb-2 h-4 w-4 text-primary" />Manage products, images, and customer reviews here.</div>
        </aside>
        <main className="min-w-0 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
