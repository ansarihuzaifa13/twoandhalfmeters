"use client"

import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, LockKeyhole } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { supabase.auth.getSession().then(({ data }) => { if (data.session) router.replace("/admin") }) }, [router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setSubmitting(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (signInError) { setError(signInError.message); return }
    router.replace("/admin")
  }

  return <main className="grid min-h-screen place-items-center bg-[#f8f1ec] p-5"><section className="w-full max-w-md border border-border bg-card p-7 shadow-[0_20px_60px_rgba(112,21,29,0.12)] sm:p-10"><div className="mb-9 text-center"><span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><LockKeyhole className="h-5 w-5" /></span><p className="brand-mark text-2xl text-primary">Two And Half Meters</p><p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Administration</p></div><form onSubmit={handleSubmit} className="space-y-5"><label className="block text-xs font-bold uppercase tracking-[0.14em] text-primary">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3 text-base font-normal text-foreground outline-none focus:border-primary" /></label><label className="block text-xs font-bold uppercase tracking-[0.14em] text-primary">Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-border bg-background px-4 py-3 text-base font-normal text-foreground outline-none focus:border-primary" /></label>{error && <p role="alert" className="border-l-2 border-error bg-red-50 px-3 py-2 text-sm text-error">{error}</p>}<button disabled={submitting} className="flex w-full items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60">{submitting ? "Signing in…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}</button></form><Link className="mt-7 block text-center text-xs text-muted-foreground underline underline-offset-4 hover:text-primary" href="/">Return to website</Link></section></main>
}
