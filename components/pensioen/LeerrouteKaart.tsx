import Link from 'next/link'
import { lessen } from '@/lib/pensioen/leerroute'

type LeerrouteKaartProps = {
  completedLessons: string[]
  currentLessonId?: string
}

const hoofdstukken = [
  {
    titel: 'Je loon en belasting',
    uitleg: 'Van brutoloon naar de jaarlijkse afrekening.',
    start: 0,
    eind: 3,
  },
  {
    titel: 'Inkomen voor later',
    uitleg: 'AOW, pensioen via werk en zelf aanvullen.',
    start: 3,
    eind: 7,
  },
  { titel: 'Je eigen vermogen', uitleg: 'Sparen, beleggen en box 3 begrijpen.', start: 7, eind: 8 },
  {
    titel: 'Geld in de samenleving',
    uitleg: 'Sociale zekerheid, geldstromen en sectoren.',
    start: 8,
    eind: 11,
  },
]

export default function LeerrouteKaart({ completedLessons, currentLessonId }: LeerrouteKaartProps) {
  return (
    <div className="space-y-5">
      {hoofdstukken.map((hoofdstuk, hoofdstukIndex) => {
        const hoofdstukLessen = lessen.slice(hoofdstuk.start, hoofdstuk.eind)
        const afgerond = hoofdstukLessen.filter((les) => completedLessons.includes(les.id)).length

        return (
          <section
            key={hoofdstuk.titel}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
            aria-label={`Hoofdstuk ${hoofdstukIndex + 1}: ${hoofdstuk.titel}`}
          >
            <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-950">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-800 font-black text-white dark:bg-blue-200 dark:text-blue-950">
                {hoofdstukIndex + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-black">{hoofdstuk.titel}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{hoofdstuk.uitleg}</p>
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {afgerond}/{hoofdstukLessen.length} klaar
              </span>
            </div>
            <ol className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {hoofdstukLessen.map((les) => {
                const isComplete = completedLessons.includes(les.id)
                const isCurrent = les.id === currentLessonId

                return (
                  <li key={les.id}>
                    <Link
                      href={`/leren/${les.id}`}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`flex h-full min-h-16 items-center gap-3 rounded-xl border p-3 transition ${
                        isCurrent
                          ? 'border-blue-700 bg-blue-50 ring-2 ring-blue-200 dark:border-blue-300 dark:bg-blue-950 dark:ring-blue-900'
                          : 'border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-500'
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${
                          isComplete
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                              ? 'bg-blue-800 text-white dark:bg-blue-200 dark:text-blue-950'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {isComplete ? '✓' : les.nummer}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm leading-snug font-bold">{les.titel}</span>
                        <span className="mt-1 block text-xs text-gray-600 dark:text-gray-300">
                          {les.duur}
                          {isCurrent ? ' · Je bent hier' : isComplete ? ' · Afgerond' : ''}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
