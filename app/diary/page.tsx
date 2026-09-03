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
    number: "017",
    date: "03 · IX · 1806",
    day: "Thursday",
    title:
      "On the nature of a proof which refuseth to remain merely formal",
    domain: "Mathematics",
    subject: "Mathematical Reasoning",
    excerpt:
      "A proof may establish a proposition without yet revealing why the proposition ought to be true. The distinction is subtle, but not without consequence.",
    observation:
      "Proof is considered not merely as certification, but as an instrument by which structure is made visible.",
    status: "Ongoing",
    readingTime: "06 min",
    mark: "∴",
  },

  {
    number: "016",
    date: "02 · IX · 1806",
    day: "Wednesday",
    title:
      "A small inquiry concerning infinite processes",
    domain: "Mathematics",
    subject: "Foundations",
    excerpt:
      "The difficulty lieth not always in infinity itself, but in the manner by which a finite statement is made to speak of it.",
    observation:
      "An important distinction appeareth between an infinite object and an indefinitely continued procedure.",
    status: "Reconsidering",
    readingTime: "09 min",
    mark: "∞",
  },

  {
    number: "015",
    date: "31 · VIII · 1806",
    day: "Tuesday",
    title:
      "When a machine may be understood as a mathematical object",
    domain: "Theoretical Computer Science",
    subject: "Automata Theory",
    excerpt:
      "The machine is finite; the language need not be. What matters is the correspondence between the two.",
    observation:
      "The transition system becomes clearer when treated as a structure first and an implementation second.",
    status: "Resolved",
    readingTime: "07 min",
    mark: "λ",
  },

  {
    number: "014",
    date: "30 · VIII · 1806",
    day: "Monday",
    title:
      "On relations, constructions, and the discipline of definitions",
    domain: "Theoretical Computer Science",
    subject: "Set Theory",
    excerpt:
      "Many confusions which appear profound are born from a definition left slightly imprecise.",
    observation:
      "The exercise of defining an object carefully often resolveth a question before any theorem is invoked.",
    status: "Recorded",
    readingTime: "05 min",
    mark: "⊂",
  },

  {
    number: "013",
    date: "28 · VIII · 1806",
    day: "Saturday",
    title:
      "A graph family takes form",
    domain: "Research",
    subject: "Graph Theory",
    excerpt:
      "The repeated construction suggesteth that what first appeared as several examples may in fact belong to one coherent family.",
    observation:
      "The useful question is no longer whether the examples possess a property, but whether the construction itself compelleth that property.",
    status: "Ongoing",
    readingTime: "11 min",
    mark: "G",
  },

  {
    number: "012",
    date: "26 · VIII · 1806",
    day: "Thursday",
    title:
      "Concerning the habit of asking what a theorem is really saying",
    domain: "Mathematics",
    subject: "Proof & Structure",
    excerpt:
      "A theorem often containeth more information than the sentence by which it is ordinarily stated.",
    observation:
      "The distinction between the statement of a result and the structure which maketh the result inevitable is under examination.",
    status: "Ongoing",
    readingTime: "08 min",
    mark: "□",
  },

  {
    number: "011",
    date: "23 · VIII · 1806",
    day: "Monday",
    title:
      "Teaching as a test of understanding",
    domain: "Teaching",
    subject: "Algorithms · C",
    excerpt:
      "That which cannot be rendered intelligible to another mind hath perhaps not yet become intelligible to one's own.",
    observation:
      "Teaching exposed several gaps which private calculation had allowed to remain unseen.",
    status: "Recorded",
    readingTime: "06 min",
    mark: "↗",
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

            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-zinc-600
              "
            >
              {expanded ? "Close" : "Examine"}
            </span>

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

              <span className="h-1 w-1 rounded-full bg-blue-400/40" />

              <span
                className="
                  max-w-[360px]
                  truncate
                  text-sm
                  text-slate-400
                "
              >
                The structure beneath the question
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
              backgroundImage:
                `
                linear-gradient(
                  rgba(255,255,255,1) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,1) 1px,
                  transparent 1px
                )
                `,
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

                  <div
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.30em]
                      text-blue-300/55
                    "
                  >
                    Workspace / Intellectual Register
                  </div>

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

                    <span className="h-px w-12 bg-blue-300/35" />

                    <span
                      className="
                        font-serif
                        text-sm
                        italic
                        text-zinc-500
                      "
                    >
                      wherein the work is permitted to remain unfinished
                    </span>

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
                      017
                    </NumberCircle>

                    <span
                      className="
                        font-serif
                        text-xl
                        text-white
                      "
                    >
                      017
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

            <section className="pt-24 md:pt-28">

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

            </section>

            {/* =================================================
                PRESENT ENTRY
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="02"
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
                number="03"
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

            <section className="mt-28 md:mt-36">

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

            </section>

            {/* =================================================
                CLOSING
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <div
                className="
                  border-t
                  border-white/[0.08]
                  py-12
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    gap-6
                    md:flex-row
                    md:items-end
                    md:justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        font-serif
                        text-2xl
                        text-zinc-200
                      "
                    >
                      The record continueth.
                    </p>

                    <p
                      className="
                        mt-3
                        font-serif
                        text-sm
                        italic
                        text-zinc-500
                      "
                    >
                      What remaineth unresolved is not thereby
                      without value.
                    </p>

                  </div>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-blue-300/35
                    "
                  >
                    JADE · DIARY · 1806
                  </span>

                </div>

              </div>

            </section>

          </div>

        </div>

      </main>

    </SidebarProvider>
  )
}