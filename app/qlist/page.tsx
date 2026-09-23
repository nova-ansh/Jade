"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Copy } from "lucide-react"

/* ============================================================
   QUOTES
   ============================================================ */

type QuoteEntry = {
  number: string
  quote: string
  author: string
  color: string
}

const quotes: QuoteEntry[] = [
  {
    number: "001",
    quote: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action",
    author: "Dr. A.P.J. Kalam",
    color: "#f59e0b",
  },
]

/* ============================================================
   COPY BUTTON
   ============================================================ */

function CopyButton({ quote }: { quote: string }) {
  const [copied, setCopied] = useState(false)

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(quote)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      // Clipboard access may be unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={copyQuote}
      title={copied ? "Copied" : "Copy quote"}
      className="flex h-8 w-14 items-center justify-center border border-white/[0.08] bg-[#111820] font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:border-white/[0.16] hover:text-zinc-300"
    >
      {copied ? "Copied" : <Copy size={13} strokeWidth={1.4} />}
    </button>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function QuotesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-h-screen flex-1 bg-[#080b10] text-zinc-100">
        {/* ==================================================
            HEADER
            ================================================== */}

        <header className="sticky top-0 z-50 h-16 border-b border-white/[0.07] bg-[#0b1118]">
          <div className="relative flex h-full items-center px-5">

            {/* LEFT */}

            <div className="flex items-center gap-3">
              <div
                className="
                  border
                  border-white/[0.08]
                  bg-[#11161d]/80
                  backdrop-blur-sm
                "
              >
                <SidebarTrigger
                  className="
                    h-9
                    w-9
                    text-slate-500
                  "
                />
              </div>

              <div className="hidden h-5 w-px bg-white/[0.07] sm:block" />

              <span className="hidden font-mono text-xs uppercase tracking-[0.28em] text-slate-500 sm:block">
                Jade
              </span>
            </div>

            {/* CENTRE */}

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-zinc-500">
                  Favourite Quotes
                </span>

                <span className="status-dot h-2 w-2 rounded-full bg-blue-400" />
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================
            PAGE FIELD
            ================================================== */}

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-32 md:px-10 lg:px-12">

            {/* ==================================================
                INTRODUCTION
                ================================================== */}

            <section className="border-b border-white/[0.08] py-20 md:py-24">
              <div className="max-w-4xl">
                <h1 className="mt-6 font-serif text-[56px] leading-none tracking-[-0.045em] text-white md:text-[86px]">
                  Favourite
                  Quotes
                </h1>

                <p className="mt-8 max-w-2xl font-serif text-lg leading-8 text-zinc-400 md:text-xl">
                  The philosophy of life is to keep going!
                </p>
              </div>
            </section>

            {/* ==================================================
                QUOTE REGISTER
                ================================================== */}

            <section className="pt-14">
              <div className="w-full overflow-hidden border border-white/[0.10] bg-[#0d1218]">

                {/* HEADER */}

                <div className="grid grid-cols-[70px_minmax(0,1fr)_200px_80px] border-b border-white/[0.10] bg-[#111820]">

                  <div className="px-4 py-5 font-mono text-[9px] font-normal uppercase tracking-[0.20em] text-zinc-500">
                    No.
                  </div>

                  <div className="px-5 py-5 font-mono text-[9px] font-normal uppercase tracking-[0.20em] text-zinc-500">
                    Quote
                  </div>

                  <div className="px-5 py-5 font-mono text-[9px] font-normal uppercase tracking-[0.20em] text-zinc-500">
                    Author
                  </div>

                  <div className="px-5 py-5 text-center font-mono text-[9px] font-normal uppercase tracking-[0.20em] text-zinc-500">
                    Copy
                  </div>
                </div>

                {/* BODY */}

                {quotes.map((quote) => (
                  <div
                    key={quote.number}
                    className="grid grid-cols-[70px_minmax(0,1fr)_200px_80px] border-b border-white/[0.07] transition-colors duration-200 hover:bg-[#141c25]"
                  >

                    {/* NUMBER */}

                    <div className="flex items-start gap-3 px-4 py-8">

                      <span
                        className="mt-1 h-8 w-1 shrink-0"
                        style={{
                          backgroundColor: quote.color,
                        }}
                      />

                      <span className="inline-flex h-8 min-w-8 items-center justify-center border border-white/[0.10] bg-[#111820] px-2 font-mono text-[9px] tracking-[0.08em] text-zinc-500">
                        {quote.number}
                      </span>
                    </div>

                    {/* QUOTE */}

                    <div className="min-w-0 px-5 py-8">

                      <p className="max-w-3xl break-words font-serif text-[21px] leading-8 tracking-[-0.02em] text-zinc-100 transition-colors group-hover:text-white">
                        “{quote.quote}”
                      </p>
                    </div>

                    {/* AUTHOR */}

                    <div className="px-5 py-8">

                      <p className="font-serif text-[16px] text-zinc-300">
                        {quote.author}
                      </p>

                      <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.17em] text-zinc-700">
                        Author
                      </p>
                    </div>

                    {/* COPY */}

                    <div className="flex items-start justify-center px-4 py-8">

                      <CopyButton
                        quote={`“${quote.quote}” — ${quote.author}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}