'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { lessen } from '@/lib/pensioen/leerroute'
import { readCompletedLessons } from '@/lib/pensioen/voortgang'
import LeerrouteKaart from '@/components/pensioen/LeerrouteKaart'

export default function LeerrouteCursus() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setCompletedLessons(readCompletedLessons())
    setReady(true)
  }, [])

  const nextLesson = lessen.find((les) => !completedLessons.includes(les.id))
  const completedCount = completedLessons.length
  const progress = Math.round((completedCount / lessen.length) * 100)

  return (
    <div className="mt-9 space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 p-6 text-white sm:p-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_15rem] md:items-center">
          <div>
            <p className="text-sm font-bold tracking-wider text-emerald-300 uppercase">
              De route in vier hoofdstukken
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Eerst je loon. Dan je toekomst. Daarna het grotere geheel.
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-200">
              Elke les bouwt voort op de vorige. Je kunt ook rechtstreeks naar een onderwerp gaan;
              de kaart laat steeds zien waar dat onderwerp in het verhaal past.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-200">Jouw voortgang</span>
              <span className="text-xl font-black">{ready ? `${progress}%` : '—'}</span>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"
              role="progressbar"
              aria-label="Voortgang van de leerroute"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={ready ? progress : 0}
            >
              <div
                className="h-full rounded-full bg-emerald-300 transition-[width] duration-500"
                style={{ width: `${ready ? progress : 0}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-200">
              {ready
                ? `${completedCount} van ${lessen.length} lessen afgerond`
                : 'Voortgang laden…'}
            </p>
          </div>
        </div>
      </section>

      <LeerrouteKaart
        completedLessons={completedLessons}
        currentLessonId={nextLesson?.id ?? lessen[lessen.length - 1].id}
      />

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href={nextLesson ? `/leren/${nextLesson.id}` : `/leren/${lessen[0].id}`}
          className="group rounded-2xl border border-blue-200 bg-blue-50 p-5 transition hover:border-blue-500 dark:border-blue-900 dark:bg-blue-950"
        >
          <p className="text-sm font-bold tracking-wider text-blue-800 uppercase dark:text-blue-200">
            {completedCount ? 'Verder met je verhaal' : 'Begin hier'}
          </p>
          <h2 className="mt-2 text-xl font-black">
            {nextLesson ? nextLesson.titel : 'Herhaal de eerste les'}
          </h2>
          <span className="mt-4 inline-flex font-bold text-blue-800 group-hover:underline dark:text-blue-200">
            Open les{' '}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </span>
        </Link>
        <Link
          href="/oefenen"
          className="group rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-500 dark:border-emerald-900 dark:bg-emerald-950"
        >
          <p className="text-sm font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-200">
            Oefenen en ontdekken
          </p>
          <h2 className="mt-2 text-xl font-black">Probeer de simulaties</h2>
          <span className="mt-4 inline-flex font-bold text-emerald-800 group-hover:underline dark:text-emerald-200">
            Naar het oefenlab{' '}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </span>
        </Link>
      </section>
    </div>
  )
}
