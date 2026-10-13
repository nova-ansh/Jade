"use client"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import { useMemo, useState } from "react"
import type { ReactNode } from "react"

/* ============================================================
   JADE — DIARY
   A chronological register of intellectual work.
   ============================================================ */

type Domain =
  | "Mathematics"
  | "Theoretical Computer Science"
  | "Research"
  | "Teaching"
  | "Personal"

type Status =
  | "Ongoing"
  | "Resolved"
  | "Reconsidering"
  | "Recorded"

type DiaryEntry = {
  number: string
  date: string
  day: string
  title: string
  domain: Domain
  subject: string
  excerpt: string
  observation: string
  status: Status
  readingTime: string
  mark: string
}

/* ============================================================
   RECORD
   ============================================================ */

const entries: DiaryEntry[] = [
  {
    number: "011",
    date: "03 · IX · 1806",
    day: "Thursday",
    title:
      "What do I mean by India?",
    domain: "Personal",
    subject: "Philosophical Argument",
    excerpt:
      "Yet to be updated",
    observation:
      "Yet to be updated",
    status: "Ongoing",
    readingTime: "02 min",
    mark: "∴",
  },

  {
    number: "012",
    date: "11 · IX · 1806",
    day: "Friday",
    title:
      "Is Mathematics Created or Discovered?",
    domain: "Mathematics",
    subject: "Foundations of Mathematics",
    excerpt:
      "yet to be updated",
    observation:
      "yet to be updated",
    status: "Ongoing",
    readingTime: "02 min",
    mark: "∞",
  },

  
]

/* ============================================================
   SMALL NUMBER CIRCLE
   ============================================================ */

function NumberCircle({
  children,
}: {
  children: ReactNode
}) {
  return (
    <span
      className="
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-blue-300/[0.20]
        bg-blue-400/[0.055]
        font-mono
        text-[10px]
        tracking-[0.08em]
        text-white
        transition-all
        duration-300
        group-hover:border-blue-300/[0.38]
        group-hover:bg-blue-400/[0.10]
      "
    >
      {children}
    </span>
  )
}

/* ============================================================
   SECTION HEADER
   ============================================================ */

function SectionHeader({
  number,
  title,
  meta,
}: {
  number: string
  title: string
  meta: string
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
        border-b
        border-white/[0.08]
        pb-7
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <div className="flex items-center gap-5">

        <span
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-blue-300/[0.18]
            bg-blue-400/[0.045]
            font-mono
            text-[10px]
            tracking-[0.08em]
            text-blue-200
          "
        >
          {number}
        </span>

        <h2
          className="
            font-serif
            text-3xl
            tracking-[-0.025em]
            text-white
            md:text-[40px]
          "
        >
          {title}
        </h2>

      </div>

      <span
        className="
          font-mono
          text-[10px]
          uppercase
          tracking-[0.20em]
          text-blue-300/55
        "
      >
        {meta}
      </span>
    </div>
  )
}

/* ============================================================
   SMALL LABEL
   ============================================================ */

function Label({
  children,
}: {
  children: ReactNode
}) {
  return (
    <span
      className="
        text-[9px]
        uppercase
        tracking-[0.25em]
        text-zinc-500
      "
    >
      {children}
    </span>
  )
}

/* ============================================================
   TAG
   ============================================================ */

function Tag({
  children,
}: {
  children: ReactNode
}) {
  return (
    <span
      className="
        border
        border-blue-200/[0.10]
        bg-[#1a2029]
        px-3
        py-1.5
        text-[9px]
        uppercase
        tracking-[0.16em]
        text-blue-100/65
      "
    >
      {children}
    </span>
  )
}

/* ============================================================
   DIARY ENTRY
   ============================================================ */

function downloadEntryAsA4(entry: DiaryEntry) {
  const escapeHtml = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character]!
    )

  const title = escapeHtml(entry.title)
  const domain = escapeHtml(entry.domain)
  const subject = escapeHtml(entry.subject)
  const date = escapeHtml(entry.date)
  const day = escapeHtml(entry.day)
  const excerpt = escapeHtml(entry.excerpt)
  const observation = escapeHtml(entry.observation)
  const status = escapeHtml(entry.status)
  const readingTime = escapeHtml(entry.readingTime)

  const printWindow = window.open(
    "",
    "_blank",
    "width=900,height=700"
  )

  if (!printWindow) {
    alert("Please allow pop-ups to export this entry.")
    return
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} — Jade's Diary</title>

        <style>
          @page {
            size: A4;
            margin: 22mm 24mm 24mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            color: #202938;
            background: #ffffff;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 11.5pt;
            line-height: 1.8;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .page {
            position: relative;
            min-height: 250mm;
          }

          .watermark {
            position: fixed;
            top: 42%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-32deg);
            color: rgba(35, 57, 85, 0.055);
            font-family: Arial, sans-serif;
            font-size: 48pt;
            font-weight: 700;
            letter-spacing: 0.16em;
            white-space: nowrap;
            pointer-events: none;
            z-index: -1;
          }

          .eyebrow {
            color: #526c91;
            font-family: Arial, sans-serif;
            font-size: 8pt;
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          h1 {
            margin: 18mm 0 7mm;
            font-size: 29pt;
            line-height: 1.2;
            font-weight: 400;
            letter-spacing: -0.035em;
            overflow-wrap: anywhere;
          }

          .rule {
            width: 100%;
            height: 1px;
            margin: 8mm 0;
            background: #d9e0e8;
          }

          .metadata {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6mm 10mm;
            margin: 8mm 0;
          }

          .label {
            margin-bottom: 1.5mm;
            color: #6b7280;
            font-family: Arial, sans-serif;
            font-size: 7.5pt;
            letter-spacing: 0.13em;
            text-transform: uppercase;
          }

          .value {
            font-size: 10.5pt;
            overflow-wrap: anywhere;
          }

          .excerpt {
            margin: 10mm 0;
            color: #3d4a5d;
            font-size: 13pt;
            line-height: 1.8;
          }

          h2 {
            margin: 10mm 0 3mm;
            color: #344c6a;
            font-family: Arial, sans-serif;
            font-size: 8pt;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
          }

          p {
            margin: 0;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }

          .footer {
            margin-top: 18mm;
            padding-top: 5mm;
            border-top: 1px solid #d9e0e8;
            display: flex;
            justify-content: space-between;
            gap: 8mm;
            color: #6b7280;
            font-family: Arial, sans-serif;
            font-size: 8pt;
          }

          @media screen {
            body {
              max-width: 210mm;
              margin: 20px auto;
              padding: 22mm 24mm;
              box-shadow: 0 2px 24px rgba(0, 0, 0, 0.12);
            }
          }
        </style>
      </head>

      <body>
        <div class="watermark">JADE · 1806</div>

        <main class="page">
          <div class="eyebrow">
            Jade · Intellectual Diary
          </div>

          <h1>${title}</h1>

          <div class="rule"></div>

          <div class="metadata">
            <div>
              <div class="label">Domain</div>
              <div class="value">${domain}</div>
            </div>

            <div>
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>

            <div>
              <div class="label">Date recorded</div>
              <div class="value">${date}</div>
            </div>

            <div>
              <div class="label">Day</div>
              <div class="value">${day}</div>
            </div>

            <div>
              <div class="label">Status</div>
              <div class="value">${status}</div>
            </div>

            <div>
              <div class="label">Reading time</div>
              <div class="value">${readingTime}</div>
            </div>
          </div>

          <div class="rule"></div>

          <p class="excerpt">${excerpt}</p>

          <h2>Present observation</h2>
          <p>${observation}</p>

          <footer class="footer">
            <span>Jade · Author</span>
            <span>Intellectual Diary · ${date}</span>
          </footer>
        </main>

        <script>
          window.onload = () => {
            window.focus();
            window.print();
          };
        </script>
      </body>
    </html>
  `)

  printWindow.document.close()
}


function DiaryEntryCard({
  entry,
  expanded,
  onToggle,
}: {
  entry: DiaryEntry
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <article
      className="
        group
        border
        border-white/[0.085]
        bg-[#171a20]
        transition-all
        duration-300
        hover:border-blue-200/[0.13]
        hover:bg-[#1b1f26]
      "
    >

      {/* ------------------------------------------------------
         ENTRY HEADER
         ------------------------------------------------------ */}

      <button
        onClick={onToggle}
        className="
          w-full
          text-left
          focus:outline-none
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-8
            p-7
            md:grid-cols-[80px_1fr_auto]
            md:p-9
            lg:p-10
          "
        >

          {/* NUMBER */}

          <div className="flex items-start">
            <NumberCircle>
              {entry.number}
            </NumberCircle>
          </div>

          {/* TITLE */}

          <div>

            <div className="mb-5 flex flex-wrap gap-2">
              <Tag>{entry.domain}</Tag>
              <Tag>{entry.subject}</Tag>
            </div>

            <h3
              className="
                max-w-4xl
                font-serif
                text-[25px]
                leading-[1.22]
                tracking-[-0.015em]
                text-white
                md:text-[29px]
              "
            >
              {entry.title}
            </h3>

            <p
              className="
                mt-5
                max-w-3xl
                font-serif
                text-[15px]
                leading-7
                text-zinc-400
              "
            >
              {entry.excerpt}
            </p>

          </div>

          {/* RIGHT REGISTER */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-8
              md:min-w-[150px]
              md:flex-col
              md:items-end
            "
          >

            <div
              className="
                font-serif
                text-3xl
                text-zinc-600
                transition-colors
                duration-300
                group-hover:text-blue-200/25
              "
            >
              {entry.mark}
            </div>

            
<button
  type="button"
  className="
    inline-flex
    items-center
    gap-2
    rounded-md
    border
    border-blue-200/[0.12]
    bg-[#111a2a]
    px-4
    py-2.5
    font-mono
    text-[12px]
    uppercase
    tracking-[0.18em]
    text-blue-200
    transition-all
    duration-300
    hover:border-blue-200/[0.25]
    hover:bg-[#162238]
    hover:text-white
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-blue-300/40
  "
>
  {expanded ? "Close" : "Read"}
  <span aria-hidden="true">
    {expanded ? "−" : "↗"}
  </span>
</button>


          </div>

        </div>

      </button>

      {/* ------------------------------------------------------
         EXPANDED NOTE
         ------------------------------------------------------ */}

      {expanded && (
        <div
          className="
            border-t
            border-white/[0.07]
            bg-[#14171c]
          "
          
        >
          
<div className="flex justify-end border-b border-white/[0.07] px-7 py-4 md:px-9 lg:px-10">
  <button
    type="button"
    onClick={() => downloadEntryAsA4(entry)}
    className="
      inline-flex
      items-center
      gap-3
      border
      border-blue-200/[0.12]
      bg-[#111a2a]
      px-4
      py-3
      font-mono
      text-[12px]
      uppercase
      tracking-[0.16em]
      text-blue-200
      transition-all
      duration-300
      hover:border-blue-200/[0.25]
      hover:bg-[#162238]
      hover:text-white
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-blue-300/40
    "
  >
    <span aria-hidden="true">↓</span>
    Download A4
  </button>
</div>


          <div
            className="
              grid
              grid-cols-1
              gap-10
              p-7
              md:grid-cols-[1fr_280px]
              md:p-9
              lg:p-10
            "
          >

            <div>

              <Label>
                Present observation
              </Label>

              <p
                className="
                  mt-4
                  max-w-3xl
                  font-serif
                  text-[15px]
                  italic
                  leading-8
                  text-zinc-300
                "
              >
                {entry.observation}
              </p>

            </div>

            <div
              className="
                border-l
                border-white/[0.07]
                pl-7
              "
            >

              <div className="space-y-6">

                <div>
                  <Label>Status</Label>

                  <p className="mt-2 font-serif text-sm text-zinc-300">
                    {entry.status}
                  </p>
                </div>

                <div>
                  <Label>Recorded</Label>

                  <p className="mt-2 font-mono text-[10px] tracking-[0.10em] text-zinc-400">
                    {entry.date}
                  </p>

                  <p className="mt-1 font-serif text-sm text-zinc-500">
                    {entry.day}
                  </p>
                </div>

                <div>
                  <Label>Reading time</Label>

                  <p className="mt-2 font-mono text-[10px] tracking-[0.10em] text-zinc-400">
                    {entry.readingTime}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </article>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function DiaryPage() {

  const [activeFilter, setActiveFilter] =
    useState<"All" | Domain>("All")

  const [openEntry, setOpenEntry] =
    useState<string | null>(null)

  const filters: ("All" | Domain)[] = [
    "All",
    "Mathematics",
    "Theoretical Computer Science",
    "Research",
    "Teaching",
  ]

  const filteredEntries = useMemo(() => {

    if (activeFilter === "All") {
      return entries
    }

    return entries.filter(
      (entry) => entry.domain === activeFilter
    )

  }, [activeFilter])

  return (
    <SidebarProvider>

      {/* ======================================================
          EXISTING JADE SIDEBAR
          ====================================================== */}

      <AppSidebar />

      <main
        className="
          min-h-screen
          flex-1
          bg-[#080b10]
          text-zinc-100
        "
      >

        {/* ====================================================
            STICKY HEADER
            ==================================================== */}

        <header
          className="
            sticky
            top-0
            z-50
            h-16
            border-b
            border-blue-200/[0.08]
            bg-[#0b111c]/95
            backdrop-blur-md
          "
        >

          <div
            className="
              flex
              h-full
              items-center
              justify-between
              px-5
              md:px-7
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <div
                className="
                  rounded-lg
                  border
                  border-blue-200/[0.10]
                  bg-[#111a2a]
                  transition-all
                  duration-300
                  hover:border-blue-200/[0.18]
                  hover:bg-[#162238]
                "
              >

                <SidebarTrigger
                  className="
                    h-9
                    w-9
                    text-slate-400
                    transition-colors
                    hover:bg-blue-400/[0.08]
                    hover:text-blue-200
                  "
                />

              </div>

              <div className="hidden h-5 w-px bg-blue-200/[0.08] sm:block" />

              <span
                className="
                  hidden
                  text-xs
                  uppercase
                  tracking-[0.28em]
                  text-slate-400
                  sm:block
                "
              >
                Jade
              </span>

            </div>

            {/* CENTER */}

            <div
              className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                items-center
                gap-3
                lg:flex
              "
            >

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.20em]
                  text-blue-300/55
                "
              >
                Present inquiry
              </span>

              <span className="status-dot h-2 w-2 rounded-full bg-blue-400" />

              <span
                className="
                  max-w-[360px]
                  truncate
                  text-sm
                  text-slate-400
                "
              >
                What makes the life meaningful?
              </span>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-4">

              <span
                className="
                  hidden
                  text-xs
                  tracking-wide
                  text-slate-600
                  md:block
                "
              >
                Mathematics · CS · Research
              </span>

              <div className="hidden h-5 w-px bg-blue-200/[0.08] md:block" />

              <span className="font-serif text-lg text-blue-300/40">
                φ
              </span>

            </div>

          </div>

        </header>

        {/* ====================================================
            PAGE FIELD
            ==================================================== */}

        <div className="relative">

          {/* MATHEMATICAL GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
            "
             style={{
                backgroundImage: `None`,
                backgroundSize: "48px 48px",
              }}
          />

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[1500px]
              px-6
              pb-32
              md:px-10
              lg:px-12
            "
          >

            {/* =================================================
                HERO
                ================================================= */}

            <section
              className="
                flex
                min-h-[590px]
                flex-col
                justify-center
                border-b
                border-white/[0.08]
                py-24
              "
            >

              <div className="grid gap-16 lg:grid-cols-[1fr_280px]">

                {/* HERO TITLE */}

                <div>

                  <h1
                    className="
                      mt-9
                      font-serif
                      text-[92px]
                      leading-[0.82]
                      tracking-[-0.055em]
                      text-white
                      md:text-[135px]
                      lg:text-[165px]
                    "
                  >
                    Diary
                  </h1>

                  <p
                    className="
                      mt-12
                      max-w-4xl
                      font-serif
                      text-[22px]
                      leading-[1.55]
                      text-zinc-300
                      md:text-[27px]
                    "
                  >
                    A chronological record of questions,
                    constructions, observations, proofs,
                    failures, and ideas worth returning to.
                  </p>

                  <div className="mt-12 flex items-center gap-4">
                  </div>

                </div>

                {/* REGISTER */}

                <aside
                  className="
                    flex
                    flex-col
                    justify-center
                    border-l
                    border-white/[0.08]
                    pl-8
                  "
                >

                  <div
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.30em]
                      text-zinc-600
                    "
                  >
                    Recorded entries
                  </div>

                  <div className="mt-5 flex items-center gap-4">

                    <NumberCircle>
  {String(entries.length).padStart(3, "0")}
</NumberCircle>

<span
  className="
    font-serif
    text-xl
    text-white
  "
>
  {String(entries.length).padStart(3, "0")}
</span>

                  </div>

                  <div className="my-10 h-px bg-white/[0.08]" />

                  <div className="space-y-7">

                    <div>
                      <Label>Current era</Label>
                      <p className="mt-2 font-serif text-sm text-zinc-300">
                        IX · 1806
                      </p>
                    </div>

                    <div>
                      <Label>Domains</Label>
                      <p className="mt-2 font-serif text-sm text-zinc-300">
                        04
                      </p>
                    </div>

                    <div>
                      <Label>Order</Label>
                      <p className="mt-2 font-serif text-sm text-zinc-300">
                        Chronological
                      </p>
                    </div>

                  </div>

                </aside>

              </div>

            </section>

            {/* =================================================
                DEFINITION
                ================================================= */}

            {/* <section className="pt-24 md:pt-28">

              <SectionHeader
                number="01"
                title="Definition"
                meta="A note upon method"
              />

              <div
                className="
                  mt-8
                  border
                  border-white/[0.08]
                  bg-[#15191f]
                "
              >

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-[260px_1fr]
                  "
                >

                  <div
                    className="
                      border-b
                      border-white/[0.08]
                      p-8
                      md:border-b-0
                      md:border-r
                    "
                  >

                    <span
                      className="
                        font-serif
                        text-lg
                        italic
                        text-zinc-400
                      "
                    >
                      memoranda laboris
                    </span>

                    <p
                      className="
                        mt-6
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-zinc-600
                      "
                    >
                      The keeping of intellectual work
                    </p>

                  </div>

                  <div className="p-8 md:p-12">

                    <h3
                      className="
                        font-serif
                        text-3xl
                        text-white
                      "
                    >
                      This is not a diary of events.
                    </h3>

                    <div className="mt-7 max-w-4xl space-y-5">

                      <p
                        className="
                          font-serif
                          text-[16px]
                          leading-8
                          text-zinc-300
                        "
                      >
                        It is a record of intellectual movement —
                        the questions that appeared, the arguments
                        that failed, the structures that became visible,
                        and the ideas that survived long enough to
                        deserve another page.
                      </p>

                      <p
                        className="
                          font-serif
                          text-[16px]
                          leading-8
                          text-zinc-400
                        "
                      >
                        Herein are kept the unfinished things.
                        A theorem need not yet be proved; a conjecture
                        need not yet be right; a construction may
                        presently possess more questions than answers.
                      </p>

                      <p
                        className="
                          font-serif
                          text-[16px]
                          italic
                          leading-8
                          text-zinc-500
                        "
                      >
                        The purpose of the record is not to conceal
                        uncertainty, but to preserve it faithfully,
                        that one may return thereto in due season.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section> */}

            {/* =================================================
                PRESENT ENTRY
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="01"
                title="Present Entry"
                meta="The matter presently at hand"
              />

              <div className="mt-8">

                <DiaryEntryCard
                  entry={entries[0]}
                  expanded={openEntry === entries[0].number}
                  onToggle={() =>
                    setOpenEntry(
                      openEntry === entries[0].number
                        ? null
                        : entries[0].number
                    )
                  }
                />

              </div>

            </section>

            {/* =================================================
                ARCHIVE
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="02"
                title="The Archive"
                meta="Earlier recorded inquiries"
              />

              {/* FILTER BAR */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-5
                  border
                  border-white/[0.08]
                  bg-[#11151b]
                  px-5
                  py-4
                "
              >

                <span
                  className="
                    font-serif
                    text-sm
                    italic
                    text-zinc-500
                  "
                >
                  Arrange the record by domain.
                </span>

                <div className="flex flex-wrap gap-2">

                  {filters.map((filter) => {

                    const active =
                      activeFilter === filter

                    return (
                      <button
                        key={filter}
                        onClick={() =>
                          setActiveFilter(filter)
                        }
                        className={`
                          border
                          px-3
                          py-2
                          text-[9px]
                          uppercase
                          tracking-[0.16em]
                          transition-all
                          duration-300
                          ${
                            active
                              ? "border-blue-300/[0.20] bg-[#202b3a] text-blue-100"
                              : "border-white/[0.07] bg-[#171b21] text-zinc-500 hover:border-blue-200/[0.12] hover:text-zinc-300"
                          }
                        `}
                      >
                        {filter}
                      </button>
                    )
                  })}

                </div>

              </div>

              {/* ENTRIES WITH REAL GAPS */}
              
              <div className="mt-7 space-y-5">
                
                {filteredEntries
                  .slice(1)
                  .map((entry) => (
                    
                    <DiaryEntryCard
                      key={entry.number}
                      entry={entry}
                      expanded={openEntry === entry.number}
                      onToggle={() =>
                        setOpenEntry(
                          openEntry === entry.number
                            ? null
                            : entry.number
                        )
                      }
                    />
                    

                  ))}

                  

              </div>
              

            </section>

            {/* =================================================
                MARGINALIA
                ================================================= */}

            {/* <section className="mt-28 md:mt-36">

              <SectionHeader
                number="04"
                title="Marginalia"
                meta="Notes upon the keeping of notes"
              />

              <div
                className="
                  mt-8
                  border
                  border-white/[0.08]
                  bg-[#15191f]
                "
              >

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-[260px_1fr]
                  "
                >

                  <div
                    className="
                      border-b
                      border-white/[0.08]
                      p-8
                      md:border-b-0
                      md:border-r
                    "
                  >

                    <span
                      className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-blue-300/50
                      "
                    >
                      IV · Marginalia
                    </span>

                    <p
                      className="
                        mt-7
                        font-serif
                        text-sm
                        italic
                        leading-6
                        text-zinc-500
                      "
                    >
                      A record of the record itself.
                    </p>

                  </div>

                  <div className="p-8 md:p-12">

                    <div
                      className="
                        max-w-4xl
                        border-l
                        border-blue-300/[0.20]
                        pl-7
                        md:pl-10
                      "
                    >

                      <p
                        className="
                          font-serif
                          text-2xl
                          leading-9
                          text-zinc-100
                          md:text-3xl
                        "
                      >
                        “One ought not record only that which
                        was found. The path by which it was sought
                        is often the more valuable object.”
                      </p>

                      <p
                        className="
                          mt-8
                          font-serif
                          text-[15px]
                          leading-8
                          text-zinc-400
                        "
                      >
                        Thus the failed proof, the discarded
                        construction, the inconvenient counterexample,
                        and the question which would not go away
                        are retained herein.
                      </p>

                      <p
                        className="
                          mt-5
                          font-serif
                          text-[15px]
                          italic
                          leading-8
                          text-zinc-500
                        "
                      >
                        They are not blemishes upon the record.
                        They are evidence of its having been made.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section> */}

{/* =================================================
                CLOSING REGISTER
                ================================================= */}

            {/* <section className="mt-28 md:mt-36">

              <div
                className="
                  border-y
                  border-white/[0.08]
                  bg-[#11151b]
                  px-7
                  py-10
                  md:px-10
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-end
                    md:justify-between
                  "
                >

                  <div>

                    <Label>
                      Closing register
                    </Label>


                    <h3
                      className="
                        mt-5
                        max-w-2xl
                        font-serif
                        text-3xl
                        leading-tight
                        text-white
                        md:text-4xl
                      "
                    >
                      The work remaineth open.
                    </h3>


                    <p
                      className="
                        mt-4
                        max-w-2xl
                        font-serif
                        text-[15px]
                        italic
                        leading-7
                        text-zinc-500
                      "
                    >
                      What is unresolved is not thereby without
                      value; it is merely awaiting another attempt.
                    </p>

                  </div>


                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <NumberCircle>
                      ω
                    </NumberCircle>

                    <span
                      className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.22em]
                        text-zinc-600
                      "
                    >
                      Record continues
                    </span>

                  </div>

                </div>

              </div>

            </section> */}

          </div>

        </div>

      </main>

    </SidebarProvider>
  )
}