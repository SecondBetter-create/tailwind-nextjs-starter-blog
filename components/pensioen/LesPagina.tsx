'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { lessen } from '@/lib/pensioen/leerroute'
import { LEERROUTE_STORAGE_KEY, readCompletedLessons } from '@/lib/pensioen/voortgang'
import LeerrouteKaart from '@/components/pensioen/LeerrouteKaart'

type LesPaginaProps = {
  lesId: string
}

const hoofdstukVoorLes = (index: number) => {
  if (index < 3) return { nummer: 1, titel: 'Je loon en belasting' }
  if (index < 7) return { nummer: 2, titel: 'Inkomen voor later' }
  if (index < 8) return { nummer: 3, titel: 'Je eigen vermogen' }
  return { nummer: 4, titel: 'Geld in de samenleving' }
}

export default function LesPagina({ lesId }: LesPaginaProps) {
  const lesIndex = lessen.findIndex((item) => item.id === lesId)
  const les = lessen[lesIndex]
  const vorigeLes = lessen[lesIndex - 1]
  const volgendeLes = lessen[lesIndex + 1]
  const hoofdstuk = hoofdstukVoorLes(lesIndex)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const complete = completedLessons.includes(lesId)

  useEffect(() => {
    setCompletedLessons(readCompletedLessons())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    try {
      window.localStorage.setItem(LEERROUTE_STORAGE_KEY, JSON.stringify(completedLessons))
    } catch (error) {
      console.warn('Leerroutevoortgang kon niet worden opgeslagen.', error)
    }
  }, [completedLessons, ready])

  function answerQuestion(questionId: string, selected: number) {
    const question = les.vragen.find((item) => item.id === questionId)
    if (!question || answers[questionId] === question.correct) return

    const nextAnswers = { ...answers, [questionId]: selected }
    setAnswers(nextAnswers)

    if (les.vragen.every((item) => nextAnswers[item.id] === item.correct)) {
      setCompletedLessons((current) => (current.includes(lesId) ? current : [...current, lesId]))
    }
  }

  const progress = Math.round((completedLessons.length / lessen.length) * 100)

  return (
    <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Je plek in de module" className="mb-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/modules"
            className="font-semibold text-blue-800 hover:underline dark:text-blue-200"
          >
            ← Naar modules en voortgang
          </Link>
          <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
            Les {les.nummer} van {lessen.length}
          </span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800"
          role="progressbar"
          aria-label={`Les ${les.nummer} van ${lessen.length}`}
          aria-valuemin={1}
          aria-valuemax={lessen.length}
          aria-valuenow={lesIndex + 1}
        >
          <div
            className="h-full rounded-full bg-blue-700 transition-[width] dark:bg-blue-300"
            style={{ width: `${((lesIndex + 1) / lessen.length) * 100}%` }}
          />
        </div>
      </nav>

      <section className="mb-7 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold tracking-wider text-blue-700 uppercase dark:text-blue-300">
              Hoofdstuk {hoofdstuk.nummer} · {hoofdstuk.titel}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {completedLessons.length} van {lessen.length} lessen afgerond · {progress}%
            </p>
          </div>
          {complete && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
              Les afgerond ✓
            </span>
          )}
        </div>
        <div className="overflow-x-auto pb-1">
          <ol className="flex min-w-max items-center" aria-label="Lessen in volgorde">
            {lessen.map((item, index) => {
              const isComplete = completedLessons.includes(item.id)
              const isCurrent = item.id === lesId

              return (
                <li key={item.id} className="flex items-center">
                  <Link
                    href={`/leren/${item.id}`}
                    aria-current={isCurrent ? 'step' : undefined}
                    aria-label={`Les ${item.nummer}: ${item.titel}${isComplete ? ', afgerond' : ''}${isCurrent ? ', huidige les' : ''}`}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-black transition ${
                      isCurrent
                        ? 'border-blue-800 bg-blue-800 text-white ring-4 ring-blue-100 dark:border-blue-200 dark:bg-blue-200 dark:text-blue-950 dark:ring-blue-950'
                        : isComplete
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-gray-300 bg-white text-gray-600 hover:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300'
                    }`}
                  >
                    {isComplete ? '✓' : item.nummer}
                  </Link>
                  {index < lessen.length - 1 && (
                    <span
                      className={`h-0.5 w-4 sm:w-7 ${
                        index < lesIndex ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <header className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 p-6 text-white sm:p-9">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-blue-200">
          <span>LES {les.nummer}</span>
          <span aria-hidden="true">·</span>
          <span>{les.duur}</span>
          <span aria-hidden="true">·</span>
          <span>Hoofdstuk {hoofdstuk.nummer} van 4</span>
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
          {les.titel}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-200">{les.intro}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {les.leerdoelen.map((doel, index) => (
            <span
              key={doel}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm text-white"
            >
              <span className="mr-2 font-black text-emerald-300">{index + 1}</span>
              {doel}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-6">
          <section
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 dark:border-gray-700 dark:bg-gray-900"
            aria-labelledby="les-uitleg"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 font-black text-blue-900 dark:bg-blue-950 dark:text-blue-200">
                1
              </span>
              <div>
                <p className="text-xs font-bold tracking-wider text-blue-700 uppercase dark:text-blue-300">
                  Begrijp het verhaal
                </p>
                <h2 id="les-uitleg" className="text-xl font-black">
                  De uitleg
                </h2>
              </div>
            </div>
            <ol className="space-y-5">
              {les.onderdelen.map((onderdeel, index) => (
                <li key={onderdeel.kop} className="relative pl-12">
                  {index < les.onderdelen.length - 1 && (
                    <span
                      className="absolute top-10 bottom-0 left-4 w-px bg-blue-200 dark:bg-blue-900"
                      aria-hidden="true"
                    />
                  )}
                  <span className="absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-sm font-black text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                    {index + 1}
                  </span>
                  <h3 className="font-bold">{onderdeel.kop}</h3>
                  <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-200">
                    {onderdeel.tekst}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-5 dark:bg-amber-950">
            <p className="text-xs font-bold tracking-wider text-amber-900 uppercase dark:text-amber-200">
              Dit wil je onthouden
            </p>
            <p className="mt-2 text-lg leading-relaxed font-bold">{les.onthouden}</p>
          </aside>

          <section
            className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7"
            aria-labelledby={`quiz-${les.id}`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300 font-black text-emerald-950">
                2
              </span>
              <div>
                <p className="text-xs font-bold tracking-wider text-emerald-300 uppercase">
                  Controleer jezelf
                </p>
                <h2 id={`quiz-${les.id}`} className="text-xl font-black">
                  Kennischeck
                </h2>
              </div>
            </div>
            <div className="mt-5 space-y-7">
              {les.vragen.map((vraag, vraagIndex) => {
                const selected = answers[vraag.id]
                const goed = selected === vraag.correct

                return (
                  <fieldset key={vraag.id}>
                    <legend className="font-bold">
                      {vraagIndex + 1}. {vraag.vraag}
                    </legend>
                    <div className="mt-3 space-y-2">
                      {vraag.opties.map((optie, index) => (
                        <button
                          type="button"
                          key={optie}
                          onClick={() => answerQuestion(vraag.id, index)}
                          aria-pressed={selected === index}
                          className={`w-full rounded-xl border p-3 text-left text-sm leading-relaxed transition-colors ${
                            selected === index
                              ? goed
                                ? 'border-emerald-300 bg-emerald-900'
                                : 'border-rose-300 bg-rose-950'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          {optie}
                        </button>
                      ))}
                    </div>
                    {selected !== undefined && (
                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          goed ? 'text-emerald-200' : 'text-amber-200'
                        }`}
                        role="status"
                      >
                        <strong>{goed ? 'Goed!' : 'Nog niet.'}</strong> {vraag.uitleg}
                        {!goed && ' Kies gerust opnieuw.'}
                      </p>
                    )}
                  </fieldset>
                )
              })}
            </div>
            {complete && (
              <p
                className="mt-6 rounded-xl bg-emerald-900 p-4 font-semibold text-emerald-100"
                role="status"
              >
                Mooi, deze les is afgerond. Je voortgang is op dit apparaat bewaard.
              </p>
            )}
          </section>

          <Link
            href={
              les.verdieping.href.startsWith('#')
                ? `/oefenen${les.verdieping.href}`
                : les.verdieping.href
            }
            className="inline-flex font-bold text-blue-800 underline underline-offset-4 hover:text-blue-600 dark:text-blue-200"
          >
            {les.verdieping.tekst}{' '}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>

          <nav aria-label="Vorige of volgende les" className="grid gap-3 sm:grid-cols-2">
            {vorigeLes ? (
              <Link
                href={`/leren/${vorigeLes.id}`}
                className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 dark:border-gray-700"
              >
                <span className="block text-xs font-bold text-gray-600 dark:text-gray-300">
                  ← VORIGE LES · {vorigeLes.nummer}
                </span>
                <span className="mt-1 block font-bold">{vorigeLes.titel}</span>
              </Link>
            ) : (
              <Link
                href="/modules"
                className="rounded-xl border border-gray-200 p-4 hover:border-blue-400 dark:border-gray-700"
              >
                <span className="block text-xs font-bold text-gray-600 dark:text-gray-300">
                  ← CURSUSOVERZICHT
                </span>
                <span className="mt-1 block font-bold">Bekijk de hele route</span>
              </Link>
            )}
            {volgendeLes ? (
              <Link
                href={`/leren/${volgendeLes.id}`}
                className="rounded-xl border border-blue-300 bg-blue-50 p-4 text-right hover:border-blue-600 dark:border-blue-900 dark:bg-blue-950"
              >
                <span className="block text-xs font-bold text-blue-800 dark:text-blue-200">
                  VOLGENDE LES · {volgendeLes.nummer} →
                </span>
                <span className="mt-1 block font-bold">{volgendeLes.titel}</span>
              </Link>
            ) : (
              <Link
                href="/oefenen"
                className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-right hover:border-emerald-600 dark:border-emerald-900 dark:bg-emerald-950"
              >
                <span className="block text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  LAATSTE STAP →
                </span>
                <span className="mt-1 block font-bold">Ga verder naar het oefenlab</span>
              </Link>
            )}
          </nav>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-xs font-bold tracking-wider text-gray-600 uppercase dark:text-gray-300">
              In deze les
            </p>
            <ol className="mt-3 space-y-2 text-sm">
              <li>1. Uitleg in stappen</li>
              <li>2. Onthoudpunt</li>
              <li>3. Kennischeck</li>
              <li>4. Verder in de leerroute</li>
            </ol>
            <p className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
              Ongeveer {les.duur} · {les.vragen.length} kennisvragen
            </p>
          </section>
          <details className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <summary className="cursor-pointer font-bold">Toon de hele leerroute</summary>
            <div className="mt-4">
              <LeerrouteKaart completedLessons={completedLessons} currentLessonId={lesId} />
            </div>
          </details>
        </aside>
      </div>
    </main>
  )
}
