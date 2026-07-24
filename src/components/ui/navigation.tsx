"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"
import { NAVIGATION } from "@/lib/constants"
import { brand } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="maroon-band h-8 text-[10px] font-semibold uppercase tracking-[0.16em]">
        <div className="container flex h-full items-center justify-center px-4 text-center">
          {brand.tagline}
        </div>
      </div>
      <nav className="container grid min-h-20 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <div className="hidden items-center gap-7 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary",
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) &&
                  "text-primary"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center border border-border text-primary lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="text-center text-primary">
          <span className="block text-[13px] font-semibold uppercase tracking-[0.18em]">Two And Half</span>
          <span className="brand-mark block text-5xl">2½</span>
          <span className="block text-[13px] font-semibold uppercase tracking-[0.18em]">Meters</span>
        </Link>

        <div className="flex items-center justify-end gap-2 text-primary">
          {[Search, User, ShoppingBag].map((Icon, index) => (
            <button
              key={index}
              type="button"
              aria-label={["Search", "Account", "Bag"][index]}
              className="flex h-10 w-10 items-center justify-center transition-colors hover:text-secondary"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <span className="font-serif text-2xl text-primary">{brand.name}</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid p-6">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-border py-5 font-serif text-3xl text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
