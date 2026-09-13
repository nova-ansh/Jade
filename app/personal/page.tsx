"use client"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"

import {
  Mail,
  MapPin,
  GraduationCap,
  Globe2,
  BookOpen,
  Camera,
  Music2,
  Dumbbell,
  Code2,
  ChevronDown,
} from "lucide-react"

import { useMemo, useState } from "react"

/* ============================================================
   JADE — PERSONAL INFORMATION
   A quieter record of the person behind the work.
   ============================================================ */

type PersonalDetail = {
  label: string
  value: string
  icon: React.ReactNode
  href?: string
}

type GalleryItem = {
  id: number
  title: string
  date: string
  day: string
  year: number
  month: number
  image: string
  description: string
}

type Hobby = {
  title: string
  description: string
  image: string
  icon: React.ReactNode
}

/* ============================================================
   PERSONAL DATA
   ============================================================ */

const personalDetails: PersonalDetail[] = [
  {
    label: "Name",
    value: "Jade",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    label: "Country",
    value: "India",
    icon: <Globe2 className="h-4 w-4" />,
  },
  {
    label: "College",
    value: "Thapar Institute of Engineering & Technology",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    label: "Field",
    value: "Computer Science · Mathematics",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    label: "Email",
    value: " asingh25_be23 AT thapar DOT edu",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    label: "Location",
    value: "Patiala, Punjab, India",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ansh-deep-singh-66165a286",
    icon: <Globe2 className="h-4 w-4" />,
    href: "linkedin.com/in/ansh-deep-singh-66165a286",
  },
  {
    label: "Website",
    value: "https://pj-mask.vercel.app/",
    icon: <Globe2 className="h-4 w-4" />,
    href: "https://pj-mask.vercel.app/",
  },
]

/* ============================================================
   HOBBIES
   ============================================================ */

const hobbies: Hobby[] = [
  {
    title: "Mathematics",
    description:
      "Stack from the Nava Nalanda Central Library (Nava Library), TIET-Patiala.",
    image: "NNCL.jpeg",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    title: "Cards Castle",
    description:
      "Took all the cards from TSLAS (Purana Library), TIET-Patiala, without anyone noticing.",
    image: "Castle.jpeg",
    icon: <Code2 className="h-4 w-4" />,
  },
  // {
  //   title: "Photography",
  //   description:
  //     "Keeping fragments of places, objects, journeys, and ordinary moments worth remembering.",
  //   image: "/personal/hobbies/photography.jpg",
  //   icon: <Camera className="h-4 w-4" />,
  // },
  // {
  //   title: "Music",
  //   description:
  //     "Listening, thinking, walking, and letting music occupy the spaces between difficult questions.",
  //   image: "/personal/hobbies/music.jpg",
  //   icon: <Music2 className="h-4 w-4" />,
  // },
  // {
  //   title: "Running",
  //   description:
  //     "A simple physical counterweight to long hours spent at a desk.",
  //   image: "/personal/hobbies/running.jpg",
  //   icon: <Dumbbell className="h-4 w-4" />,
  // },
]

/* ============================================================
   GALLERY
   ============================================================ */

const gallery: GalleryItem[] = [
  {
    id: 1,
    title: "A lazy afternoon of work",
    date: "02 · IX · 1806",
    day: "Saturday",
    year: 1806,
    month: 9,
    image: "Lazy_Noon.jpeg",
    description:
      "",
  },
  {
    id: 2,
    title: "Leh, Ladakh, India",
    date: "27 · VI · 1799",
    day: "Sunday",
    year: 1799,
    month: 8,
    image: "Ladakh.jpeg",
    description:
      "",
  },
  // {
  //   id: 3,
  //   title: "A day outside",
  //   date: "17 · VIII · 1806",
  //   day: "Monday",
  //   year: 1806,
  //   month: 8,
  //   image: "/personal/gallery/1806-VIII-17.jpg",
  //   description:
  //     "A small record from outside the workspace.",
  // },
  // {
  //   id: 4,
  //   title: "Old photograph",
  //   date: "21 · VII · 1805",
  //   day: "Thursday",
  //   year: 1805,
  //   month: 7,
  //   image: "/personal/gallery/1805-VII-21.jpg",
  //   description:
  //     "An older fragment preserved in the archive.",
  // },
]

/* ============================================================
   ROMAN MONTHS
   ============================================================ */

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

const monthNames = [
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

const years = [1806, 1805, 1804, 1803, 1802, 1801, 1800, 1799]

/* ============================================================
   PAGE
   ============================================================ */

export default function PersonalPage() {
  const [selectedYear, setSelectedYear] =
    useState<number | "ALL">("ALL")

  const [selectedMonth, setSelectedMonth] =
    useState<number | "ALL">("ALL")

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const yearMatch =
        selectedYear === "ALL" ||
        item.year === selectedYear

      const monthMatch =
        selectedMonth === "ALL" ||
        item.month === selectedMonth

      return yearMatch && monthMatch
    })
  }, [selectedYear, selectedMonth])

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-h-screen flex-1 bg-[#080b10] text-zinc-100">

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
                Personal Register
              </span>

              <span className="status-dot h-2 w-2 rounded-full bg-blue-400" />

              <span className="text-sm text-slate-400">
                The person behind the work
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
                Mathematics · CS · Life
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
              backgroundImage: `
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
                INTRO
                ================================================= */}

            <section
              className="
                border-b
                border-white/[0.08]
                py-24
                md:py-32
              "
            >

              <div className="max-w-5xl">

                <div
                  className="
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.30em]
                    text-blue-300/55
                  "
                >
                  Personal Information / 1806
                </div>

                <h1
                  className="
                    mt-7
                    font-serif
                    text-6xl
                    leading-none
                    tracking-[-0.045em]
                    text-white
                    md:text-8xl
                  "
                >
                  Personal
                </h1>

                <p
                  className="
                    mt-8
                    max-w-3xl
                    font-serif
                    text-xl
                    leading-[1.65]
                    text-zinc-400
                    md:text-2xl
                  "
                >
                  A small record of the person behind the
                  questions, constructions, photographs,
                  journeys, and work.
                </p>

              </div>

            </section>

            {/* =================================================
                01 — PERSONAL INFORMATION
                ================================================= */}

            <section className="border-b border-white/[0.08] py-20 md:py-28">

              <SectionHeading
                number="01"
                title="Personal Information"
                description="The ordinary facts, kept deliberately simple."
              />

              <div
                className="
                  mt-14
                  grid
                  gap-px
                  overflow-hidden
                  border
                  border-white/[0.08]
                  bg-white/[0.08]
                  md:grid-cols-2
                "
              >

                {personalDetails.map((item) => (
                  <div
                    key={item.label}
                    className="
                      group
                      bg-[#11151b]
                      p-6
                      transition-colors
                      duration-300
                      hover:bg-[#151b25]
                    "
                  >

                    <div className="flex items-start gap-4">

                      <div
                        className="
                          mt-0.5
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          border
                          border-blue-200/[0.08]
                          bg-[#0b111c]
                          text-blue-300/50
                          transition-colors
                          group-hover:text-blue-200/80
                        "
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">

                        <div
                          className="
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.25em]
                            text-slate-600
                          "
                        >
                          {item.label}
                        </div>

                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              mt-2
                              block
                              font-serif
                              text-lg
                              leading-relaxed
                              text-zinc-200
                              transition-colors
                              hover:text-blue-200
                            "
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div
                            className="
                              mt-2
                              font-serif
                              text-lg
                              leading-relaxed
                              text-zinc-200
                            "
                          >
                            {item.value}
                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                ))}

              </div>

              <div
                className="
                  mt-8
                  flex
                  items-center
                  gap-3
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-slate-600
                "
              >
                <span className="h-px w-8 bg-blue-300/20" />
                Personal details
                <span className="h-px w-8 bg-blue-300/20" />
              </div>

            </section>

            {/* =================================================
                02 — HOBBIES
                ================================================= */}

            <section className="border-b border-white/[0.08] py-20 md:py-28">

              <SectionHeading
                number="02"
                title="Hobbies"
                description="Things worth doing when the formal work is set aside."
              />

              <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {hobbies.map((hobby, index) => (
                  <div
                    key={hobby.title}
                    className="
                      overflow-hidden
                      border
                      border-white/[0.08]
                      bg-[#11151b]
                    "
                  >

                    <a
                      href={hobby.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`Open ${hobby.title} image in a new tab`}
                    >
                      <div className="relative h-52 overflow-hidden bg-[#0c1016]">

                        <img
                          src={hobby.image}
                          alt={hobby.title}
                          className="h-full w-full object-cover"
                        />

                      </div>
                    </a>

                    <div className="p-6">

                      <div className="mb-4 text-blue-300/60">
                        {hobby.icon}
                      </div>

                      <div
                        className="
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
                          text-blue-300/45
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3
                        className="
                          mt-2
                          font-serif
                          text-2xl
                          text-zinc-100
                        "
                      >
                        {hobby.title}
                      </h3>

                      <p
                        className="
                          mt-3
                          font-serif
                          text-sm
                          leading-[1.7]
                          text-zinc-500
                        "
                      >
                        {hobby.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </section>

            {/* =================================================
                03 — GALLERY
                ================================================= */}

            <section className="border-b border-white/[0.08] py-20 md:py-28">

              <SectionHeading
                number="03"
                title="Gallery"
                description="Fragments of time, arranged chronologically."
              />

              {/* FILTERS */}

              <div className="mt-14 border border-white/[0.08] bg-[#0e131a]">

                <div className="border-b border-white/[0.08] p-5">

                  <div
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-slate-600
                    "
                  >
                    Year
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    <FilterButton
                      active={selectedYear === "ALL"}
                      onClick={() => setSelectedYear("ALL")}
                    >
                      ALL
                    </FilterButton>

                    {years.map((year) => (
                      <FilterButton
                        key={year}
                        active={selectedYear === year}
                        onClick={() => setSelectedYear(year)}
                        title={String(year + 220)}
                      >
                        {year}
                      </FilterButton>
                    ))}

                  </div>

                </div>

                <div className="p-5">

                  <div
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-slate-600
                    "
                  >
                    Month
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">

                    <FilterButton
                      active={selectedMonth === "ALL"}
                      onClick={() => setSelectedMonth("ALL")}
                    >
                      ALL
                    </FilterButton>

                    {romanMonths.map((month, index) => (
                      <FilterButton
                        key={month}
                        active={selectedMonth === index + 1}
                        onClick={() =>
                          setSelectedMonth(index + 1)
                        }
                        title={monthNames[index]}
                      >
                        {month}
                      </FilterButton>
                    ))}

                  </div>

                </div>

              </div>

              {/* GALLERY */}

              <div className="mt-10">

                {filteredGallery.length === 0 ? (

                  <div
                    className="
                      border
                      border-dashed
                      border-white/[0.10]
                      py-20
                      text-center
                    "
                  >

                    <div className="font-serif text-xl text-zinc-500">
                      No photographs recorded for this interval.
                    </div>

                    <div
                      className="
                        mt-3
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.22em]
                        text-slate-700
                      "
                    >
                      Archive empty
                    </div>

                  </div>

                ) : (

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {filteredGallery.map((item) => (

                      <article
                        key={item.id}
                        className="
                          overflow-hidden
                          border
                          border-white/[0.08]
                          bg-[#11151b]
                        "
                      >

                        <a
                          href={item.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                          aria-label={`Open ${item.title} in a new tab`}
                        >
                          <div className="relative h-52 overflow-hidden bg-[#0c1016]">

                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />

                          </div>
                        </a>

                        <div className="p-6">

                          <div className="font-mono text-[10px] tracking-[0.16em] text-blue-200/70">
                            {item.date}
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-5">

                            <h3
                              className="
                                font-serif
                                text-2xl
                                text-zinc-100
                              "
                            >
                              {item.title}
                            </h3>

                            <span
                              className="
                                shrink-0
                                font-mono
                                text-[9px]
                                uppercase
                                tracking-[0.20em]
                                text-slate-600
                              "
                            >
                              {item.day}
                            </span>

                          </div>

                          <p
                            className="
                              mt-4
                              font-serif
                              text-sm
                              leading-[1.7]
                              text-zinc-500
                            "
                          >
                            {item.description}
                          </p>

                        </div>

                      </article>

                    ))}

                  </div>

                )}

              </div>

            </section>

            {/* =================================================
                CLOSING
                ================================================= */}

            {/* <section className="border-t border-white/[0.08] py-16">

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
                    The person continueth.
                  </p>

                  <p
                    className="
                      mt-3
                      max-w-xl
                      font-serif
                      text-sm
                      italic
                      leading-relaxed
                      text-zinc-500
                    "
                  >
                    Work is only one part of a life; the rest
                    is made of places, interests, photographs,
                    and time.
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-blue-300/35
                    "
                  >
                    JADE · PERSONAL · 1806
                  </span>

                  <ChevronDown className="h-3 w-3 text-blue-300/25" />

                </div>

              </div>

            </section> */}

          </div>
        </div>

      </main>
    </SidebarProvider>
  )
}

/* ============================================================
   SECTION HEADING
   ============================================================ */

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[70px_1fr]">

      <div className="flex items-start">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-blue-200/[0.10]
            bg-[#0d131d]
            font-mono
            text-[9px]
            tracking-[0.10em]
            text-blue-300/55
          "
        >
          {number}
        </div>

      </div>

      <div>

        <h2
          className="
            font-serif
            text-4xl
            tracking-[-0.025em]
            text-zinc-100
            md:text-5xl
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-4
            max-w-2xl
            font-serif
            text-base
            leading-[1.7]
            text-zinc-500
          "
        >
          {description}
        </p>

      </div>

    </div>
  )
}

/* ============================================================
   FILTER BUTTON
   ============================================================ */

function FilterButton({
  children,
  active,
  onClick,
  title,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`
        rounded-sm
        border
        px-3
        py-2
        font-mono
        text-[9px]
        tracking-[0.15em]
        transition-all
        duration-200
        ${
          active
            ? "border-blue-300/25 bg-blue-300/[0.08] text-blue-200"
            : "border-white/[0.07] bg-[#11151b] text-slate-600 hover:border-blue-300/[0.15] hover:text-slate-400"
        }
      `}
    >
      {children}
    </button>
  )
}