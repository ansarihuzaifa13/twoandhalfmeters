"use client"

import { Send } from "lucide-react"
import { contactCards } from "@/lib/site-data"

export default function ContactPage() {
  return (
    <section className="container grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[.8fr_1fr] lg:px-8">
      <div>
        <div className="h-8 bg-background"></div>
        <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-primary">Get in touch</p>
        <div className="h-2 bg-background"></div>
        <h1 className="mt-4 font-serif text-5xl text-primary">We would love to hear from you.</h1>
        <div className="h-2 bg-background"></div>
        <div className="mt-8 grid gap-5">
          {contactCards.map((item) => (
            <a key={item.label} href={item.href} className="border-b border-border pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-sm">{item.value}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
        <form className="grid content-start gap-6  bg-background p-8">
          <div className="h-8 bg-background"></div>
          {["Your name", "Email address"].map((label) => (
            <label key={label} className="grid gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {label}
              <input
                className="h-12 border border-border bg-background px-5 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                placeholder={label}
              />            </label>
          ))}
          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Message
            <textarea className="min-h-32 resize-none border border-border bg-background px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary" placeholder="How can we help you?" />
          </label>
          <button className="inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            Send message <Send className="h-4 w-4" />
          </button>
        </form>

        {/* <div className="relative min-h-[360px] overflow-hidden border border-border bg-muted">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(112,21,29,.12)_25%,transparent_25%),linear-gradient(-45deg,rgba(112,21,29,.12)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(112,21,29,.12)_75%),linear-gradient(-45deg,transparent_75%,rgba(112,21,29,.12)_75%)] bg-[length:34px_34px] bg-[position:0_0,0_17px,17px_-17px,-17px_0]" />
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-white shadow-lg">
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
        </div> */}
      </div>
    </section>
  )
}
