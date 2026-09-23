"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

/* ============================================================
   JADE — COMPETITIVE EXAMINATIONS

   A record of competitive examinations undertaken,
   with results and optional personal commentary.

   Status:
   - Preparing
   - Scheduled
   - Appeared
   - Result Awaited
   - Completed

   Commentary is optional.
   ============================================================ */

type ExaminationStatus =
  | "Preparing"
  | "Scheduled"
  | "Appeared"
  | "Result Awaited"
  | "Completed"

type ExaminationEntry = {
  number: string
  examination: string
  year: string
  status: ExaminationStatus
  score: string
  rank: string
  percentile: string
  commentary: string
}

/* ============================================================
   EXAMINATION REGISTER
   ============================================================ */

const examinations: ExaminationEntry[] = [
  {
    number: "001",
    examination: "GATE CS/IT",
    year: "2027",
    status: "Preparing",
    score: "—",
    rank: "—",
    percentile: "—",
    commentary: "",
  },

  {
    number: "002",
    examination: "CMI Entrance Examination",
    year: "2027",
    status: "Preparing",
    score: "—",
    rank: "—",
    percentile: "—",
    commentary: "",
  },

  {
    number: "003",
    examination: "ISI Admission Test",
    year: "2027",
    status: "Preparing",
    score: "—",
    rank: "—",
    percentile: "—",
    commentary: "",
  },

  {
    number: "004",
    examination: "JEST",
    year: "2027",
    status: "Preparing",
    score: "—",
    rank: "—",
    percentile: "—",
    commentary: "",
  },

  {
    number: "005",
    examination: "TIFR Entrance Examination",
    year: "2027",
    status: "Preparing",
    score: "—",
    rank: "—",
    percentile: "—",
    commentary: "",
  },
]

/* ============================================================
   STATUS
   ============================================================ */

function Status({ status }: { status: ExaminationStatus }) {
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
      {status}
    </span>
  )
}

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
   PAGE
   ============================================================ */

export default function ExaminationsPage() {
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
                Competitive Examinations
              </span>

              <span className="status-dot h-2 w-2 rounded-full bg-blue-400" />

              <span className="text-sm text-slate-600">
                celebration of intellectual rigor
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
                  text-zinc-600
                  md:block
                "
              >
                {examinations.length} examinations
              </span>

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
                  Competitive
                  <br />
                  Examinations
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
                  A record of competitive examinations undertaken
                  in the pursuit of mathematics, computer science,
                  and research.
                </p>

              </div>

            </section>

            {/* ==================================================
                REGISTER
                ================================================== */}

            <section className="pt-14">

              <div
                className="
                  overflow-x-auto
                  border
                  border-white/[0.10]
                  bg-[#0d1218]
                  shadow-[0_20px_80px_rgba(0,0,0,0.25)]
                "
              >

                <table className="w-full min-w-[1100px] border-collapse">

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
                          min-w-[250px]
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
                        Examination
                      </th>

                      <th
                        className="
                          w-[90px]
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
                        Year
                      </th>

                      <th
                        className="
                          w-[140px]
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
                        Status
                      </th>

                      <th
                        className="
                          w-[120px]
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
                        Score
                      </th>

                      <th
                        className="
                          w-[120px]
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
                        Rank
                      </th>

                      <th
                        className="
                          w-[130px]
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
                        Percentile
                      </th>

                      <th
                        className="
                          min-w-[280px]
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
                        Commentary
                      </th>

                    </tr>

                  </thead>

                  {/* ==================================================
                      BODY
                      ================================================== */}

                  <tbody>

                    {examinations.map((exam) => (

                      <tr
                        key={exam.number}
                        className="
                          group
                          border-b
                          border-white/[0.07]
                          transition-all
                          duration-200
                          hover:bg-[#141c25]
                        "
                      >

                        {/* NUMBER */}

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
                            {exam.number}
                          </span>

                        </td>

                        {/* EXAMINATION */}

                        <td
                          className="
                            px-5
                            py-8
                            align-top
                          "
                        >

                          <div className="flex items-start gap-4">

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
                                  text-[21px]
                                  leading-tight
                                  tracking-[-0.02em]
                                  text-zinc-100
                                  transition-colors
                                  group-hover:text-white
                                "
                              >
                                {exam.examination}
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
                                Examination
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* YEAR */}

                        <td
                          className="
                            px-5
                            py-8
                            align-top
                          "
                        >

                          <span
                            className="
                              font-mono
                              text-[11px]
                              tracking-[0.10em]
                              text-zinc-400
                            "
                          >
                            {exam.year}
                          </span>

                        </td>

                        {/* STATUS */}

                        <td
                          className="
                            px-5
                            py-8
                            align-top
                          "
                        >
                          <Status status={exam.status} />
                        </td>

                        {/* SCORE */}

                        <td
                          className="
                            px-5
                            py-8
                            align-top
                          "
                        >

                          <span
                            className="
                              font-mono
                              text-[11px]
                              tracking-[0.08em]
                              text-zinc-400
                            "
                          >
                            {exam.score}
                          </span>

                        </td>

                        {/* RANK */}

                        <td
                          className="
                            px-5
                            py-8
                            align-top
                          "
                        >

                          <span
                            className="
                              font-mono
                              text-[11px]
                              tracking-[0.08em]
                              text-zinc-400
                            "
                          >
                            {exam.rank}
                          </span>

                        </td>

                        {/* PERCENTILE */}

                        <td
                          className="
                            px-5
                            py-8
                            align-top
                          "
                        >

                          <span
                            className="
                              font-mono
                              text-[11px]
                              tracking-[0.08em]
                              text-zinc-400
                            "
                          >
                            {exam.percentile}
                          </span>

                        </td>

                        {/* COMMENTARY */}

                        <td
                          className="
                            px-6
                            py-8
                            align-top
                          "
                        >

                          {exam.commentary ? (

                            <p
                              className="
                                max-w-[360px]
                                font-serif
                                text-[14px]
                                leading-6
                                text-zinc-400
                              "
                            >
                              {exam.commentary}
                            </p>

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

            {/* <section
              className="
                mt-16
                border-t
                border-white/[0.08]
                pt-7
              "
            >

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
                  Results are recorded as they become available.
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
                  JADE · EXAMINATIONS · 1806
                </span>

              </div>

            </section> */}

          </div>

        </div>

      </main>
    </SidebarProvider>
  )
}