"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ExternalLink, BookOpen } from "lucide-react"
import { useState } from "react"

/* ============================================================
   JADE — READING LIST

   A record of books read, studied, or presently being read.

   Add / remove tags from `allTags`.
   Add books to `readingList`.
   Opinion links point to PDFs and may be added later.
   ============================================================ */

type ReadingTag =
  | "Mathematics"
  | "Theoretical Computer Science"
  | "History of Science"
  | "Scientific Thought"
  | "Philosophy"
  | "Logic"
  | "Literature"
  | "Biography"
  | "Physics"
  | "Computing"
  | "Research"

type ReadingEntry = {
  number: string
  name: string
  author: string
  obtainedFrom: string
  subjects: ReadingTag[]
  opinionPdf: string
}

/* ============================================================
   TAG REGISTER
   Edit this list whenever the classification system changes.
   ============================================================ */

const allTags: ReadingTag[] = [
  "Mathematics",
  "Theoretical Computer Science",
  "History of Science",
  "Scientific Thought",
  "Philosophy",
  "Logic",
  "Literature",
  "Biography",
  "Physics",
  "Computing",
  "Research",
]

/* ============================================================
   READING LIST
   ============================================================ */

const readingList: ReadingEntry[] = [
  {
    number: "001",
    name: "History of Mathematics",
    author: "Carl B. Boyer, Uta C. Merzbach",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "History of Science",
      "Scientific Thought",
      "Mathematics",
      "Biography",
    ],
    opinionPdf: "#",
  },

  {
    number: "002",
    name: "Philosophy of Probability and Statistical Modelling",
    author: "",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Philosophy", "History of Science", "Mathematics",
    ],
    opinionPdf: "#",
  },

  {
    number: "003",
    name: "The C Programming Langauge",
    author: "Brian W. Kernighan, Dennis M. Ritchie",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Computing", "Logic", "Mathematics",
    ],
    opinionPdf: "#",
  },

   {
    number: "004",
    name: "An Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leirson, Ronald L. Rivest",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Computing", "Logic", "Mathematics",
    ],
    opinionPdf: "#",
  },

   {
    number: "005",
    name: "Algorithms Design",
    author: "John Kleinberg, Eva Tardos",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Computing", "Logic", "Mathematics",
    ],
    opinionPdf: "#",
  },

   {
    number: "006",
    name: "Issac Newton",
    author: "James Gleick",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "History of Science",
      "Scientific Thought",
      "Mathematics",
      "Biography",
    ],
    opinionPdf: "#",
  },

  {
    number: "007",
    name: "A first course in Probability",
    author: "Sheldon Ross",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Logic", "Mathematics"
    ],
    opinionPdf: "#",
  },

  {
    number: "008",
    name: "Elements of Discrete Mathematics",
    author: "C. L. Liu",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Logic", "Mathematics"
    ],
    opinionPdf: "#",
  },

  {
    number: "009",
    name: "Discrete Mathematics & its Applications",
    author: "K. H. Rosen",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Logic", "Mathematics"
    ],
    opinionPdf: "#",
  },

  {
    number: "010",
    name: "Programming languages, concepts & constructs",
    author: "Ravi Sethi",
    obtainedFrom: "NNCL, TIET-Patiala",
    subjects: [
      "Theoretical Computer Science", "Logic", "Mathematics"
    ],
    opinionPdf: "#",
  },

  // Add future books here.
  //
  // {
  //   number: "002",
  //   name: "Book Name",
  //   author: "Author Name",
  //   obtainedFrom: "Bookstore / Library / Gift",
  //   subjects: ["Mathematics", "Research"],
  //   opinionPdf: "/opinions/book-name.pdf",
  // },
]

/* ============================================================
   SMALL LABEL
   ============================================================ */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        font-mono
        text-[9px]
        uppercase
        tracking-[0.24em]
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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        inline-flex
        items-center
        border
        border-white/[0.08]
        bg-[#151b23]
        px-2.5
        py-1
        font-mono
        text-[8px]
        uppercase
        tracking-[0.14em]
        text-blue-100/60
        whitespace-nowrap
      "
    >
      {children}
    </span>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function ReadingListPage() {
  const [selectedTag, setSelectedTag] = useState<ReadingTag | "All">("All")

  const filteredBooks =
    selectedTag === "All"
      ? readingList
      : readingList.filter((book) =>
          book.subjects.includes(selectedTag)
        )

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="min-h-screen flex-1 bg-[#080b10] text-zinc-100">

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
                Reading List
              </span>

              <span className="status-dot h-2 w-2 rounded-full bg-blue-400" />

              <span className="text-sm text-slate-600">
                books worth reading
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
                {filteredBooks.length}{" "}
                {filteredBooks.length === 1 ? "book" : "books"}
              </span>

              <BookOpen className="h-4 w-4 text-zinc-600" />
            </div>
          </div>
        </header>

        {/* ======================================================
            PAGE FIELD
            ====================================================== */}

        <div className="relative">

          {/* subtle mathematical grid */}

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

            {/* ==================================================
                INTRODUCTION
                ================================================== */}

            <section
              className="
                border-b
                border-white/[0.08]
                py-20
                md:py-24
              "
            >
              <div className="max-w-4xl">

                {/* <Label>Reading Register</Label> */}

                <h1
                  className="
                    mt-6
                    font-serif
                    text-[56px]
                    leading-none
                    tracking-[-0.045em]
                    text-white
                    md:text-[86px]
                  "
                >
                  Reading List
                </h1>

                <p
                  className="
                    mt-8
                    max-w-2xl
                    font-serif
                    text-lg
                    leading-8
                    text-zinc-400
                    md:text-xl
                  "
                >
                  Books encountered in mathematics, computing,
                  science, philosophy, and the history of ideas.
                </p>

              </div>
            </section>

            {/* ==================================================
                FILTER
                ================================================== */}

            <section className="border-b border-white/[0.08] py-8">

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

                <div className="flex flex-wrap gap-2">

                  <button
                    type="button"
                    onClick={() => setSelectedTag("All")}
                    className={`
                      border
                      px-3
                      py-1.5
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      ${
                        selectedTag === "All"
                          ? "border-white/[0.18] bg-[#1b222b] text-zinc-200"
                          : "border-white/[0.08] bg-[#0f141a] text-zinc-600"
                      }
                    `}
                  >
                    All
                  </button>

                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`
                        border
                        px-3
                        py-1.5
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.14em]
                        ${
                          selectedTag === tag
                            ? "border-white/[0.18] bg-[#1b222b] text-zinc-200"
                            : "border-white/[0.08] bg-[#0f141a] text-zinc-600"
                        }
                      `}
                    >
                      {tag}
                    </button>
                  ))}

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
                  {selectedTag === "All"
                    ? "Complete register"
                    : `Filed under ${selectedTag}`}
                </span>

              </div>

            </section>

            {/* ==================================================
    READING TABLE
    ================================================== */}

<section className="pt-14">

  <div
    className="
      overflow-hidden
      border
      border-white/[0.10]
      bg-[#0d1218]
      shadow-[0_20px_80px_rgba(0,0,0,0.25)]
    "
  >

    <table className="w-full border-collapse">

      {/* ==================================================
          HEADER
          ================================================== */}

      <thead>
        <tr
          className="
            border-b
            border-white/[0.10]
            bg-[#111820]
          "
        >

          <th
            className="
              w-[70px]
              px-6
              py-5
              text-left
              font-mono
              text-[9px]
              font-normal
              uppercase
              tracking-[0.20em]
              text-zinc-500
            "
          >
            No.
          </th>

          <th
            className="
              px-5
              py-5
              text-left
              font-mono
              text-[9px]
              font-normal
              uppercase
              tracking-[0.20em]
              text-zinc-500
            "
          >
            Book
          </th>

          <th
            className="
              px-5
              py-5
              text-left
              font-mono
              text-[9px]
              font-normal
              uppercase
              tracking-[0.20em]
              text-zinc-500
            "
          >
            Author
          </th>

          <th
            className="
              px-5
              py-5
              text-left
              font-mono
              text-[9px]
              font-normal
              uppercase
              tracking-[0.20em]
              text-zinc-500
            "
          >
            Obtained From
          </th>

          <th
            className="
              px-5
              py-5
              text-left
              font-mono
              text-[9px]
              font-normal
              uppercase
              tracking-[0.20em]
              text-zinc-500
            "
          >
            Converging Subject
          </th>

          <th
            className="
              w-[120px]
              px-6
              py-5
              text-left
              font-mono
              text-[9px]
              font-normal
              uppercase
              tracking-[0.20em]
              text-zinc-500
            "
          >
            Opinion
          </th>

        </tr>
      </thead>


      {/* ==================================================
          BODY
          ================================================== */}

      <tbody>

        {filteredBooks.map((book, index) => (

          <tr
            key={book.number}
            className="
              group
              border-b
              border-white/[0.07]
              transition-all
              duration-200
              hover:bg-[#141c25]
            "
          >

            {/* ==================================================
                NUMBER
                ================================================== */}

            <td
              className="
                px-6
                py-8
                align-top
              "
            >
              <span
                className="
                  inline-flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  border
                  border-white/[0.10]
                  bg-[#111820]
                  px-2
                  font-mono
                  text-[9px]
                  tracking-[0.08em]
                  text-zinc-500
                  transition-colors
                  group-hover:border-blue-300/20
                  group-hover:text-blue-200/70
                "
              >
                {book.number}
              </span>
            </td>


            {/* ==================================================
                BOOK
                ================================================== */}

            <td
              className="
                min-w-[260px]
                px-5
                py-8
                align-top
              "
            >

              <div className="flex items-start gap-4">

                {/* small vertical marker */}

                <div
                  className="
                    mt-1
                    h-12
                    w-px
                    shrink-0
                    bg-white/[0.10]
                    transition-colors
                    group-hover:bg-blue-300/50
                  "
                />

                <div>

                  <p
                    className="
                      font-serif
                      text-[23px]
                      leading-tight
                      tracking-[-0.02em]
                      text-zinc-100
                      transition-colors
                      group-hover:text-white
                    "
                  >
                    {book.name}
                  </p>

                  <p
                    className="
                      mt-2
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.17em]
                      text-zinc-700
                    "
                  >
                    Book
                  </p>

                </div>

              </div>

            </td>


            {/* ==================================================
                AUTHOR
                ================================================== */}

            <td
              className="
                min-w-[170px]
                px-5
                py-8
                align-top
              "
            >

              <p
                className="
                  font-serif
                  text-[16px]
                  leading-6
                  text-zinc-300
                "
              >
                {book.author}
              </p>

            </td>


            {/* ==================================================
                OBTAINED FROM
                ================================================== */}

            <td
              className="
                min-w-[150px]
                px-5
                py-8
                align-top
              "
            >

              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.10em]
                  text-zinc-500
                "
              >
                {book.obtainedFrom}
              </span>

            </td>


            {/* ==================================================
                CONVERGING SUBJECT
                ================================================== */}

            <td
              className="
                min-w-[300px]
                px-5
                py-8
                align-top
              "
            >

              <div className="flex max-w-[390px] flex-wrap gap-2">

                {book.subjects.map((subject) => (

                  <span
                    key={subject}
                    className="
                      inline-flex
                      items-center
                      border
                      border-blue-200/[0.12]
                      bg-[#151f2a]
                      px-3
                      py-1.5
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.13em]
                      text-blue-100/75
                      shadow-[inset_0_0_20px_rgba(120,160,220,0.025)]
                      transition-all
                      group-hover:border-blue-200/[0.20]
                      group-hover:bg-[#182432]
                      group-hover:text-blue-100
                    "
                  >
                    {subject}
                  </span>

                ))}

              </div>

            </td>


            {/* ==================================================
                OPINION
                ================================================== */}

            <td
              className="
                px-6
                py-8
                align-top
              "
            >

              {book.opinionPdf !== "#" ? (

                <a
                  href={book.opinionPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    border
                    border-blue-200/[0.16]
                    bg-[#151e28]
                    px-3
                    py-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-blue-100/70
                    transition-all
                    hover:border-blue-200/[0.30]
                    hover:bg-[#1a2735]
                    hover:text-blue-100
                  "
                >
                  PDF
                  <ExternalLink className="h-3 w-3" />
                </a>

              ) : (

                <span
                  className="
                    font-mono
                    text-[9px]
                    tracking-[0.12em]
                    text-zinc-700
                  "
                >
                  —
                </span>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</section>

            {/* ==================================================
                FOOTNOTE
                ================================================== */}

            {/* <section className="mt-16 border-t border-white/[0.08] pt-7">

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                <p
                  className="
                    font-serif
                    text-sm
                    italic
                    text-zinc-600
                  "
                >
                  Opinions are maintained separately as written notes.
                </p>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.20em]
                    text-zinc-700
                  "
                >
                  JADE · READING · 1806
                </span>

              </div>

            </section> */}

          </div>
        </div>

      </main>
    </SidebarProvider>
  )
}