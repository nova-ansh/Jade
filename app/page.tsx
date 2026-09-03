"use client"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import { useEffect, useState } from "react"

/* ============================================================
   JADE
   Mathematics · Computer Science · Research

   HOMEPAGE / FRONTISPIECE
   ============================================================ */


/* ============================================================
   WHITEBOARD NOTEBOOK
   ============================================================ */

const whiteboards = [
  "/WB_1.jpeg",
  "/WB_2.jpeg",
  "/WB_3.jpeg",
  "/WB_4.jpeg",
]


/* ============================================================
   DATE
   ============================================================ */

function getNotebookDate() {
  const date = new Date()

  const romanMonths = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ]

  return `${date.getDate()} · ${romanMonths[date.getMonth()]} · 1806`
}


function getDayName() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date())
}


/* ============================================================
   HOME
   ============================================================ */

export default function Home() {

  const [currentBoard, setCurrentBoard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)


  /* ----------------------------------------------------------
     WHITEBOARD ROTATION
     ---------------------------------------------------------- */

  useEffect(() => {

    if (isPaused) return

    const interval = setInterval(() => {

      setCurrentBoard(
        (prev) => (prev + 1) % whiteboards.length
      )

    }, 6000)

    return () => clearInterval(interval)

  }, [isPaused])


  return (

    <SidebarProvider>

      {/* ======================================================
          EXISTING JADE SIDEBAR
          ====================================================== */}

      <AppSidebar />


      <main className="min-h-screen flex-1 bg-[#080b10] text-zinc-100">


        {/* ====================================================
            STICKY TOP HEADER
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
                  hover:border-blue-200/[0.20]
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
                  text-[10px]
                  uppercase
                  tracking-[0.30em]
                  text-slate-400
                  sm:block
                "
              >
                Jade
              </span>

            </div>


            {/* CENTRE */}

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
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-blue-300/55
                "
              >
                Present inquiry
              </span>

              <span className="h-1 w-1 rounded-full bg-blue-400/40" />

              <span
                className="
                  max-w-[390px]
                  truncate
                  font-serif
                  text-sm
                  text-slate-400
                "
              >
                Collatz Conjecture: Mapping of Odd Series
              </span>

            </div>


            {/* RIGHT */}

            <div className="flex items-center gap-4">

              <span
                className="
                  hidden
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-slate-600
                  md:block
                "
              >
                Mathematics · CS · Research
              </span>

              <div className="hidden h-5 w-px bg-blue-200/[0.08] md:block" />

              <span
                className="
                  font-serif
                  text-xl
                  text-blue-300/40
                "
              >
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
                FRONTISPIECE
                ================================================= */}

            <section
              className="
                flex
                min-h-[650px]
                flex-col
                justify-center
                border-b
                border-white/[0.08]
                py-24
              "
            >

              <div
                className="
                  grid
                  gap-16
                  lg:grid-cols-[minmax(0,1fr)_260px]
                  lg:items-end
                "
              >

                {/* TITLE */}

                <div>

                  <p
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.30em]
                      text-blue-300/55
                    "
                  >
                    Mathematics · Computer Science · Research
                  </p>


                  <h1
                    className="
                      mt-8
                      font-serif
                      text-[92px]
                      leading-[0.80]
                      tracking-[-0.065em]
                      text-white
                      md:text-[135px]
                      lg:text-[165px]
                    "
                  >
                    Jade.
                  </h1>


                  <p
                    className="
                      mt-12
                      max-w-4xl
                      font-serif
                      text-[22px]
                      leading-[1.55]
                      text-zinc-200
                      md:text-[27px]
                    "
                  >
                    Those who share a destination are often
                    gathered on the same path.
                  </p>


                  <div className="mt-10 flex items-center gap-4">

                    <span className="h-px w-12 bg-blue-300/35" />

                    <p
                      className="
                        font-serif
                        text-sm
                        italic
                        text-zinc-500
                      "
                    >
                      Thapar Institute of Engineering & Technology,
                      Patiala
                    </p>

                  </div>


                  {/* SMALL INDEX */}

                  <div className="mt-14 flex flex-wrap gap-3">

                    <IndexPill>
                      Mathematics
                    </IndexPill>

                    <IndexPill>
                      Computer Science
                    </IndexPill>

                    <IndexPill>
                      Research
                    </IndexPill>

                  </div>

                </div>


                {/* RIGHT REGISTER */}

                <aside
                  className="
                    border-l
                    border-white/[0.08]
                    pl-8
                  "
                >

                  <Label>
                    The present record
                  </Label>


                  <div className="mt-5 flex items-center gap-4">

                    <NumberCircle>
                      01
                    </NumberCircle>

                    <div>

                      <p
                        className="
                          font-serif
                          text-lg
                          text-white
                        "
                      >
                        1806
                      </p>

                      <p
                        className="
                          mt-1
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.18em]
                          text-zinc-600
                        "
                      >
                        Current era
                      </p>

                    </div>

                  </div>


                  <div className="my-9 h-px bg-white/[0.08]" />


                  <div className="space-y-7">

                    <div>

                      <Label>
                        Work
                      </Label>

                      <p
                        className="
                          mt-2
                          font-serif
                          text-sm
                          text-zinc-300
                        "
                      >
                        Ongoing
                      </p>

                    </div>


                    <div>

                      <Label>
                        Record
                      </Label>

                      <p
                        className="
                          mt-2
                          font-serif
                          text-sm
                          text-zinc-300
                        "
                      >
                        Intellectual
                      </p>

                    </div>


                    <div>

                      <Label>
                        Date
                      </Label>

                      <p
                        className="
                          mt-2
                          font-mono
                          text-[10px]
                          tracking-[0.12em]
                          text-zinc-400
                        "
                      >
                        {getNotebookDate()}
                      </p>

                    </div>

                  </div>

                </aside>

              </div>

            </section>



            {/* =================================================
                WHITEBOARD NOTEBOOK
                ================================================= */}

            <section className="mt-28 md:mt-36">


              <SectionHeader
                number="01"
                title="Whiteboard Notebook"
                meta="Work before the notation has been cleaned"
              />


              <div
                className="
                  mt-8
                  grid
                  gap-6
                  lg:grid-cols-[1.45fr_0.55fr]
                  lg:items-end
                "
              >


                {/* WHITEBOARD */}

                <div
                  className="group"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >

                  <div
                    className="
                      relative
                      overflow-hidden
                      border
                      border-white/[0.10]
                      bg-[#15191f]
                    "
                  >

                    <img
                      key={currentBoard}
                      src={whiteboards[currentBoard]}
                      alt={`Whiteboard ${currentBoard + 1}`}
                      className="
                        block
                        h-[350px]
                        w-full
                        object-cover
                        object-center
                        opacity-[0.92]
                        transition-all
                        duration-700
                        group-hover:scale-[1.012]
                        group-hover:opacity-100
                        md:h-[500px]
                      "
                    />


                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/55
                        via-transparent
                        to-black/[0.04]
                      "
                    />


                    {/* MARK */}

                    <span
                      className="
                        absolute
                        right-6
                        top-5
                        font-serif
                        text-4xl
                        text-white/20
                      "
                    >
                      ∴
                    </span>


                    {/* COUNTER */}

                    <div
                      className="
                        absolute
                        bottom-5
                        left-6
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <NumberCircle>
                        {String(currentBoard + 1).padStart(2, "0")}
                      </NumberCircle>

                      <span
                        className="
                          font-mono
                          text-[9px]
                          tracking-[0.15em]
                          text-white/60
                        "
                      >
                        / {String(whiteboards.length).padStart(2, "0")}
                      </span>

                    </div>


                    {/* DOT NAVIGATION */}

                    <div
                      className="
                        absolute
                        bottom-6
                        right-6
                        flex
                        items-center
                        gap-2
                      "
                    >

                      {whiteboards.map((_, index) => (

                        <button
                          key={index}
                          onClick={() => setCurrentBoard(index)}
                          aria-label={`Show whiteboard ${index + 1}`}
                          className={`
                            h-1.5
                            rounded-full
                            transition-all
                            duration-300
                            ${
                              currentBoard === index
                                ? "w-7 bg-blue-200/70"
                                : "w-1.5 bg-white/25 hover:bg-white/45"
                            }
                          `}
                        />

                      ))}

                    </div>

                  </div>


                  {/* CAPTION */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-col
                      gap-3
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.24em]
                          text-blue-300/55
                        "
                      >
                        From the Whiteboards
                      </p>

                      <p
                        className="
                          mt-2
                          font-serif
                          text-sm
                          text-zinc-400
                        "
                      >
                        Work before the notation hath been cleaned.
                      </p>

                    </div>


                    <span
                      className="
                        font-mono
                        text-[9px]
                        tracking-[0.14em]
                        text-zinc-600
                      "
                    >
                      {getNotebookDate()}
                    </span>

                  </div>

                </div>



                {/* DERIVATION FIELD */}

                <div
                  className="
                    border
                    border-white/[0.08]
                    bg-[#15191f]
                    p-7
                    lg:mb-12
                  "
                >

                  <Label>
                    The derivation field
                  </Label>


                  <h3
                    className="
                      mt-6
                      font-serif
                      text-2xl
                      text-white
                    "
                  >
                    Before the result, there is the question.
                  </h3>


                  <p
                    className="
                      mt-5
                      font-serif
                      text-[15px]
                      leading-8
                      text-zinc-400
                    "
                  >
                    A whiteboard is usually less about the final
                    result and more about discovering what the
                    result ought to be.
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
                    The untidy line is sometimes the beginning
                    of the useful one.
                  </p>


                  <div className="mt-9 flex items-center gap-3">

                    <span className="h-px w-8 bg-blue-300/30" />

                    <span
                      className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-zinc-600
                      "
                    >
                      {getDayName()} · {getNotebookDate()}
                    </span>

                  </div>

                </div>

              </div>

            </section>



            {/* =================================================
                WHITEBOARD SYMPOSION
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="02"
                title="Whiteboard Symposion"
                meta="Inspired by CMI, Chennai"
              />


              <div
                className="
                  mt-8
                  grid
                  gap-5
                  md:grid-cols-3
                "
              >

                <SymposionDay
                  number="Week 35 · Day 01"
                  title="Saturday, 29 August, 2026"
                  speaker="Jade"
                  topics="C Programming, Class II"
                  symbol="01"
                />


                <SymposionDay
                  number="Week 35 · Day 02"
                  title="Sunday, 30 August, 2026"
                  speaker="Jade"
                  topics="Axiomatic Set Theory"
                  symbol="02"
                />


                <SymposionDay
                  number="Week 35 · Day 03"
                  title="Monday, 31 August, 2026"
                  speaker="Jade"
                  topics="Computer Networks"
                  symbol="03"
                />

              </div>

            </section>



            {/* =================================================
                AREAS OF INTEREST
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="03"
                title="Areas of interest"
                meta="Questions I return to"
              />


              <div
                className="
                  mt-8
                  grid
                  gap-5
                  md:grid-cols-3
                "
              >

                <Interest
                  number="01"
                  title="Algorithmics"
                  description="Algorithms, data structures, complexity, and the craft of making a procedure precise."
                  mark="A"
                />


                <Interest
                  number="02"
                  title="Theoretical Computer Science"
                  description="Formal languages, computation, logic, automata, discrete mathematics, and the structures beneath computation."
                  mark="T"
                />


                <Interest
                  number="03"
                  title="System Subjects"
                  description="Computer networks, operating systems, architecture, and the machinery by which abstract ideas become working systems."
                  mark="S"
                />

              </div>

            </section>



            {/* =================================================
                WORKING NOTEBOOK
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="04"
                title="Working notebook"
                meta="Questions under examination"
              />


              <div
                className="
                  mt-8
                  grid
                  gap-5
                  lg:grid-cols-2
                "
              >

                <NotebookCard
                  number="01"
                  title="Graph families"
                  description="Constructing and examining structured families of graphs, their connectivity, planarity, Hamiltonicity, and the behaviour forced by local constraints."
                  tag="Graph Theory"
                  mark="G"
                />


                <NotebookCard
                  number="02"
                  title="Foundations of computation"
                  description="Notes connecting algorithms, formal languages, logic, programming, and the mathematical ideas that sit beneath computation."
                  tag="Theory"
                  mark="λ"
                />

              </div>

            </section>



            {/* =================================================
                SELECTED WORK
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="05"
                title="Selected work"
                meta="Projects, notes & teaching"
              />


              <div className="mt-8 space-y-5">

                <Work
                  number="01"
                  title="Cohesive Ring Planar Graphs"
                  type="Graph Theory"
                  description="A study of structured planar graph families, their connectivity, and Hamiltonian properties."
                />


                <Work
                  number="02"
                  title="Mathematical Notes"
                  type="Foundations"
                  description="Proofs, constructions, questions, counterexamples, and things worth understanding properly."
                />


                <Work
                  number="03"
                  title="Teaching"
                  type="Education"
                  description="Lectures and explanations across mathematics and computer science, built around intuition and first principles."
                />

              </div>

            </section>



            {/* =================================================
                CLOSING REGISTER
                ================================================= */}

            <section className="mt-28 md:mt-36">

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
                      ∴
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

            </section>



            {/* =================================================
                FOOTER
                ================================================= */}

            <footer
              className="
                mt-20
                border-t
                border-white/[0.08]
                py-10
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div className="flex items-center gap-4">

                  <span
                    className="
                      font-serif
                      text-sm
                      text-zinc-300
                    "
                  >
                    Jade
                  </span>

                  <span className="h-3 w-px bg-white/[0.08]" />

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.20em]
                      text-zinc-600
                    "
                  >
                    Mathematics · CS · Research
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.14em]
                      text-zinc-600
                    "
                  >
                    {getNotebookDate()}
                  </span>

                  <span
                    className="
                      font-serif
                      text-lg
                      text-blue-300/30
                    "
                  >
                    ∴
                  </span>

                </div>

              </div>

            </footer>


          </div>

        </div>

      </main>

    </SidebarProvider>
  )
}


/* ============================================================
   NUMBER CIRCLE
   ============================================================ */

function NumberCircle({
  children,
}: {
  children: React.ReactNode
}) {
  return (

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
        border-blue-300/[0.20]
        bg-blue-400/[0.055]
        font-mono
        text-[9px]
        tracking-[0.08em]
        text-white
      "
    >
      {children}
    </span>

  )
}


/* ============================================================
   INDEX PILL
   ============================================================ */

function IndexPill({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <span
      className="
        border
        border-blue-200/[0.10]
        bg-[#121a26]
        px-4
        py-2
        font-mono
        text-[9px]
        uppercase
        tracking-[0.16em]
        text-blue-100/60
      "
    >
      {children}
    </span>

  )
}


/* ============================================================
   LABEL
   ============================================================ */

function Label({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <span
      className="
        font-mono
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
        border-b
        border-white/[0.08]
        pb-7
      "
    >

      <div
        className="
          flex
          flex-col
          gap-5
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div className="flex items-center gap-5">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-blue-300/[0.20]
              bg-blue-400/[0.045]
              font-mono
              text-[10px]
              tracking-[0.08em]
              text-blue-200
            "
          >
            {number}
          </div>


          <h2
            className="
              font-serif
              text-3xl
              tracking-[-0.025em]
              text-white
              md:text-[42px]
            "
          >
            {title}
          </h2>

        </div>


        <span
          className="
            pl-16
            font-mono
            text-[9px]
            uppercase
            tracking-[0.20em]
            text-blue-300/50
            md:pl-0
          "
        >
          {meta}
        </span>

      </div>

    </div>

  )
}


/* ============================================================
   SYMPOSION DAY
   ============================================================ */

function SymposionDay({
  number,
  title,
  speaker,
  topics,
  symbol,
}: {
  number: string
  title: string
  speaker: string
  topics: string
  symbol: string
}) {
  return (

    <article
      className="
        group
        relative
        flex
        min-h-[320px]
        flex-col
        border
        border-white/[0.085]
        bg-[#171a20]
        p-8
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
      "
    >

      {/* BACKGROUND INDEX */}

      <span
        className="
          pointer-events-none
          absolute
          right-7
          top-5
          font-mono
          text-5xl
          font-light
          text-white/[0.025]
          transition-all
          duration-500
          group-hover:text-blue-300/[0.06]
        "
      >
        {symbol}
      </span>


      {/* WEEK */}

      <span
        className="
          relative
          font-mono
          text-[9px]
          tracking-[0.20em]
          text-blue-300/60
        "
      >
        {number}
      </span>


      {/* DATE */}

      <h3
        className="
          relative
          mt-6
          max-w-xs
          font-serif
          text-[25px]
          leading-tight
          text-white
        "
      >
        {title}
      </h3>


      {/* SPEAKER */}

      <div className="relative mt-8">

        <Label>
          Speaker
        </Label>

        <p
          className="
            mt-2
            font-serif
            text-sm
            text-zinc-300
          "
        >
          {speaker}
        </p>

      </div>


      {/* TOPICS */}

      <div className="relative mt-6">

        <Label>
          Topic
        </Label>

        <p
          className="
            mt-2
            font-serif
            text-sm
            leading-6
            text-zinc-400
          "
        >
          {topics}
        </p>

      </div>


      {/* BOTTOM */}

      <div
        className="
          relative
          mt-auto
          flex
          items-center
          gap-3
          pt-8
          font-serif
          text-sm
          text-zinc-600
          transition-colors
          duration-300
          group-hover:text-zinc-300
        "
      >

        <span
          className="
            h-px
            w-7
            bg-zinc-700
            transition-all
            duration-300
            group-hover:w-11
            group-hover:bg-blue-300/40
          "
        />

        <span>
          Whiteboard session
        </span>

      </div>

    </article>

  )
}


/* ============================================================
   INTEREST
   ============================================================ */

function Interest({
  number,
  title,
  description,
  mark,
}: {
  number: string
  title: string
  description: string
  mark: string
}) {
  return (

    <article
      className="
        group
        relative
        flex
        min-h-[300px]
        flex-col
        border
        border-white/[0.085]
        bg-[#171a20]
        p-8
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
      "
    >

      {/* MARK */}

      <span
        className="
          pointer-events-none
          absolute
          right-7
          top-5
          font-serif
          text-7xl
          text-white/[0.025]
          transition-all
          duration-500
          group-hover:text-blue-300/[0.07]
        "
      >
        {mark}
      </span>


      {/* NUMBER */}

      <div className="relative flex items-center">

        <NumberCircle>
          {number}
        </NumberCircle>

      </div>


      {/* TITLE */}

      <h3
        className="
          relative
          mt-7
          max-w-sm
          font-serif
          text-2xl
          leading-tight
          text-white
        "
      >
        {title}
      </h3>


      {/* DESCRIPTION */}

      <p
        className="
          relative
          mt-4
          max-w-sm
          font-serif
          text-[15px]
          leading-7
          text-zinc-400
        "
      >
        {description}
      </p>


      {/* BOTTOM */}

      <div
        className="
          relative
          mt-auto
          flex
          items-center
          gap-3
          pt-8
          font-serif
          text-sm
          text-zinc-600
          transition-colors
          duration-300
          group-hover:text-zinc-300
        "
      >

        <span
          className="
            h-px
            w-6
            bg-zinc-700
            transition-all
            duration-300
            group-hover:w-10
            group-hover:bg-blue-300/35
          "
        />

        <span>
          View area
        </span>

      </div>

    </article>

  )
}


/* ============================================================
   NOTEBOOK CARD
   ============================================================ */

function NotebookCard({
  number,
  title,
  description,
  tag,
  mark,
}: {
  number: string
  title: string
  description: string
  tag: string
  mark: string
}) {
  return (

    <article
      className="
        group
        relative
        overflow-hidden
        border
        border-white/[0.085]
        bg-[#171a20]
        p-8
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
        md:p-10
      "
    >

      {/* BACKGROUND MARK */}

      <span
        className="
          pointer-events-none
          absolute
          right-8
          top-5
          font-serif
          text-8xl
          leading-none
          text-white/[0.022]
          transition-all
          duration-500
          group-hover:text-blue-300/[0.06]
        "
      >
        {mark}
      </span>


      <div className="relative">

        <div className="flex items-center justify-between">

          <NumberCircle>
            {number}
          </NumberCircle>


          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.20em]
              text-blue-300/45
            "
          >
            {tag}
          </span>

        </div>


        <h3
          className="
            mt-8
            font-serif
            text-3xl
            tracking-[-0.02em]
            text-white
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-5
            max-w-2xl
            font-serif
            text-[15px]
            leading-8
            text-zinc-400
          "
        >
          {description}
        </p>


        <div
          className="
            mt-9
            flex
            items-center
            gap-3
            font-serif
            text-sm
            text-zinc-600
            transition-colors
            duration-300
            group-hover:text-zinc-200
          "
        >

          <span
            className="
              h-px
              w-8
              bg-zinc-700
              transition-all
              duration-300
              group-hover:w-12
              group-hover:bg-blue-300/40
            "
          />

          <span>
            Open notebook
          </span>

        </div>

      </div>

    </article>

  )
}


/* ============================================================
   SELECTED WORK
   ============================================================ */

function Work({
  number,
  title,
  type,
  description,
}: {
  number: string
  title: string
  type: string
  description: string
}) {
  return (

    <article
      className="
        group
        grid
        gap-7
        border
        border-white/[0.085]
        bg-[#171a20]
        p-7
        transition-all
        duration-300
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
        md:grid-cols-[70px_180px_minmax(0,1fr)_40px]
        md:items-center
        md:p-8
      "
    >

      {/* NUMBER */}

      <NumberCircle>
        {number}
      </NumberCircle>


      {/* TYPE */}

      <span
        className="
          font-mono
          text-[9px]
          uppercase
          tracking-[0.18em]
          text-blue-300/50
        "
      >
        {type}
      </span>


      {/* CONTENT */}

      <div>

        <h3
          className="
            font-serif
            text-2xl
            text-white
            transition-colors
            duration-300
            group-hover:text-blue-50
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-3
            max-w-3xl
            font-serif
            text-[14px]
            leading-7
            text-zinc-400
          "
        >
          {description}
        </p>

      </div>


      {/* ARROW */}

      <span
        className="
          hidden
          font-serif
          text-xl
          text-zinc-700
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:text-blue-300/60
          md:block
        "
      >
        →
      </span>

    </article>

  )
}