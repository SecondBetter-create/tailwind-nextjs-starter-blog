'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { belastingBasisHoofdstukken } from '@/lib/pensioen/belastingBasis'
import { readBelastingBasisProgress } from '@/lib/pensioen/voortgang'

export default function BelastingBasisStartkaart() {
  const [completed, setCompleted] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setCompleted(readBelastingBasisProgress())
    setReady(true)
  }, [])

  const nextChapter = belastingBasisHoofdstukken.find(
    (hoofdstuk) => !completed.includes(hoofdstuk.id)
  )
  const progress = Math.round((completed.length / belastingBasisHoofdstukken.length) * 100)

  return (
    <section className="overflow-hidden rounded-3xl border border-blue-200 bg-white dark:border-blue-900 dark:bg-gray-900">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-950 dark:bg-amber-950 dark:text-amber-100">
              MODULE 0 · START HIER
            </span>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Basis · 14 hoofdstukken + eindopdracht
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">
            Eerst begrijpen hoe belasting werkt
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
            Volg een interactieve route van je eerste loonstrook naar box 1, 2 en 3. Probeer de
            voorbeelden en ontdek welke vragen je bij je eigen aangifte kunt stellen.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <span className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
              Klikbare loonstrook
            </span>
            <span className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
              Interactieve boxen
            </span>
            <span className="rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
              Eigen profieloverzicht
            </span>
          </div>
          <Link
            href="/leren/belasting-basis"
            className="mt-6 inline-flex items-center rounded-xl bg-blue-800 px-5 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-950"
          >
            {completed.length ? 'Ga verder met Module 0' : 'Start met Module 0'}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 p-6 text-white sm:p-8">
          <div className="flex items-end justify-between gap-3">
            <p className="text-sm font-bold text-slate-200">Modulevoortgang</p>
            <p className="text-2xl font-black">{ready ? `${progress}%` : '—'}</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-emerald-300"
              style={{ width: `${ready ? progress : 0}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-200">
            {ready
              ? `${completed.length} van ${belastingBasisHoofdstukken.length} stappen afgerond`
              : 'Voortgang laden…'}
          </p>
          <p className="mt-5 text-xs font-bold tracking-wider text-emerald-300 uppercase">
            Volgende stap
          </p>
          <p className="mt-1 font-bold">
            {ready ? (nextChapter?.titel ?? 'Module 0 afgerond') : 'Module laden…'}
          </p>
        </div>
      </div>
    </section>
  )
}
