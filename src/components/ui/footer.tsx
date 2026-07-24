import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { NAVIGATION } from "@/lib/constants"
import { brand, products } from "@/lib/site-data"

const helpLinks = ["Care", "FAQs", "Shipping & Returns"]
const legalLinks = ["Privacy Policy", "Terms & Conditions"]

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (

    <footer className="maroon-band">
      <div className="h-10 bg-background"></div>

      <div className="container px-4 py-20 lg:py-2 sm:px-6 lg:px-12">
        <div className="h-10 maroon-band"></div>

        <div className="grid gap-16 lg:gap-24 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr_1.1fr]">
          <div>

            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em]">Get in touch</p>
            <div className="space-y-4 text-sm leading-7 text-white/75">
              <a className="flex items-center gap-3" href={`tel:${brand.phone}`}>
                <Phone className="h-4 w-4" /> {brand.phone}
              </a>
              <a className="flex items-center gap-3" href="https://instagram.com/twoandhalfmeters">
                <InstagramIcon /> {brand.instagram}
              </a>
              <a className="flex items-center gap-3" href={`mailto:${brand.email}`}>
                <Mail className="h-4 w-4" /> {brand.email}
              </a>
            </div>
          </div>

          <div>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em]">Shop</p>
            <div className="grid text-sm leading-7 leading-8 text-white/75">
              {products.slice(0, 3).map((product) => (
                <Link key={product.slug} href={`/shop/${product.slug}`}>
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em]">About</p>
            <div className="grid text-sm leading-7 leading-8 text-white/75">
              {NAVIGATION.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em]">Help</p>
            <div className="grid text-sm leading-7 leading-8 text-white/75">
              {helpLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.25em]">Legal</p>
            <div className="mb-8 grid text-sm leading-7 text-white/75">
              {legalLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
            <form className="mt-8 flex h-10 overflow-hidden border border-white/30">
              <input
                type="email"
                aria-label="Email"
                placeholder=" Enter your email"
                className="flex-1 bg-transparent pl-10 pr-6 text-sm text-white placeholder:text-white/45 outline-none" />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex w-14 items-center justify-center border-l border-white/20 text-xl transition hover:bg-white/10"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <div className="h-10 bg-background"></div>
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <p className="flex items-center gap-4">
            {/* <MapPin className="h-3.5 w-3.5" /> Handcrafted in India */}
          </p>
        </div>
      </div>
    </footer>
  )
}
