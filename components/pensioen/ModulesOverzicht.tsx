'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { belastingBasisHoofdstukken } from '@/lib/pensioen/belastingBasis'
import { lessen } from '@/lib/pensioen/leerroute'
import { readBelastingBasisProgress, readCompletedLessons } from '@/lib/pensioen/voortgang'

export default function ModulesOverzicht() {
  const [completedTaxChapters, setCompletedTaxChapters] = useState<string[]>([])
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const refreshProgress = () => {
      setCompletedTaxChapters(readBelastingBasisProgress())
      setCompletedLessons(readCompletedLessons())
      setReady(true)
    }

    refreshProgress()
    window.addEventListener('pageshow', refreshProgress)
    window.addEventListener('focus', refreshProgress)

    return () => {
      window.removeEventListener('pageshow', refreshProgress)
      window.removeEventListener('focus', refreshProgress)
    }
  }, [])

  const nextTaxChapter = belastingBasisHoofdstukken.find(
    (chapter) => !completedTaxChapters.includes(chapter.id)
  )
  const nextLesson = lessen.find((lesson) => !completedLessons.includes(lesson.id))
  const taxProgress = Math.round(
    (completedTaxChapters.length / belastingBasisHoofdstukken.length) * 100
  )
  const lessonProgress = Math.round((completedLessons.length / lessen.length) * 100)

  const modules = [
    {
      number: '00',
      label: 'Eerst de basis',
      title: 'Begrijp belasting betalen',
      description:
        'Volg je loon van brutobedrag naar loonheffing en aangifte. Ontdek wat de drie boxen betekenen en hoe belasting samenhangt met sparen en pensioen.',
      topics: ['Loonstrook en loonheffing', 'Teruggave of bijbetalen', 'Box 1, 2 en 3'],
      duration: 'Ongeveer 45 minuten',
      completed: completedTaxChapters.length,
      total: belastingBasisHoofdstukken.length,
      progress: taxProgress,
      nextTitle: nextTaxChapter?.titel,
      href: '/leren/belasting-basis',
      action: nextTaxChapter
        ? completedTaxChapters.length > 0
          ? 'Ga verder met Module 0'
          : 'Start Module 0'
        : 'Bekijk Module 0 opnieuw',
    },
    {
      number: '01',
      label: 'Daarna het grotere geheel',
      title: 'Je geld, zekerheid en pensioen',
      description:
        'Leer waar geld naartoe stroomt, hoe AOW en werkgeverspensioen verschillen en welke keuzes je hebt voor later.',
      topics: [
        'Geldstromen en sociale zekerheid',
        'AOW en pensioen via werk',
        'Sparen, beleggen en aanvullen',
      ],
      duration: `Ongeveer ${lessen.reduce((total, lesson) => total + Number.parseInt(lesson.duur, 10), 0)} minuten`,
      completed: completedLessons.length,
      total: lessen.length,
      progress: lessonProgress,
      nextTitle: nextLesson?.titel,
      href: nextLesson ? `/leren/${nextLesson.id}` : '/leren/geldstromen',
      action: nextLesson
        ? completedLessons.length > 0
          ? 'Ga verder met Module 1'
          : 'Start Module 1'
        : 'Bekijk Module 1 opnieuw',
    },
  ]

  return (
    <div className="mt-9 space-y-10">
      <section
        className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8 dark:border-blue-900 dark:bg-blue-950"
        aria-labelledby="website-route"
      >
        <p className="text-sm font-black tracking-wider text-blue-800 uppercase dark:text-blue-200">
          Zo vind je je weg
        </p>
        <h2 id="website-route" className="mt-2 text-2xl font-black">
          Eerst leren, dan bekijken of oefenen
        </h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              title: '1. Kies een module',
              text: 'Volg de aanbevolen volgorde. Je voortgang per module blijft in deze browser bewaard.',
            },
            {
              title: '2. Bekijk de uitleg',
              text: 'Elke les bouwt voort op de vorige en sluit af met vragen om te controleren wat je begrijpt.',
            },
            {
              title: '3. Ga zelf aan de slag',
              text: 'Gebruik het Oefenlab voor simulaties. De pagina Pensioen geeft extra uitleg over geldstromen en pijlers.',
            },
          ].map((step) => (
            <li key={step.title} className="rounded-2xl bg-white p-4 dark:bg-gray-900">
              <h3 className="font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="modules-heading">
        <div className="mb-5">
          <p className="text-sm font-black tracking-wider text-emerald-800 uppercase dark:text-emerald-200">
            Jouw leerpad
          </p>
          <h2 id="modules-heading" className="mt-2 text-3xl font-black">
            Modules
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
            Begin bij Module 0 en ga daarna verder met Module 1. Je kunt beide modules openen; de
            voortgang helpt je zien waar je gebleven bent.
          </p>
        </div>

        <ol className="space-y-5">
          {modules.map((module) => (
            <li key={module.number}>
              <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-black text-blue-950 dark:bg-blue-900 dark:text-blue-100">
                        MODULE {module.number}
                      </span>
                      <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                        {module.label}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {module.duration}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black sm:text-3xl">{module.title}</h3>
                    <p className="mt-3 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
                      {module.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {module.topics.map((topic) => (
                        <li
                          key={topic}
                          className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm text-gray-600 dark:text-gray-300">
                      {ready
                        ? module.nextTitle
                          ? `Volgende: ${module.nextTitle}`
                          : 'Alle stappen afgerond'
                        : 'Voortgang laden…'}
                    </p>
                    <Link
                      href={module.href}
                      className="mt-4 inline-flex items-center rounded-xl bg-blue-800 px-5 py-3 font-bold text-white transition hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-950 dark:hover:bg-blue-100"
                    >
                      {module.action}
                      <span className="ml-2" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                  <aside className="flex flex-col justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 p-6 text-white sm:p-8">
                    <div className="flex items-end justify-between gap-3">
                      <p className="text-sm font-bold text-slate-200">Jouw voortgang</p>
                      <p className="text-3xl font-black">{ready ? `${module.progress}%` : '—'}</p>
                    </div>
                    <div
                      className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/20"
                      role="progressbar"
                      aria-label={`Voortgang Module ${module.number}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={ready ? module.progress : 0}
                    >
                      <div
                        className="h-full rounded-full bg-emerald-300 transition-[width] duration-500"
                        style={{ width: `${ready ? module.progress : 0}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-slate-200">
                      {ready
                        ? `${module.completed} van ${module.total} stappen afgerond`
                        : 'Voortgang laden…'}
                    </p>
                  </aside>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="rounded-3xl border-2 border-dashed border-gray-300 p-6 sm:p-8 dark:border-gray-700"
        aria-labelledby="meer-modules"
      >
        <p className="text-sm font-black tracking-wider text-gray-600 uppercase dark:text-gray-300">
          Ruimte voor uitbreiding
        </p>
        <h2 id="meer-modules" className="mt-2 text-2xl font-black">
          Meer modules volgen
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
          Deze leeromgeving groeit stap voor stap. Nieuwe modules kunnen hier worden toegevoegd
          zonder dat je bestaande voortgang of de logische leerroute verandert.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Andere plekken op de website">
        <Link
          href="/pensioen"
          className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-500 dark:border-gray-700"
        >
          <h2 className="font-black">Pensioenoverzicht</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            Bekijk de geldstromen en lees extra uitleg over AOW en de drie pensioenpijlers.
          </p>
          <span className="mt-3 inline-block font-bold text-blue-800 dark:text-blue-200">
            Naar Pensioen →
          </span>
        </Link>
        <Link
          href="/oefenen"
          className="rounded-2xl border border-gray-200 p-5 transition hover:border-emerald-500 dark:border-gray-700"
        >
          <h2 className="font-black">Oefenlab</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
            Reken met voorbeelden voor loonheffing, AOW, pensioenopbouw en vermogen.
          </p>
          <span className="mt-3 inline-block font-bold text-emerald-800 dark:text-emerald-200">
            Naar Oefenlab →
          </span>
        </Link>
      </section>
    </div>
  )
}
