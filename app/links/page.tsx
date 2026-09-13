"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Link2,
  ExternalLink,
  Play,
  Music2,
  Utensils,
  Globe2,
  ArrowUpRight,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react"
import { useState, type ReactNode } from "react"

/* ============================================================
   JADE — FAVOURITE LINKS

   A small register of things encountered elsewhere.

   Three classes:
   I.   Moving Pictures
   II.  Things Found
   III. Cultural Register

   The Tag Register at the bottom filters all three classes.
   ============================================================ */

type LinkTag =
  | "Mathematics"
  | "Theoretical Computer Science"
  | "Research"
  | "Teaching"
  | "Culture"
  | "Music"
  | "Food"
  | "Recipe"
  | "Film"
  | "Literature"
  | "Personal"
  | "Logic"
  | "Scientist"
  | "Book"
  | "Website"

type FilterTag = LinkTag | "All"

type FavouriteLink = {
  number: string
  date: string
  title: string
  caption: string
  url: string
  tags: LinkTag[]
  source: string
}

/* ============================================================
   DATA
   ============================================================ */

const videos: FavouriteLink[] = [
  {
    number: "011",
    date: "07 · IX · 2026",
    title: "This film needs no title!",
    caption:
      "A Portrait of Raymond Smullyan (May 25, 1919 – February 6, 2017)",
    url: "https://youtu.be/wcygp0R9Jp4?si=8CH-rjV6fAtZG3LF",
    tags: ["Mathematics", "Film", "Logic", "Scientist"],
    source: "YouTube",
  },
  {
    number: "012",
    date: "13 · IX · 2026",
    title: "Theoretical Computer Science Professor be link",
    caption:
      "Theory Computer Science Professors Be Like (Parody) from EASY THEORY (YT Channel)",
    url: "https://youtu.be/jYgyTvvcM6c?si=PnqpxqaDU3xBUvLY",
    tags: ["Recipe", "Film", "Teaching"],
    source: "YouTube",
  },
]

const thingsFound: FavouriteLink[] = [

  {
    number: "011",
    date: "13 · IX · 2026",
    title: "Tum Aapna Ranj O Gham, Aapni Pareeshani Mujhe by Sahir Ludhviani",
    caption:
      "Cover by Dr. Radhika Chopra",
    url: "https://youtu.be/PmXOtVurWqg?si=H1fExAByy41atEAH",
    tags: ["Personal", "Music", "Culture"],
    source: "YouTube",
  },
  {
    number: "012",
    date: "13 · IX · 2026",
    title: "Nice books from James Gleick (ISSAC NEWTON)",
    caption:
      "Website of James Gleick",
    url: "https://around.com/category/books/",
    tags: ["Book", "Website", "Scientist"],
    source: "WebSurfing",
  },
]

const culturalRegister: FavouriteLink[] = [

    {
    number: "011",
    date: "13 · IX · 2026",
    title: "Standard Omelet vs. Classic French Omelet",
    caption:
      "from Jacques Pépin Foundation (YT Channel)",
    url: "https://youtu.be/viUNdDENnDU?si=65_HEqdFH0XpgrAu",
    tags: ["Culture", "Food", "Recipe"],
    source: "YouTube",
  },

]

/* ============================================================
   ALL AVAILABLE TAGS
   ============================================================ */

const allTags: LinkTag[] = [
  "Mathematics",
  "Theoretical Computer Science",
  "Research",
  "Teaching",
  "Logic",
  "Scientist",
  "Culture",
  "Music",
  "Food",
  "Recipe",
  "Film",
  "Literature",
  "Personal",
]

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
        font-mono
        text-[9px]
        uppercase
        tracking-[0.25em]
        text-zinc-600
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
        inline-flex
        items-center
        border
        border-white/[0.08]
        bg-[#151b23]
        px-3
        py-1.5
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
        gap-5
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
            border-white/[0.10]
            bg-[#11161d]
            font-mono
            text-[10px]
            tracking-[0.08em]
            text-zinc-500
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
          text-zinc-600
        "
      >
        {meta}
      </span>
    </div>
  )
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyRegister({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div
      className="
        border
        border-dashed
        border-white/[0.08]
        bg-[#11161d]
        px-7
        py-10
        md:px-10
      "
    >
      <div className="flex items-start gap-5">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            border
            border-white/[0.08]
            bg-[#0d1218]
            text-zinc-600
          "
        >
          {icon}
        </div>

        <div>
          <p className="font-serif text-lg text-zinc-300">
            {title}
          </p>

          <p className="mt-2 max-w-2xl font-serif text-sm leading-7 text-zinc-600">
            {children}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   FILTERED EMPTY STATE
   ============================================================ */

function FilteredEmpty({
  tag,
}: {
  tag: FilterTag
}) {
  return (
    <div
      className="
        border
        border-dashed
        border-white/[0.08]
        bg-[#11161d]
        px-7
        py-8
      "
    >
      <p className="font-serif text-base text-zinc-500">
        Nothing recorded under{" "}
        <span className="text-zinc-300">
          {tag}
        </span>{" "}
        in this register yet.
      </p>
    </div>
  )
}

/* ============================================================
   LINK CARD
   ============================================================ */

function LinkCard({
  item,
}: {
  item: FavouriteLink
}) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(item.url)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      // Clipboard unavailable.
    }
  }

  return (
    <article
      className="
        overflow-hidden
        border
        border-white/[0.08]
        bg-[#141a22]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-8
          p-7
          md:grid-cols-[70px_1fr_auto]
          md:p-9
        "
      >
        {/* NUMBER */}

        <div>
          <span
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.10]
              bg-[#0e1319]
              font-mono
              text-[10px]
              text-zinc-500
            "
          >
            {item.number}
          </span>
        </div>

        {/* MAIN */}

        <div className="min-w-0">

          {/* TAGS */}

          <div className="mb-5 flex flex-wrap items-center gap-2">
            {item.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}

            <span
              className="
                inline-flex
                items-center
                border
                border-white/[0.08]
                bg-[#0f141a]
                px-3
                py-1.5
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-zinc-600
              "
            >
              {item.source}
            </span>
          </div>

          {/* TITLE */}

          <h3
            className="
              max-w-4xl
              font-serif
              text-[26px]
              leading-[1.2]
              tracking-[-0.018em]
              text-white
              md:text-[32px]
            "
          >
            {item.title}
          </h3>

          {/* CAPTION */}

          <p
            className="
              mt-4
              max-w-3xl
              font-serif
              text-[15px]
              leading-7
              text-zinc-400
            "
          >
            {item.caption}
          </p>

          {/* URL / ACTIONS */}

          <div
            className="
              mt-7
              flex
              flex-col
              gap-4
              border-t
              border-white/[0.07]
              pt-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* URL */}

            <p
              className="
                min-w-0
                flex-1
                truncate
                font-mono
                text-[9px]
                tracking-[0.06em]
                text-zinc-600
              "
              title={item.url}
            >
              {item.url}
            </p>

            {/* ACTIONS */}

            <div
              className="
                flex
                shrink-0
                items-center
                border
                border-white/[0.08]
              "
            >
              {/* COPY */}

              <button
                type="button"
                onClick={copyLink}
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  border-r
                  border-white/[0.08]
                  bg-[#11161d]
                  px-3
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  text-zinc-500
                "
              >
                {copied ? (
                  <Check className="h-3 w-3 text-zinc-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}

                {copied ? "Copied" : "Copy"}
              </button>

              {/* OPEN */}

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  bg-[#11161d]
                  px-4
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  text-zinc-400
                "
              >
                Open
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* DATE */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-5
            md:min-w-[130px]
            md:flex-col
            md:items-end
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.15em]
              text-zinc-600
            "
          >
            {item.date}
          </span>

          <ArrowUpRight
            className="
              h-5
              w-5
              text-zinc-700
            "
          />
        </div>
      </div>
    </article>
  )
}

/* ============================================================
   REGISTER
   ============================================================ */

function Register({
  items,
  emptyTitle,
  emptyText,
  icon,
  selectedTag,
}: {
  items: FavouriteLink[]
  emptyTitle: string
  emptyText: string
  icon: ReactNode
  selectedTag: FilterTag
}) {
  if (items.length === 0) {
    if (selectedTag !== "All") {
      return <FilteredEmpty tag={selectedTag} />
    }

    return (
      <EmptyRegister
        icon={icon}
        title={emptyTitle}
      >
        {emptyText}
      </EmptyRegister>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <LinkCard
          key={item.number}
          item={item}
        />
      ))}
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function FavouriteLinksPage() {
  const [selectedTag, setSelectedTag] =
    useState<FilterTag>("All")

  const totalLinks =
    videos.length +
    thingsFound.length +
    culturalRegister.length

  /* ==========================================================
     FILTER FUNCTION
     ========================================================== */

  function filterItems(items: FavouriteLink[]) {
    if (selectedTag === "All") {
      return items
    }

    return items.filter((item) =>
      item.tags.includes(selectedTag)
    )
  }

  const filteredVideos = filterItems(videos)
  const filteredThingsFound = filterItems(thingsFound)
  const filteredCultural = filterItems(culturalRegister)

  const filteredTotal =
    filteredVideos.length +
    filteredThingsFound.length +
    filteredCultural.length

  function selectTag(tag: FilterTag) {
    setSelectedTag(tag)

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 50)
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <main
        className="
          min-h-screen
          flex-1
          bg-[#080b10]
          text-zinc-100
        "
      >

        {/* ======================================================
            HEADER
            ====================================================== */}

        <header
          className="
            sticky
            top-0
            z-50
            h-16
            border-b
            border-white/[0.07]
            bg-[#0b1118]
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
            <div className="flex items-center gap-3">

              <div
                className="
                  border
                  border-white/[0.08]
                  bg-[#11161d]
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

              <span
                className="
                  hidden
                  text-xs
                  uppercase
                  tracking-[0.28em]
                  text-slate-500
                  sm:block
                "
              >
                Jade
              </span>
            </div>

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
                  text-[10px]
                  uppercase
                  tracking-[0.20em]
                  text-zinc-500
                "
              >
                Favourite Links
              </span>

              <span className="status-dot h-2 w-2 rounded-full bg-blue-400" />

              <span className="text-sm text-slate-600">
                things worth keeping
              </span>
            </div>

            <div className="flex items-center gap-4">

              <span
                className="
                  hidden
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-slate-600
                  md:block
                "
              >
                {selectedTag === "All"
                  ? `${totalLinks} recorded`
                  : `${filteredTotal} found`}
              </span>

              <div className="hidden h-5 w-px bg-white/[0.07] md:block" />

              <Link2 className="h-4 w-4 text-zinc-600" />

            </div>
          </div>
        </header>

        {/* ======================================================
            PAGE FIELD
            ====================================================== */}

        <div className="relative">

          {/* MATHEMATICAL GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.025]
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

                <div>

                  <div
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.30em]
                      text-zinc-600
                    "
                  >
                  </div>

                  <h1
                    className="
                      mt-9
                      font-serif
                      text-[78px]
                      leading-[0.82]
                      tracking-[-0.055em]
                      text-white
                      md:text-[125px]
                      lg:text-[155px]
                    "
                  >
                    Favourite
                    <br />
                    Links
                  </h1>

                  <p
                    className="
                      mt-12
                      max-w-4xl
                      font-serif
                      text-[21px]
                      leading-[1.55]
                      text-zinc-300
                      md:text-[26px]
                    "
                  >
                    A small collection of things found elsewhere
                    that were somehow deemed worthy of keeping.
                  </p>

                  <div className="mt-12 flex items-center gap-4">

                    <span className="h-px w-12 bg-zinc-700" />

                    <span
                      className="
                        font-serif
                        text-sm
                        italic
                        text-zinc-600
                      "
                    >
                    </span>

                  </div>

                  {/* FILTER JUMP */}

                  <a
                    href="#tag-register"
                    className="
                      mt-10
                      inline-flex
                      items-center
                      gap-3
                      border
                      border-white/[0.08]
                      bg-[#11161d]
                      px-4
                      py-3
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-zinc-500
                    "
                  >
                    Filter the collection by tag

                    <ChevronDown className="h-3.5 w-3.5 text-zinc-600" />
                  </a>

                </div>

                {/* REGISTER SUMMARY */}

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

                  <Label>Register</Label>

                  <div className="mt-5 flex items-center gap-4">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.09]
                        bg-[#11161d]
                      "
                    >
                      <Link2 className="h-4 w-4 text-zinc-500" />
                    </div>

                    <span className="font-serif text-2xl text-white">
                      {selectedTag === "All"
                        ? totalLinks
                        : filteredTotal}
                    </span>

                  </div>

                  <div className="my-10 h-px bg-white/[0.08]" />

                  <div className="space-y-7">

                    <div>
                      <Label>Classification</Label>

                      <p className="mt-2 font-serif text-sm text-zinc-300">
                        Three registers
                      </p>
                    </div>

                    <div>
                      <Label>Method</Label>

                      <p className="mt-2 font-serif text-sm text-zinc-300">
                        Manually curated
                      </p>
                    </div>

                    <div>
                      <Label>Principle</Label>

                      <p className="mt-2 font-serif text-sm italic text-zinc-600">
                        If it stayed in my head, it belongs here.
                      </p>
                    </div>

                  </div>
                </aside>

              </div>
            </section>

            {/* =================================================
                ACTIVE FILTER
                ================================================= */}

            {selectedTag !== "All" && (
              <div
                className="
                  mt-12
                  flex
                  flex-col
                  gap-4
                  border
                  border-white/[0.08]
                  bg-[#11161d]
                  px-5
                  py-4
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div className="flex items-center gap-3">

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.20em]
                      text-zinc-600
                    "
                  >
                    Active filter
                  </span>

                  <Tag>{selectedTag}</Tag>

                  <span className="font-serif text-sm text-zinc-500">
                    {filteredTotal}{" "}
                    {filteredTotal === 1
                      ? "entry"
                      : "entries"}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() => selectTag("All")}
                  className="
                    inline-flex
                    w-fit
                    items-center
                    border
                    border-white/[0.08]
                    bg-[#0f141a]
                    px-4
                    py-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-zinc-600
                  "
                >
                  Clear filter
                </button>

              </div>
            )}

            {/* =================================================
                I — MOVING PICTURES
                ================================================= */}

            <section className="pt-24 md:pt-28">

              <SectionHeader
                number="01"
                title="Moving Pictures"
                meta="Videos · Links only"
              />

              <div className="mt-8">

                <Register
                  items={filteredVideos}
                  selectedTag={selectedTag}
                  icon={<Play className="h-4 w-4" />}
                  emptyTitle="The projector is presently empty."
                  emptyText="Links to videos go here. No embedded players. No autoplay. No cinematic commitment. Just the link, the reason it survived, and the date upon which it was captured."
                />

              </div>

            </section>

            {/* =================================================
                II — THINGS FOUND
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="02"
                title="Things Found"
                meta="Articles · Websites · Essays"
              />

              <div className="mt-8">

                <Register
                  items={filteredThingsFound}
                  selectedTag={selectedTag}
                  icon={<Globe2 className="h-4 w-4" />}
                  emptyTitle="The archive hath found nothing yet."
                  emptyText="Articles, essays, websites, blogs, strange pages, useful references, and other corners of the internet may be recorded here."
                />

              </div>

            </section>

            {/* =================================================
                III — CULTURAL REGISTER
                ================================================= */}

            <section className="mt-28 md:mt-36">

              <SectionHeader
                number="03"
                title="Cultural Register"
                meta="Music · Food · Recipes · Everything Else"
              />

              <div className="mt-8">

                <Register
                  items={filteredCultural}
                  selectedTag={selectedTag}
                  icon={
                    <div className="flex items-center gap-1">
                      <Music2 className="h-3.5 w-3.5" />
                      <Utensils className="h-3.5 w-3.5" />
                    </div>
                  }
                  emptyTitle="The cultural cupboard remaineth open."
                  emptyText="Songs, albums, recipes, restaurants, films, books, photographs, food, traditions, and other things which do not fit comfortably into the intellectual registers."
                />

              </div>

            </section>

            {/* =================================================
                IV — TAG REGISTER
                ================================================= */}

            <section
              id="tag-register"
              className="mt-28 scroll-mt-24 md:mt-36"
            >

              <SectionHeader
                number="04"
                title="Tag Register"
                meta="Filter the entire collection"
              />

              <div
                className="
                  mt-8
                  border
                  border-white/[0.08]
                  bg-[#11161d]
                  p-8
                  md:p-10
                "
              >

                {/* INTRO */}

                <div className="mb-8">

                  <Label>Classification system</Label>

                  <p
                    className="
                      mt-3
                      max-w-3xl
                      font-serif
                      text-lg
                      leading-8
                      text-zinc-300
                    "
                  >
                    Choose a tag to filter the entire collection.
                  </p>
                </div>

                {/* FILTER BUTTONS */}

                <div className="flex flex-wrap gap-2">

                  {/* ALL */}

                  <button
                    type="button"
                    onClick={() => selectTag("All")}
                    className={`
                      inline-flex
                      items-center
                      border
                      px-3
                      py-2
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.16em]
                      ${
                        selectedTag === "All"
                          ? "border-white/[0.18] bg-[#1b222b] text-zinc-200"
                          : "border-white/[0.08] bg-[#0f141a] text-zinc-600"
                      }
                    `}
                  >
                    All
                  </button>

                  {allTags.map((tag) => {

                    const active = selectedTag === tag

                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => selectTag(tag)}
                        className={`
                          inline-flex
                          items-center
                          border
                          px-3
                          py-2
                          font-mono
                          text-[9px]
                          uppercase
                          tracking-[0.16em]
                          ${
                            active
                              ? "border-white/[0.18] bg-[#1b222b] text-zinc-200"
                              : "border-white/[0.08] bg-[#0f141a] text-zinc-600"
                          }
                        `}
                      >
                        {tag}
                      </button>
                    )
                  })}

                </div>

                {/* CURRENT FILTER */}

                <div
                  className="
                    mt-9
                    border-t
                    border-white/[0.07]
                    pt-7
                  "
                >

                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div>

                      <Label>Current view</Label>

                      <p className="mt-2 font-serif text-base text-zinc-300">
                        {selectedTag === "All"
                          ? "The complete collection"
                          : `Everything tagged “${selectedTag}”`}
                      </p>

                    </div>

                    <span
                      className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.16em]
                        text-zinc-600
                      "
                    >
                      {filteredTotal}{" "}
                      {filteredTotal === 1
                        ? "entry"
                        : "entries"}{" "}
                      found
                    </span>

                  </div>

                </div>

                {/* NOTE */}

                <div
                  className="
                    mt-8
                    border-l
                    border-white/[0.10]
                    pl-6
                  "
                >

                  <p
                    className="
                      font-serif
                      text-lg
                      leading-8
                      text-zinc-300
                    "
                  >
                    A link may belong to mathematics and still
                    be beautiful. A recipe may be intellectually
                    significant. A song may explain a day better
                    than a paragraph.
                  </p>

                  <p
                    className="
                      mt-4
                      font-serif
                      text-sm
                      italic
                      leading-7
                      text-zinc-600
                    "
                  >
                    The classification system is therefore not
                    to be trusted completely.
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                CLOSING
                ================================================= */}

            {/* <section className="mt-28 md:mt-36">

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
                      The collection remaineth open.
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
                      One link at a time, the internet is made
                      slightly less disposable.
                    </p>

                  </div>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-zinc-600
                    "
                  >
                    JADE · LINKS · 1806
                  </span>

                </div>

              </div>

            </section> */}

          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}