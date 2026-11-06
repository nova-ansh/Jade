"use client"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import { useEffect, useState } from "react"
import { Bell, X } from "lucide-react"
import { Menu } from "lucide-react"


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
   SYMPOSION LECTURES

   To add or change a lecture, edit this list only.

   - date        : ISO format (YYYY-MM-DD). The weekday is derived
                   from it, so the weekday can never disagree with
                   the date.
   - description : optional. Leave it out (or set it to undefined)
                   and the card shows "Details to be announced."
   ============================================================ */

type Lecture = {
  week: string
  date: string
  speaker: string
  topic: string
  time: string
  venue: string
  description?: string
  symbol: string
}

const lectures: Lecture[] = [
//   {
//   week: "",
//   date: "COMING SOON",
//   speaker: "",
//   topic: "THEORY FEST @ TIET",
//   time: "",
//   venue: "TIET, Patiala",
//   description:
//     "Theory Fest at TIET is coming soon. A celebration of ideas, exploration, and the foundations of computing. Stay tuned for more details.",
//   symbol: "i",
// },
  // {
  //   week: "Week 44 · Talk - 02",
  //   date: "2026-11-1",
  //   speaker: "Jade",
  //   topic: "Abstract Data Structures",
  //   time: "16:00 - 18:00",
  //   venue: "LH 10, Second Level, TSLAS, TIET-Patiala",
  //   description:
  //     "This lecture will uncover the mathematical formulation behind the data structures which are not mysterious intangible entities but the effort of Human Pattern Recognition.",
  //   symbol: "Δ",
  // },
  // {
  //   week: "Week 43 · Day 03",
  //   date: "2026-10-26",
  //   speaker: "Jade",
  //   topic: "Operating Systems",
  //   description:
  //     "The operating system as a manager of shared resources: processes and threads, scheduling, synchronisation and deadlock, with the reasoning behind each design rather than a catalogue of definitions.",
  //   symbol: "ε",
  // },
]


/* ============================================================
   NOTIFICATION CENTRE

   To disable notifications completely:
   Set NOTIFICATIONS_ENABLED to false.

   To remove an announcement, comment out or delete its object.
   Give every announcement a unique ID. Change the ID whenever
   you want a revised announcement to appear as new again.
   ============================================================ */

type Notification = {
  id: string
  date: string
  title: string
  message: string
  category?: string
}

const NOTIFICATIONS_ENABLED = true

const notifications: Notification[] = [
  {
    id: "theory-fest-2026",
    date: "06 November 2026",
    title: "Theory Fest is coming!",
    category: "Announcement",
    message:
      "Theory Fest at TIET Patiala is coming soon. Further details will be announced shortly.",
  },

  // Add future announcements here.

  // {
  //   id: "announcement-002",
  //   date: "10 November 2026",
  //   title: "A new announcement",
  //   category: "Symposion",
  //   message: "Write your announcement here.",
  // },
]

/* ============================================================
   DATE HELPERS
   ============================================================ */

const ROMAN_MONTHS = [
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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]


function getNotebookDate(date: Date) {
  return `${date.getDate()} · ${ROMAN_MONTHS[date.getMonth()]} · 1806`
}


/* "2026-10-24" -> "Saturday, 24 October, 2026" (timezone-proof) */
function formatLectureDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return `${WEEKDAYS[date.getUTCDay()]}, ${date.getUTCDate()} ${
    MONTHS[date.getUTCMonth()]
  }, ${date.getUTCFullYear()}`
}


/* Local calendar day as "YYYY-MM-DD" */
function toLocalISO(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")

  return `${y}-${m}-${d}`
}


/* ============================================================
   HOME
   ============================================================ */

export default function Home() {
  const [notificationOpen, setNotificationOpen] = useState(false)
const [readNotificationIds, setReadNotificationIds] = useState<string[]>([])
const [readStateLoaded, setReadStateLoaded] = useState(false)

// Load previously read notifications
useEffect(() => {
  const saved = localStorage.getItem("jade-read-notifications")

  if (saved) {
    try {
      setReadNotificationIds(JSON.parse(saved))
    } catch {
      setReadNotificationIds([])
    }
  }

  setReadStateLoaded(true)
}, [])

// Save read notifications
useEffect(() => {
  if (readStateLoaded) {
    localStorage.setItem(
      "jade-read-notifications",
      JSON.stringify(readNotificationIds)
    )
  }
}, [readNotificationIds, readStateLoaded])

const unreadCount = notifications.filter(
  (notification) => !readNotificationIds.includes(notification.id)
).length

const markAsRead = (id: string) => {
  setReadNotificationIds((previous) =>
    previous.includes(id) ? previous : [...previous, id]
  )
}


//above is newly added for Notifications
  const [currentBoard, setCurrentBoard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  /* Filled in after mount so the server and the browser never
     disagree about "today" (avoids hydration warnings). */
  const [notebookDate, setNotebookDate] = useState("")
  const [today, setToday] = useState<string | null>(null)


  useEffect(() => {

    const now = new Date()

    setNotebookDate(getNotebookDate(now))
    setToday(toLocalISO(now))

  }, [])


  /* ----------------------------------------------------------
     WHITEBOARD ROTATION
     Restarts after every change, so clicking a dot always gives
     the full six seconds. Respects reduced-motion settings.
     ---------------------------------------------------------- */

  useEffect(() => {

    if (isPaused) return

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const timeout = setTimeout(() => {

      setCurrentBoard(
        (prev) => (prev + 1) % whiteboards.length
      )

    }, 6000)

    return () => clearTimeout(timeout)

  }, [isPaused, currentBoard])


  return (

    <>

      <SidebarProvider>

        {/* ======================================================
            EXISTING JADE SIDEBAR
            ====================================================== */}

        <AppSidebar />


        <main className="min-h-screen min-w-0 flex-1 bg-[#080b10] text-zinc-100">


          {/* ====================================================
              STICKY TOP HEADER

              Three-column grid from lg upwards, so the centre
              text can never collide with the left or right groups.
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
                gap-4
                px-5
                md:px-7
                lg:grid
                lg:grid-cols-[1fr_auto_1fr]
              "
            >

            {/* LEFT */}

<div className="flex items-center gap-3">

  <div
    className="
      flex
      items-center
      gap-2
      rounded-lg
      border
      border-blue-200/[0.10]
      bg-[#111a2a]
      px-2
      transition-colors
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

    <span className="
      pr-2
      text-xs
      font-medium
      tracking-wide
      text-slate-400
      transition-colors
      hover:text-blue-200
    ">
      Menu
    </span>

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
                  hidden
                  min-w-0
                  items-center
                  gap-3
                  lg:flex
                "
              >

                <span
                  className="
                    shrink-0
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.22em]
                    text-blue-300/55
                  "
                >
                  Present inquiry
                </span>

                <span className="status-dot h-2 w-2 shrink-0 rounded-full bg-blue-400" />

                <span
                  className="
                    truncate
                    font-serif
                    text-sm
                    text-slate-400
                    lg:max-w-[220px]
                    xl:max-w-[390px]
                  "
                >
                  Voglio il primo posto, Andiamo!
                </span>

              </div>


              {/* RIGHT */}

              <div className="flex items-center gap-4 lg:justify-self-end">

                <span
                  className="
                    hidden
                    whitespace-nowrap
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    text-slate-600
                    2xl:block
                  "
                >
                  Mathematics · CS · Research
                </span>

                <div className="hidden h-5 w-px bg-blue-200/[0.08] 2xl:block" />

                <span
                  className="
                    font-serif
                    text-xl
                    text-blue-400/40
                  "
                >
                  φ
                </span>
                {NOTIFICATIONS_ENABLED && (
  <div className="relative">
    <button
  onClick={() => setNotificationOpen(!notificationOpen)}
  aria-label="Open notifications"
  className="relative flex items-center gap-2
    px-3 h-10 rounded-full
    border border-red-500/30
    bg-red-500/10 text-red-500
    hover:bg-red-500 hover:text-white
    transition-all duration-200"
>
  <Bell size={17} />

  <span className="text-xs font-medium">
    Notifications
  </span>

  {unreadCount > 0 && (
    <span className="absolute -top-1.5 -right-1.5
      flex items-center justify-center
      min-w-[18px] h-[18px] px-1
      rounded-full bg-red-600 text-white
      text-[10px] font-bold">
      {unreadCount}
    </span>
  )}
</button>

    {notificationOpen && (
      <div className="absolute right-0 top-12 z-50
        w-[min(360px,calc(100vw-2rem))]
        rounded-xl border border-white/10
        bg-[#111111] shadow-2xl overflow-hidden">

        <div className="flex items-center justify-between
          px-4 py-3 border-b border-white/10">

          <div>
            <h3 className="text-sm font-semibold text-white">
              Notifications
            </h3>
            <p className="text-xs text-white/40 mt-1">
              {unreadCount} unread
            </p>
          </div>

          <button
            onClick={() => setNotificationOpen(false)}
            className="text-white/50 hover:text-white transition"
            aria-label="Close notifications"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">

          {notifications.length === 0 ? (
            <p className="p-6 text-center text-sm text-white/40">
              No announcements yet.
            </p>
          ) : (
            notifications.map((notification) => {
              const isRead = readNotificationIds.includes(notification.id)

              return (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full text-left p-4 border-b
                    border-white/5 transition
                    hover:bg-white/5
                    ${isRead ? "opacity-50" : "opacity-100"}`}
                >
                  <div className="flex items-start gap-3">

                    <span className={`mt-1.5 w-2 h-2 rounded-full
                      shrink-0 ${isRead ? "bg-white/20" : "bg-red-500"}`}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase
                          tracking-wider text-red-400">
                          {notification.category || "Announcement"}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-white">
                        {notification.title}
                      </h4>

                      <p className="text-xs leading-relaxed
                        text-white/60 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-[10px] text-white/30 mt-2">
                        {notification.date}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })
          )}

        </div>
      </div>
    )}
  </div>
)}

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
    FRONTISPIECE
    ================================================= */}

<section
  className="
    flex
    min-h-[560px]
    flex-col
    justify-center
    border-b
    border-white/[0.08]
    pt-12
    pb-16
  "
>
  <div
    className="
      grid
      items-center
      gap-10
      lg:grid-cols-[260px_minmax(0,1fr)]
      xl:gap-14
    "
  >
    {/* PORTRAIT — LEFTMOST */}

    <div className="w-full max-w-[260px]">
      <div
        className="
          relative
          aspect-[4/5]
          overflow-hidden
          border
          border-white/[0.12]
          bg-[#15191f]
        "
      >
        <img
          src="/jade.jpeg"
          alt="Jade"
          className="
            block
            h-full
            w-full
            object-cover
            object-center
            opacity-[0.94]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-black/[0.04]
          "
        />
      </div>
    </div>

    {/* TITLE, TOD & INSTITUTION — TO THE RIGHT */}

    <div className="min-w-0">
      <h1
        className="
          mt-8
          font-serif
          text-[92px]
          leading-[0.80]
          tracking-[-0.065em]
          text-white
          md:text-[135px]
          xl:text-[165px]
        "
      >
        Jade.
      </h1>

      {/* THOUGHT OF THE DAY */}

      <div className="mt-12 max-w-4xl">
        <p
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.30em]
            text-blue-300/55
          "
        >
          Thought of the Day!
        </p>

        <blockquote
          className="
            mt-4
            border-l
            border-blue-300/30
            pl-6
          "
        >
          <p
            className="
              font-serif
              text-[22px]
              leading-[1.55]
              text-zinc-200
              md:text-[27px]
            "
          >
            Sanity and happiness are an impossible combination.
          </p>

          <footer
            className="
              mt-4
              font-serif
              text-sm
              italic
              text-zinc-500
            "
          >
            — Mark Twain (Samuel Langhorne Clemens - American writer, humorist, and essayist)
          </footer>
        </blockquote>
      </div>
    </div>
  </div>
</section>

              {/* =================================================
                  WHITEBOARD NOTEBOOK
                  ================================================= */}

              <section className="">


                <SectionHeader
                  number="01"
                  title="Derivation Field"
                  meta="Mathematics will poke you until you start writing on a WhiteBoard."
                />


                <div className="mt-8">

                  <div
                    className="group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                  >

                    <div
                      className="
                        relative
                        h-[350px]
                        overflow-hidden
                        border
                        border-white/[0.10]
                        bg-[#15191f]
                        md:h-[600px]
                      "
                    >

                      {/* All boards stacked; the active one fades in. */}

                      {whiteboards.map((src, index) => (

                        <img
                          key={src}
                          src={src}
                          alt={`Whiteboard ${index + 1}`}
                          aria-hidden={currentBoard !== index}
                          className={`
                            absolute
                            inset-0
                            block
                            h-full
                            w-full
                            object-cover
                            object-center
                            transition-opacity
                            duration-700
                            ${
                              currentBoard === index
                                ? "opacity-[0.92] group-hover:opacity-100"
                                : "opacity-0"
                            }
                          `}
                        />

                      ))}


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
                        aria-hidden="true"
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
                            aria-current={currentBoard === index}
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
                          min-h-[1em]
                          font-mono
                          text-[9px]
                          tracking-[0.14em]
                          text-zinc-600
                        "
                      >
                        {notebookDate}
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
                  meta="Inspired by Chennai Mathematical Institute, Chennai"
                />


                <div
                  className="
                    mt-8
                    grid
                    gap-5
                    grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
                  "
                >
    {SYMPOSION_STATUS.active ? (
                    lectures.map((lecture, index) => (
                      <SymposionDay
                        key={lecture.topic}
                        {...lecture}
                        symbol={String(index + 1).padStart(2, "0")}
                        today={today}
                      />
                    ))
                  ) : (

                    <div className="border border-white/[0.085] bg-[#171a20] p-8 md:p-12">

                      <span className="font-mono text-[9px] uppercase
                        tracking-[0.30em] text-red-600/90">
                        Symposion · Announcement
                      </span>

                      <h3 className="mt-6 font-serif text-2xl text-white">
                        Lectures are temporarily postponed.
                      </h3>

                      <p className="mt-4 max-w-xl font-serif text-sm
                        leading-7 text-zinc-400">
                        {SYMPOSION_STATUS.message}
                      </p>

                    </div>

)}

                </div>

              </section>



              {/* =================================================
                  AREAS OF INTEREST
                  ================================================= */}

              <section className="mt-28 md:mt-36">

                <SectionHeader
                  number="03"
                  title="Areas of interest"
                  meta="Meaning of Life!"
                />


                <div
                  className="
                    mt-8
                    grid
                    gap-5
                    grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
                  "
                >

                  <Interest
                    number="01"
                    title="Discrete and Probabilistic Structures"
                    description="Logic Theory; Counting Theory; Graph Theory; Group Theory; Lattice Theory; Axiomatic Set Theory; Bayesian Inference; Randomness; Measure Theory."
                    mark="ℵ"
                  />


                  <Interest
                    number="02"
                    title="Automata, Computational & Complexity Theory"
                    description="Formal Languages; Computability Theory; Reducibility; Complexity Theory."
                    mark="⊨"
                  />


                  <Interest
                    number="03"
                    title="Algorithmics"
                    description="Graph-theoretic Algorithms; Randomized Algorithms; Probabilistic Algorithms."
                    mark="Ω"
                  />

                </div>

              </section>



              {/* =================================================
                  SELECTED WORK
                  ================================================= */}

              <section className="mt-28 md:mt-36">

                <SectionHeader
                  number="04"
                  title="What am I doin' these days?"
                  meta="a glimpse into ideas"
                />


                <div className="mt-8 space-y-5">

                  <Work
                    number="01"
                    title="Teaching"
                    type="Academia"
                    description="I host Symposion — a lecture series on weekends at TSLAS (Thapar School of Liberal Arts & Sciences), TIET Patiala, Patiala, India. It allows students as well as me to question aspects of Mathematics and Computing beyond the coursework."
                  />


                  <Work
                    number="02"
                    title="Celebration of Intellectual Rigor"
                    type="Examinations"
                    description="An ongoing study of mathematics, theoretical computer science, and their foundations through preparation for theoretical CS examinations in India."
                  />


                  <Work
                    number="03"
                    title="Mathematical Notes"
                    type="Foundations"
                    description="Proofs, constructions, questions, counterexamples, and things worth understanding properly."
                  />

                </div>

              </section>


            </div>

          </div>

        </main>

      </SidebarProvider>

    </>

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
          md:gap-10
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
            leading-relaxed
            tracking-[0.20em]
            text-blue-300/50
            md:max-w-sm
            md:pl-0
            md:text-right
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
   const SYMPOSION_STATUS = {
  active: false,
  message:
    "Symposion lectures are postponed until further discussion.",
}

function SymposionDay({
  week,
  date,
  speaker,
  topic,
  time,
  venue,
  description,
  symbol,
  today,
}: {
  week: string
  date: string
  speaker: string
  topic: string
  time: string
  venue: string
  description?: string
  symbol: string
  today: string | null
}) {

  /* Status is known only after mount (see Home). */

  const status =
    today === null
      ? null
      : date === today
        ? "Today"
        : date > today
          ? "Upcoming"
          : "Concluded"

  const statusColour =
    status === "Concluded"
      ? "text-zinc-600"
      : status === "Today"
        ? "text-blue-200"
        : "text-blue-300/70"

  return (

    <article
      className="
        group
        relative
        flex
        min-h-[360px]
        flex-col
        border
        border-white/[0.085]
        bg-[#171a20]
        p-8
        transition-colors
        duration-300
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
      "
    >

      {/* BACKGROUND INDEX */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-7
          top-5
          font-mono
          text-5xl
          font-light
          text-white/[0.025]
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
        {week}
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
        {formatLectureDate(date)}
      </h3>


      {/* SPEAKER + TOPIC */}

      <div className="relative mt-8 grid grid-cols-[auto_minmax(0,1fr)] gap-x-8 gap-y-6">

        <div>

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


        <div>

          <Label>
            Topic
          </Label>

          <p
            className="
              mt-2
              font-serif
              text-sm
              leading-6
              text-zinc-300
            "
          >
            {topic}
          </p>

        </div>

      </div>

      {/* TIME + VENUE */}

      <div className="relative mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label>Time</Label>
          <p className="mt-2 font-serif text-sm text-zinc-300">{time}</p>
        </div>
        <div>
          <Label>Venue</Label>
          <p className="mt-2 font-serif text-sm leading-6 text-zinc-300">{venue}</p>
        </div>
      </div>


      {/* DESCRIPTION */}

      <div className="relative mt-6 border-t border-white/[0.06] pt-6">

        <Label>
          About the lecture
        </Label>

        {description ? (

          <p
            className="
              mt-2
              font-serif
              text-sm
              leading-7
              text-zinc-400
            "
          >
            {description}
          </p>

        ) : (

          <p
            className="
              mt-2
              font-serif
              text-sm
              italic
              leading-7
              text-zinc-600
            "
          >
            Details to be announced.
          </p>

        )}

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
            shrink-0
            bg-zinc-700
            transition-colors
            duration-300
            group-hover:bg-blue-300/40
          "
        />

        <span>
          Whiteboard session
        </span>

        {status && (

          <span
            className={`
              ml-auto
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              ${statusColour}
            `}
          >
            {status}
          </span>

        )}

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
        transition-colors
        duration-300
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
      "
    >

      {/* MARK */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-7
          top-5
          font-serif
          text-7xl
          text-white/[0.025]
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
            shrink-0
            bg-zinc-700
            transition-colors
            duration-300
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
   SELECTED WORK

   Below xl the number and type sit on one row above the text;
   from xl upwards they become columns of the four-column grid.
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
        gap-5
        border
        border-white/[0.085]
        bg-[#171a20]
        p-7
        transition-colors
        duration-300
        hover:border-blue-200/[0.15]
        hover:bg-[#1b1f26]
        md:p-8
        xl:grid-cols-[70px_180px_minmax(0,1fr)_40px]
        xl:items-center
        xl:gap-7
      "
    >

      {/* NUMBER + TYPE */}

      <div className="flex items-center gap-5 xl:contents">

        <NumberCircle>
          {number}
        </NumberCircle>


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

      </div>


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
        aria-hidden="true"
        className="
          hidden
          font-serif
          text-xl
          text-zinc-700
          transition-colors
          duration-300
          group-hover:text-blue-300/60
          xl:block
        "
      >
        →
      </span>

    </article>

  )

}