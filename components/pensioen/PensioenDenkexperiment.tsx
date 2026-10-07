'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import NavigatieKnop from '@/components/NavigatieKnop'

type Gebeurtenis = {
  id: string
  pictogram: string
  titel: string
  bedrag: number
  uitleg: string
}

type Tijdvoorkeur = 'nu' | 'later' | null

const gebeurtenissen: Gebeurtenis[] = [
  {
    id: 'wasmachine',
    pictogram: '🧺',
    titel: 'De wasmachine gaat kapot',
    bedrag: 900,
    uitleg: 'Een onverwachte maar noodzakelijke uitgave.',
  },
  {
    id: 'auto',
    pictogram: '🚗',
    titel: 'De auto begeeft het',
    bedrag: 1800,
    uitleg: 'Je hebt de auto nodig voor je werk.',
  },
  {
    id: 'vakantie',
    pictogram: '✈️',
    titel: 'Je wilt op vakantie',
    bedrag: 2500,
    uitleg: 'Vandaag voelt belangrijker dan over veertig jaar.',
  },
  {
    id: 'verhuizen',
    pictogram: '🏠',
    titel: 'Je wilt verhuizen',
    bedrag: 3500,
    uitleg: 'Borg, inrichting en verhuiskosten tikken snel aan.',
  },
  {
    id: 'kinderen',
    pictogram: '👶',
    titel: 'Je kinderen hebben hulp nodig',
    bedrag: 2000,
    uitleg: 'Natuurlijk wil je helpen.',
  },
  {
    id: 'keuken',
    pictogram: '🍳',
    titel: 'Je ziet een leuke keuken',
    bedrag: 5000,
    uitleg: 'De oude keuken werkt nog, maar deze is wel erg mooi.',
  },
]

const stapTitels = [
  'De logische vraag',
  'De oude sok',
  'Het leven gebeurt',
  'Miljoenen oude sokken',
  'Test jezelf',
  'Uitgesteld loon',
  'Waarom belastingregels?',
  'Belasting later',
  'Het maatschappelijke effect',
  'De drie pijlers',
  'De echte vraag',
]

function formatEuro(bedrag: number) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(bedrag)
}

export default function PensioenDenkexperiment() {
  const firstRender = useRef(true)
  const [gestart, setGestart] = useState(false)
  const [stap, setStap] = useState(0)
  const [gekozenGebeurtenissen, setGekozenGebeurtenissen] = useState<string[]>([])
  const [tijdvoorkeur, setTijdvoorkeur] = useState<Tijdvoorkeur>(null)
  const [belastingOnthuld, setBelastingOnthuld] = useState(false)
  const [gekozenPijler, setGekozenPijler] = useState<number | null>(null)
  const [conclusieStap, setConclusieStap] = useState(0)
  const [afgerond, setAfgerond] = useState(false)

  const startBedrag = 36000

  const totaleUitgaven = useMemo(
    () =>
      gebeurtenissen
        .filter((item) => gekozenGebeurtenissen.includes(item.id))
        .reduce((totaal, item) => totaal + item.bedrag, 0),
    [gekozenGebeurtenissen]
  )

  const sokBedrag = Math.max(0, startBedrag - totaleUitgaven)
  const sokPercentage = Math.max(0, Math.min(100, (sokBedrag / startBedrag) * 100))
  const voortgang = ((stap + 1) / stapTitels.length) * 100

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stap, gestart, afgerond])

  function reset() {
    setGestart(false)
    setStap(0)
    setGekozenGebeurtenissen([])
    setTijdvoorkeur(null)
    setBelastingOnthuld(false)
    setGekozenPijler(null)
    setConclusieStap(0)
    setAfgerond(false)
  }

  function start() {
    reset()
    setGestart(true)
  }

  function wisselGebeurtenis(id: string) {
    setGekozenGebeurtenissen((huidig) =>
      huidig.includes(id) ? huidig.filter((item) => item !== id) : [...huidig, id]
    )
  }

  function magVerder() {
    if (stap === 2) return gekozenGebeurtenissen.length > 0
    if (stap === 4) return tijdvoorkeur !== null
    if (stap === 6) return belastingOnthuld
    if (stap === 9) return gekozenPijler !== null
    return true
  }

  if (!gestart) {
    return (
      <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-linear-to-br from-amber-950 via-slate-950 to-blue-950"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
          <p className="font-semibold tracking-[0.25em] text-amber-300 uppercase">
            Interactief denkexperiment
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-tight font-black sm:text-6xl lg:text-7xl">
            Je hoeft helemaal geen pensioen te hebben.
          </h1>
          <p className="mt-8 text-3xl font-bold sm:text-4xl">Een oude sok werkt ook.</p>
          <p className="mt-6 max-w-3xl text-2xl leading-relaxed text-slate-300">
            Tenminste... totdat je ontdekt dat miljoenen Nederlanders precies hetzelfde dachten.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={start}
              className="rounded-xl bg-amber-500 px-7 py-4 text-lg font-bold text-slate-950 hover:bg-amber-400"
            >
              Laat maar zien →
            </button>
            <NavigatieKnop
              href="/pensioen"
              className="rounded-xl border border-white/30 px-7 py-4 text-lg font-semibold text-white hover:bg-white/10"
            >
              Meteen naar de geldstromen
            </NavigatieKnop>
          </div>
        </div>
      </section>
    )
  }

  if (afgerond) {
    return (
      <section className="relative flex min-h-[78vh] items-center bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-5xl">
            ✓
          </div>
          <p className="mt-8 font-semibold tracking-[0.25em] text-emerald-300 uppercase">
            Denkexperiment afgerond
          </p>
          <h1 className="mt-5 text-4xl font-black sm:text-6xl">
            Oké, nu snap ik waarom pensioen belastingregels heeft
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-relaxed text-slate-300">
            De belastingheffing wordt niet afgeschaft, maar verschoven naar het moment waarop
            pensioeninkomen wordt uitgekeerd.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <NavigatieKnop
              href="/pensioen"
              className="rounded-xl bg-white px-7 py-4 text-lg font-semibold text-slate-900 hover:bg-emerald-100"
            >
              Bekijk hoe de geldstromen werken →
            </NavigatieKnop>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-white/30 px-7 py-4 text-lg font-semibold hover:bg-white/10"
            >
              Experiment opnieuw doen
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[78vh] bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-gray-950 dark:to-blue-950">
      <div className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                Stap {stap + 1} van {stapTitels.length}
              </p>
              <p className="font-bold">{stapTitels[stap]}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Stoppen
            </button>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${voortgang}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 lg:py-20">
        <article className="rounded-3xl border border-gray-200 bg-white p-7 shadow-2xl sm:p-10 lg:p-14 dark:border-gray-800 dark:bg-gray-900">
          {stap === 0 && (
            <TekstStap
              label="De logische vraag"
              titel="Waarom moet pensioen zo ingewikkeld?"
              teksten={[
                'Veel mensen denken: waarom leg ik niet gewoon zelf geld opzij?',
                'Dat klinkt logisch. Voor sommige mensen werkt dat ook prima.',
                'Maar zodra miljoenen mensen dit veertig of vijftig jaar consequent moeten volhouden, ontstaat een ander verhaal.',
              ]}
            />
          )}

          {stap === 1 && (
            <section className="text-center">
              <div className="text-8xl" aria-hidden="true">
                💶 → 🧦
              </div>
              <Titel>De oude sok</Titel>
              <div className="mx-auto mt-8 max-w-3xl space-y-4 text-lg">
                <p>Je bent 25 jaar.</p>
                <p>Je verdient € 3.000 netto per maand.</p>
                <p>Iedere maand stop je € 300 in een oude sok.</p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <SpaarKaart label="Na 1 jaar" bedrag="€ 3.600" />
                <SpaarKaart label="Na 10 jaar" bedrag="€ 36.000" />
                <SpaarKaart label="Na 40 jaar" bedrag="€ 144.000" />
              </div>
            </section>
          )}

          {stap === 2 && (
            <section>
              <Label>Maar dan gebeurt het leven</Label>
              <Titel>Hoe lang blijft de sok gevuld?</Titel>
              <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
                <p className="text-sm text-slate-400 uppercase">Over in de oude sok</p>
                <p className="mt-2 text-4xl font-black">{formatEuro(sokBedrag)}</p>
                <div className="mt-6 h-5 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${sokPercentage}%` }}
                  />
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gebeurtenissen.map((item) => {
                  const gekozen = gekozenGebeurtenissen.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => wisselGebeurtenis(item.id)}
                      className={`rounded-2xl border-2 p-5 text-left ${gekozen ? 'border-red-500 bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <span className="text-4xl">{item.pictogram}</span>
                      <h2 className="mt-4 font-bold">{item.titel}</h2>
                      <p className="mt-2 text-2xl font-black text-red-600">
                        - {formatEuro(item.bedrag)}
                      </p>
                      {gekozen && <p className="mt-3 text-sm">{item.uitleg}</p>}
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {stap === 3 && (
            <TekstStap
              label="Het grotere probleem"
              titel="Het probleem is miljoenen oude sokken"
              teksten={[
                'Mensen zijn niet dom. Mensen zijn menselijk.',
                'Geld vandaag voelt belangrijker dan inkomen over veertig jaar.',
                'Een kapotte auto is concreet. Je leven als gepensioneerde voelt nog ver weg.',
              ]}
            />
          )}

          {stap === 4 && (
            <section>
              <Label>Test jezelf</Label>
              <Titel>Wat kies jij?</Titel>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <KeuzeKaart
                  titel="€ 1.000"
                  tekst="morgen op je rekening"
                  actief={tijdvoorkeur === 'nu'}
                  onClick={() => setTijdvoorkeur('nu')}
                />
                <KeuzeKaart
                  titel="€ 1.200"
                  tekst="over vijf jaar"
                  actief={tijdvoorkeur === 'later'}
                  onClick={() => setTijdvoorkeur('later')}
                />
              </div>
              {tijdvoorkeur && (
                <p className="mt-8 rounded-2xl bg-blue-50 p-6 text-lg dark:bg-blue-950">
                  Een beloning die direct beschikbaar is voelt vaak aantrekkelijker. Pensioen
                  beschermt een deel van het inkomen tegen die voortdurende keuze.
                </p>
              )}
            </section>
          )}

          {stap === 5 && (
            <section className="text-center">
              <Label>Pensioen in één zin</Label>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-blue-700 p-12 text-4xl font-black text-white sm:text-6xl">
                Pensioen = uitgesteld loon
              </div>
              <p className="mt-10 text-xl">
                Een deel van je beloning gaat naar de toekomstige versie van jezelf.
              </p>
            </section>
          )}

          {stap === 6 && (
            <section>
              <Label>Waarom belastingregels?</Label>
              <Titel>Wanneer moet dit inkomen worden belast?</Titel>
              <div className="mx-auto mt-10 max-w-xl">
                <Stroom tekst="Salaris ontvangen" icoon="💶" />
                <Pijl />
                <Stroom tekst="Geld voor pensioen reserveren" icoon="📦" />
                <Pijl />
                <Stroom tekst="Later pensioen ontvangen" icoon="🧓" />
              </div>
              {!belastingOnthuld ? (
                <button
                  type="button"
                  onClick={() => setBelastingOnthuld(true)}
                  className="mx-auto mt-10 block rounded-xl bg-orange-600 px-7 py-4 font-bold text-white"
                >
                  Toon de fiscale oplossing
                </button>
              ) : (
                <p className="mt-10 rounded-2xl bg-orange-50 p-7 text-lg dark:bg-orange-950">
                  Bij fiscaal gefaciliteerde pensioenopbouw wordt belastingheffing doorgaans
                  verschoven naar het moment waarop pensioen wordt uitgekeerd.
                </p>
              )}
            </section>
          )}

          {stap === 7 && (
            <TekstStap
              label="De Nederlandse oplossing"
              titel="Belasting later in plaats van nu"
              teksten={[
                'Tijdens de opbouw wordt geld binnen de pensioen- en belastingregels voor later gereserveerd.',
                'Wanneer het pensioen wordt uitgekeerd, wordt de uitkering als inkomen belast.',
                'De belastingheffing wordt uitgesteld. Niet afgeschaft.',
              ]}
            />
          )}

          {stap === 8 && (
            <TekstStap
              label="Waarom doet de overheid mee?"
              titel="Omdat niets regelen óók geld kost"
              teksten={[
                'Weinig pensioenopbouw kan leiden tot meer ouderen zonder voldoende inkomen.',
                'Dat kan leiden tot meer armoede, afhankelijkheid en beroep op publieke voorzieningen.',
                'Fiscale ondersteuning stimuleert dat inkomen voor later daadwerkelijk wordt georganiseerd.',
              ]}
            />
          )}

          {stap === 9 && (
            <section>
              <Label>Kan ik het zelf regelen?</Label>
              <Titel>Ja. Daarvoor bestaat onder andere de derde pijler.</Titel>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  { n: 1, t: 'AOW', d: 'Wettelijke basisvoorziening.' },
                  { n: 2, t: 'Werkgeverspensioen', d: 'Aanvullend pensioen via werk.' },
                  { n: 3, t: 'Zelf regelen', d: 'Bijvoorbeeld lijfrente of banksparen.' },
                ].map((p) => (
                  <button
                    key={p.n}
                    type="button"
                    onClick={() => setGekozenPijler(p.n)}
                    className={`rounded-2xl border-2 p-6 text-left ${gekozenPijler === p.n ? 'border-violet-600 bg-violet-50 dark:bg-violet-950' : 'border-gray-200 dark:border-gray-700'}`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-black text-white">
                      {p.n}
                    </span>
                    <h2 className="mt-5 text-xl font-black">{p.t}</h2>
                    <p className="mt-3">{p.d}</p>
                  </button>
                ))}
              </div>
              {gekozenPijler && (
                <p className="mt-8 rounded-2xl bg-violet-50 p-7 dark:bg-violet-950">
                  {gekozenPijler === 3
                    ? 'Je kunt zelf aanvullend pensioen opbouwen. Fiscale voorwaarden bepalen hoeveel inleg aftrekbaar kan zijn.'
                    : 'Deze pijler vormt een onderdeel van het Nederlandse pensioeninkomen.'}
                </p>
              )}
            </section>
          )}

          {stap === 10 && (
            <section className="text-center">
              <Label>De echte vraag</Label>
              <div className="mt-8 rounded-3xl bg-slate-950 p-12 text-white">
                <p className="text-3xl font-black sm:text-5xl">
                  {
                    [
                      'Kan ik geld in een oude sok stoppen?',
                      'De echte vraag is:',
                      'Blijf ik dat vijftig jaar consequent doen?',
                      'Doen miljoenen Nederlanders dat allemaal?',
                      'Waarschijnlijk niet altijd.',
                    ][conclusieStap]
                  }
                </p>
                {conclusieStap < 4 && (
                  <button
                    type="button"
                    onClick={() => setConclusieStap((n) => n + 1)}
                    className="mt-10 rounded-xl bg-white px-6 py-3 font-bold text-slate-950"
                  >
                    Klik verder →
                  </button>
                )}
              </div>
              {conclusieStap === 4 && (
                <button
                  type="button"
                  onClick={() => setAfgerond(true)}
                  className="mt-10 rounded-xl bg-emerald-600 px-7 py-4 text-lg font-bold text-white"
                >
                  Oké, nu snap ik waarom pensioen belastingregels heeft
                </button>
              )}
            </section>
          )}

          <div className="mt-12 flex flex-col-reverse justify-between gap-4 border-t pt-8 sm:flex-row">
            <button
              type="button"
              onClick={() => setStap((n) => Math.max(0, n - 1))}
              disabled={stap === 0}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold disabled:opacity-30"
            >
              ← Vorige
            </button>
            {stap < stapTitels.length - 1 && (
              <button
                type="button"
                onClick={() => setStap((n) => n + 1)}
                disabled={!magVerder()}
                className="rounded-xl bg-blue-600 px-7 py-3 font-bold text-white disabled:bg-gray-400"
              >
                {magVerder() ? 'Verder →' : 'Maak eerst een keuze'}
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-semibold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
      {children}
    </p>
  )
}
function Titel({ children }: { children: React.ReactNode }) {
  return <h1 className="mt-4 text-4xl font-black sm:text-5xl">{children}</h1>
}
function TekstStap({ label, titel, teksten }: { label: string; titel: string; teksten: string[] }) {
  return (
    <section>
      <Label>{label}</Label>
      <Titel>{titel}</Titel>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {teksten.map((tekst) => (
          <p key={tekst}>{tekst}</p>
        ))}
      </div>
    </section>
  )
}
function SpaarKaart({ label, bedrag }: { label: string; bedrag: string }) {
  return (
    <div className="rounded-2xl border bg-gray-50 p-6 dark:bg-gray-800">
      <p className="text-sm text-gray-500 uppercase">{label}</p>
      <p className="mt-3 text-3xl font-black">{bedrag}</p>
    </div>
  )
}
function KeuzeKaart({
  titel,
  tekst,
  actief,
  onClick,
}: {
  titel: string
  tekst: string
  actief: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border-2 p-8 text-left ${actief ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-700'}`}
    >
      <p className="text-4xl font-black">{titel}</p>
      <p className="mt-2 text-lg">{tekst}</p>
    </button>
  )
}
function Stroom({ tekst, icoon }: { tekst: string; icoon: string }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border bg-gray-50 p-5 dark:bg-gray-800">
      <span className="text-4xl">{icoon}</span>
      <p className="text-lg font-bold">{tekst}</p>
    </div>
  )
}
function Pijl() {
  return <div className="my-3 text-center text-3xl text-gray-400">↓</div>
}
