'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  belastingBasisHoofdstukken,
  type BelastingBasisHoofdstuk,
} from '@/lib/pensioen/belastingBasis'
import { BELASTING_BASIS_STORAGE_KEY, readBelastingBasisProgress } from '@/lib/pensioen/voortgang'

const geld = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const loonstrookRegels = [
  {
    titel: 'Brutoloon',
    bedrag: '€ 3.000',
    uitleg: 'Je salaris vóór inhoudingen. Dit is niet het bedrag dat op je rekening komt.',
  },
  {
    titel: 'Loonheffing',
    bedrag: '− € 700',
    uitleg:
      'Je werkgever houdt dit bedrag in en draagt het af. Het is een voorschot; de jaarafrekening kan verschillen.',
  },
  {
    titel: 'Pensioenpremie',
    bedrag: '− € 150',
    uitleg:
      'Dit fictieve bedrag is jouw werknemersbijdrage aan de pensioenregeling. Werkgever en regeling kunnen ook een ander deel betalen.',
  },
  {
    titel: 'Nettoloon',
    bedrag: '€ 2.150',
    uitleg: 'Wat in dit eenvoudige voorbeeld overblijft na de twee getoonde inhoudingen.',
  },
]

const routesVoorGeld = [
  { titel: 'Uitgeven', omschrijving: 'Je gebruikt het voor je leven nu.', kleur: 'bg-amber-400' },
  {
    titel: 'Sparen',
    omschrijving: 'Vrij beschikbaar spaargeld; meestal box 3.',
    kleur: 'bg-sky-400',
  },
  {
    titel: 'Beleggen',
    omschrijving: 'Vrij belegd vermogen; risico en waarde schommelen.',
    kleur: 'bg-violet-400',
  },
  {
    titel: 'Pensioen via werk',
    omschrijving: 'Opbouw via je werkgeversregeling: pijler 2.',
    kleur: 'bg-emerald-400',
  },
  {
    titel: 'Pensioenbeleggen',
    omschrijving: 'Mogelijk pijler 3, met product- en belastingvoorwaarden.',
    kleur: 'bg-rose-400',
  },
]

function Flow({ stappen }: { stappen: string[] }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-[repeat(5,minmax(0,1fr))] sm:items-stretch">
      {stappen.map((stap, index) => (
        <li key={stap} className="flex items-center gap-2 sm:block">
          <div className="flex min-h-16 flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/10 p-3 text-center text-sm font-bold">
            {stap}
          </div>
          {index < stappen.length - 1 && (
            <span className="text-lg font-black text-emerald-300 sm:hidden" aria-hidden="true">
              ↓
            </span>
          )}
          {index < stappen.length - 1 && (
            <span
              className="hidden text-center text-xl font-black text-emerald-300 sm:block"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

function BoxCard({
  box,
  naam,
  inhoud,
  actief,
  onClick,
}: {
  box: string
  naam: string
  inhoud: string
  actief: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actief}
      className={`rounded-2xl border p-5 text-left transition ${
        actief
          ? 'border-blue-700 bg-blue-50 ring-2 ring-blue-200 dark:border-blue-300 dark:bg-blue-950 dark:ring-blue-900'
          : 'border-gray-200 bg-white hover:border-blue-400 dark:border-gray-700 dark:bg-gray-900'
      }`}
    >
      <span className="block text-xs font-bold tracking-wider text-blue-700 uppercase dark:text-blue-300">
        {box}
      </span>
      <span className="mt-2 block text-xl font-black">{naam}</span>
      <span className="mt-2 block text-sm leading-relaxed text-gray-700 dark:text-gray-200">
        {inhoud}
      </span>
    </button>
  )
}

function Visualisatie({
  hoofdstuk,
  ingehouden,
  setIngehouden,
  verschuldigd,
  setVerschuldigd,
  geselecteerdeLoonstrook,
  setGeselecteerdeLoonstrook,
  woningWoz,
  setWoningWoz,
  woningRente,
  setWoningRente,
  woningPercentage,
  setWoningPercentage,
  bvAandelen,
  setBvAandelen,
  vermogensbedrag,
  setVermogensbedrag,
  rendement,
  setRendement,
  selectedBox,
  setSelectedBox,
  profiel,
  setProfiel,
}: {
  hoofdstuk: BelastingBasisHoofdstuk
  ingehouden: number
  setIngehouden: (value: number) => void
  verschuldigd: number
  setVerschuldigd: (value: number) => void
  geselecteerdeLoonstrook: string
  setGeselecteerdeLoonstrook: (value: string) => void
  woningWoz: number
  setWoningWoz: (value: number) => void
  woningRente: number
  setWoningRente: (value: number) => void
  woningPercentage: number
  setWoningPercentage: (value: number) => void
  bvAandelen: number
  setBvAandelen: (value: number) => void
  vermogensbedrag: number
  setVermogensbedrag: (value: number) => void
  rendement: number
  setRendement: (value: number) => void
  selectedBox: string
  setSelectedBox: (value: string) => void
  profiel: {
    leeftijd: number
    salaris: number
    spaargeld: number
    woning: boolean
    tweedeWoning: number
    beleggingen: number
    pensioenregeling: boolean
    pensioenbeleggen: boolean
    bvPercentage: number
  }
  setProfiel: (value: VisualisatieProps['profiel']) => void
}) {
  const verschil = ingehouden - verschuldigd
  const woningfictiefForfait = woningWoz * (woningPercentage / 100)
  const woningFictieveBasis = woningfictiefForfait - woningRente
  const toekomstigeWaarde = vermogensbedrag * (1 + rendement / 100) ** 10
  const show = (name: BelastingBasisHoofdstuk['visual']) => hoofdstuk.visual === name

  if (show('voorzieningen')) {
    const bestemmingen = [
      ['♡', 'Zorg'],
      ['▤', 'Onderwijs'],
      ['⬡', 'Politie en defensie'],
      ['↗', 'Wegen en gemeenten'],
      ['◷', 'AOW en sociale zekerheid'],
      ['+', 'Toeslagen'],
    ]
    return (
      <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
        <Flow stappen={['Werk', 'Salaris', 'Belasting', 'Overheid', 'Samen geregeld']} />
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {bestemmingen.map(([icoon, naam]) => (
            <div key={naam} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="text-lg font-black text-emerald-300" aria-hidden="true">
                {icoon}
              </span>
              <p className="mt-1 text-sm font-semibold">{naam}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-300">
          Schema om het idee te laten zien, geen één-op-één bestemming van individuele
          belastingeuro’s.
        </p>
      </div>
    )
  }

  if (show('loonstrook')) {
    const regel = loonstrookRegels.find((item) => item.titel === geselecteerdeLoonstrook)
    return (
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between bg-slate-950 p-4 text-white">
            <span className="font-black">LOONSTROOK</span>
            <span className="text-sm text-slate-300">Voorbeeld · klik op een regel</span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loonstrookRegels.map((regelItem) => (
              <button
                key={regelItem.titel}
                type="button"
                onClick={() => setGeselecteerdeLoonstrook(regelItem.titel)}
                aria-pressed={geselecteerdeLoonstrook === regelItem.titel}
                className={`flex w-full items-center justify-between gap-3 p-4 text-left transition ${
                  geselecteerdeLoonstrook === regelItem.titel
                    ? 'bg-blue-50 dark:bg-blue-950'
                    : 'bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800'
                } ${regelItem.titel === 'Nettoloon' ? 'font-black' : 'font-semibold'}`}
              >
                <span>{regelItem.titel}</span>
                <span className="tabular-nums">{regelItem.bedrag}</span>
              </button>
            ))}
          </div>
        </div>
        <aside className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-950" aria-live="polite">
          <p className="text-xs font-bold tracking-wider text-blue-800 uppercase dark:text-blue-200">
            Wat betekent dit?
          </p>
          <h3 className="mt-2 text-lg font-black">{regel?.titel}</h3>
          <p className="mt-2 text-sm leading-relaxed">{regel?.uitleg}</p>
        </aside>
      </div>
    )
  }

  if (show('loonheffing')) {
    const delen = [
      ['Loonbelasting', 'Inhouding op je loon; meestal een voorschot op inkomstenbelasting.'],
      ['Premie AOW', 'Draagt bij aan de volksverzekering voor de AOW.'],
      ['Premie Anw', 'Draagt bij aan de volksverzekering voor nabestaanden.'],
      ['Premie Wlz', 'Draagt bij aan de volksverzekering voor langdurige zorg.'],
    ]
    return (
      <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
        <div className="rounded-xl bg-blue-900 p-4 text-center text-lg font-black">
          Loonheffing op je loonstrook
        </div>
        <div className="my-3 text-center text-2xl font-black text-emerald-300" aria-hidden="true">
          ↓
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {delen.map(([naam, uitleg]) => (
            <div key={naam} className="rounded-xl border border-white/15 bg-white/5 p-4">
              <h3 className="font-black">{naam}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{uitleg}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-amber-300/40 bg-amber-300/10 p-4 text-sm leading-relaxed text-amber-100">
          Werknemersverzekeringen en de werkgeversheffing Zvw zijn doorgaans werkgeverslasten. Ze
          zijn dus niet allemaal onderdelen die van jouw nettoloon worden afgetrokken.
        </div>
      </div>
    )
  }

  if (show('tijdlijn')) {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            ['Tijdens het jaar', 'Werkgever houdt loonheffing in en draagt die af.'],
            ['Na afloop', 'Je totale gegevens en aftrekposten kunnen worden gecontroleerd.'],
            [
              'Eindafrekening',
              'Te veel vooruitbetaald kan terugkomen; te weinig kan bijbetalen betekenen.',
            ],
          ].map(([titel, uitleg], index) => (
            <li key={titel} className="relative rounded-xl border border-white/15 bg-white/5 p-4">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-300 font-black text-emerald-950">
                {index + 1}
              </span>
              <h3 className="mt-3 font-black">{titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{uitleg}</p>
            </li>
          ))}
        </ol>
        {hoofdstuk.id === 'terug-of-bijbetalen' ? (
          <div className="mt-5 rounded-xl bg-white p-4 text-gray-950">
            <h3 className="font-black">Probeer de eindafrekening</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Werkelijke belasting in het voorbeeld
                <input
                  type="number"
                  min={0}
                  step={250}
                  value={verschuldigd}
                  onChange={(event) =>
                    setVerschuldigd(Math.max(0, Number(event.target.value) || 0))
                  }
                  className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </label>
              <label className="text-sm font-semibold">
                Reeds ingehouden loonheffing
                <input
                  type="number"
                  min={0}
                  step={250}
                  value={ingehouden}
                  onChange={(event) => setIngehouden(Math.max(0, Number(event.target.value) || 0))}
                  className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </label>
            </div>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
              <p className="text-lg font-black" aria-live="polite">
                {verschil >= 0
                  ? `${geld.format(verschil)} terug`
                  : `${geld.format(-verschil)} bijbetalen`}
              </p>
              <p className="mt-1 text-sm">
                Verschil in dit rekenvoorbeeld; geen persoonlijke aangifteberekening.
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-xl bg-emerald-900 p-4 font-bold text-emerald-100">
            Voorbeeld: € 8.000 verschuldigd − € 8.500 vooruitbetaald = € 500 terug.
          </p>
        )}
      </div>
    )
  }

  if (show('aangifte')) {
    const gegevens = [
      ['Werkgever ziet meestal', 'Salaris en loonheffing bij die werkgever'],
      [
        'Aangifte kan ook meenemen',
        'Andere inkomsten, eigen woning, aftrekposten, partner en vermogen',
      ],
    ]
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {gegevens.map(([titel, tekst]) => (
          <article
            key={titel}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <p className="text-xs font-bold tracking-wider text-blue-700 uppercase dark:text-blue-300">
              {titel}
            </p>
            <p className="mt-3 text-lg font-black">{tekst}</p>
          </article>
        ))}
        <div className="md:col-span-2">
          <Flow stappen={['Gegevens verzamelen', 'Aangifte aanvullen', 'Aanslag controleren']} />
        </div>
      </div>
    )
  }

  if (show('bakken')) {
    const uitleg = {
      box1: 'Box 1 is vooral voor inkomen uit werk en de eigen woning waarin je zelf woont.',
      box2: 'Box 2 gaat over inkomen uit een aanmerkelijk belang in bijvoorbeeld een BV.',
      box3: 'Box 3 gaat meestal over spaargeld, beleggingen en een tweede woning.',
    }
    return (
      <div>
        <div className="grid gap-3 md:grid-cols-3">
          <BoxCard
            box="BAK 1"
            naam="Werk & woning"
            inhoud="Salaris, uitkering, pensioen en meestal je eigen woning."
            actief={selectedBox === 'box1'}
            onClick={() => setSelectedBox('box1')}
          />
          <BoxCard
            box="BAK 2"
            naam="Aanmerkelijk belang"
            inhoud="Inkomen uit een groter aandelenbelang in een BV."
            actief={selectedBox === 'box2'}
            onClick={() => setSelectedBox('box2')}
          />
          <BoxCard
            box="BAK 3"
            naam="Vermogen"
            inhoud="Meestal spaargeld, beleggingen en een tweede woning."
            actief={selectedBox === 'box3'}
            onClick={() => setSelectedBox('box3')}
          />
        </div>
        <p
          className="mt-3 rounded-xl bg-blue-50 p-4 leading-relaxed dark:bg-blue-950"
          aria-live="polite"
        >
          {uitleg[selectedBox as keyof typeof uitleg]}
        </p>
      </div>
    )
  }

  if (show('box1')) {
    return (
      <div className="rounded-2xl bg-blue-950 p-5 text-white sm:p-7">
        <h3 className="text-center text-2xl font-black">BOX 1 · WERK EN WONING</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            'Salaris',
            'AOW',
            'Pensioen',
            'Uitkering',
            'Freelance werk',
            'Winst onderneming',
            'Eigen hoofdwoning',
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/15 bg-white/10 p-3 text-center font-bold"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (show('woning')) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 dark:border-gray-700 dark:bg-gray-900">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold">
            WOZ-waarde · voorbeeld
            <input
              type="range"
              min={150000}
              max={1000000}
              step={10000}
              value={woningWoz}
              onChange={(event) => setWoningWoz(Number(event.target.value))}
              className="mt-3 block w-full"
            />
            <span className="mt-1 block text-lg font-black">{geld.format(woningWoz)}</span>
          </label>
          <label className="text-sm font-bold">
            Hypotheekrente betaald · voorbeeld per jaar
            <input
              type="range"
              min={0}
              max={20000}
              step={250}
              value={woningRente}
              onChange={(event) => setWoningRente(Number(event.target.value))}
              className="mt-3 block w-full"
            />
            <span className="mt-1 block text-lg font-black">{geld.format(woningRente)}</span>
          </label>
          <label className="text-sm font-bold md:col-span-2">
            Fictief eigenwoningforfait in dit voorbeeld: {woningPercentage.toFixed(2)}%
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={woningPercentage}
              onChange={(event) => setWoningPercentage(Number(event.target.value))}
              className="mt-3 block w-full"
            />
            <span className="mt-1 block text-xs font-normal text-gray-600 dark:text-gray-300">
              Alleen een instelbare uitleg-aanname, niet het actuele wettelijke percentage.
            </span>
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950">
            <p className="text-sm font-semibold">WOZ × fictief percentage</p>
            <p className="mt-1 text-xl font-black">{geld.format(woningfictiefForfait)}</p>
          </div>
          <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950">
            <p className="text-sm font-semibold">Rente in het voorbeeld</p>
            <p className="mt-1 text-xl font-black">− {geld.format(woningRente)}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950">
            <p className="text-sm font-semibold">Illustratieve saldo-stap</p>
            <p className="mt-1 text-xl font-black">{geld.format(woningFictieveBasis)}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Dit is geen berekening van je belasting of aftrekrecht. Eigenwoningforfait, renteaftrek en
          voorwaarden hangen af van de actuele wet en jouw hypotheek- en woonsituatie. Een tweede
          woning valt meestal in box 3.
        </p>
      </div>
    )
  }

  if (show('box2')) {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
        <label className="block font-bold">
          Hoeveel procent van de aandelen in de BV bezit je in dit voorbeeld?
          <input
            type="range"
            min={0}
            max={100}
            value={bvAandelen}
            onChange={(event) => setBvAandelen(Number(event.target.value))}
            className="mt-4 block w-full"
          />
          <span className="mt-2 block text-3xl font-black text-amber-300">{bvAandelen}%</span>
        </label>
        <div className="mt-5 rounded-xl bg-white/10 p-5">
          <p className="text-lg font-black">
            {bvAandelen >= 5
              ? 'Box 2 kan relevant zijn'
              : 'Meestal geen aanmerkelijk belang in dit voorbeeld'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            Een aandelenbelang van minstens 5% is doorgaans een aanmerkelijk belang. Er zijn
            aanvullende regels voor onder meer rechten, familie en fiscale partners.
          </p>
        </div>
      </div>
    )
  }

  if (show('box3')) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['Spaargeld', 'Vrije buffer op een rekening'],
          ['Aandelen en ETF’s', 'Beleggingen met schommelende waarde'],
          ['Crypto', 'Digitale bezittingen met mogelijk grote schommelingen'],
          ['Tweede woning', 'Woning die niet je eigen hoofdverblijf is'],
          ['Overige beleggingen', 'Andere bezittingen volgens de box-3-regels'],
          ['Salaris', 'Inkomen uit werk: meestal box 1, geen box-3-bezit'],
        ].map(([naam, omschrijving]) => (
          <article
            key={naam}
            className={`rounded-xl border p-4 ${naam === 'Salaris' ? 'border-amber-300 bg-amber-50 dark:bg-amber-950' : 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950'}`}
          >
            <p className="font-black">{naam}</p>
            <p className="mt-1 text-sm leading-relaxed">{omschrijving}</p>
          </article>
        ))}
      </div>
    )
  }

  if (show('vergelijking')) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-wrap gap-2">
          {[10000, 25000, 50000, 100000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setVermogensbedrag(amount)}
              aria-pressed={vermogensbedrag === amount}
              className={`rounded-lg border px-4 py-2 font-bold ${vermogensbedrag === amount ? 'border-blue-700 bg-blue-800 text-white' : 'border-gray-300 dark:border-gray-600'}`}
            >
              {geld.format(amount)}
            </button>
          ))}
        </div>
        <label className="mt-6 block font-bold">
          Fictieve jaarlijkse groei: {rendement}%
          <input
            type="range"
            min={0}
            max={8}
            step={0.5}
            value={rendement}
            onChange={(event) => setRendement(Number(event.target.value))}
            className="mt-3 block w-full"
          />
        </label>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-sky-50 p-5 dark:bg-sky-950">
            <p className="font-bold">Startbedrag</p>
            <p className="mt-2 text-2xl font-black">{geld.format(vermogensbedrag)}</p>
            <p className="mt-1 text-sm">Sparen: doorgaans kleinere schommelingen.</p>
          </div>
          <div className="rounded-xl bg-violet-50 p-5 dark:bg-violet-950">
            <p className="font-bold">Na 10 jaar bij constante voorbeeldgroei</p>
            <p className="mt-2 text-2xl font-black">{geld.format(toekomstigeWaarde)}</p>
            <p className="mt-1 text-sm">Beleggen: waarde kan ook dalen.</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Rekenkundig voorbeeld vóór belasting, kosten en inflatie. De gekozen groei is niet
          voorspeld of gegarandeerd. Box 3 wordt hier niet berekend.
        </p>
      </div>
    )
  }

  if (show('routes')) {
    return (
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routesVoorGeld.map((route, index) => (
            <article
              key={route.titel}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
            >
              <div className={`h-2 ${route.kleur}`} />
              <div className="p-4">
                <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Route {index + 1}
                </p>
                <h3 className="mt-1 font-black">{route.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                  {route.omschrijving}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed dark:bg-amber-950">
          Belastingregels hangen af van het product en je situatie. Pensioenbeleggen heeft vaak
          voorwaarden voor inleg en opname; het is niet hetzelfde als vrij beleggen.
        </div>
      </div>
    )
  }

  const box1 = profiel.salaris > 0 || profiel.pensioenregeling || profiel.woning
  const box2 = profiel.bvPercentage >= 5
  const box3 = profiel.spaargeld + profiel.beleggingen + profiel.tweedeWoning > 0
  const vermogen = profiel.spaargeld + profiel.beleggingen + profiel.tweedeWoning

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Leeftijd
          <input
            type="number"
            min={16}
            max={100}
            value={profiel.leeftijd}
            onChange={(event) =>
              setProfiel({
                ...profiel,
                leeftijd: Math.min(100, Math.max(16, Number(event.target.value) || 16)),
              })
            }
            className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="text-sm font-bold">
          Bruto jaarsalaris · ongeveer
          <input
            type="number"
            min={0}
            step={1000}
            value={profiel.salaris}
            onChange={(event) =>
              setProfiel({ ...profiel, salaris: Math.max(0, Number(event.target.value) || 0) })
            }
            className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="text-sm font-bold">
          Spaargeld
          <input
            type="number"
            min={0}
            step={500}
            value={profiel.spaargeld}
            onChange={(event) =>
              setProfiel({ ...profiel, spaargeld: Math.max(0, Number(event.target.value) || 0) })
            }
            className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="text-sm font-bold">
          Beleggingen en crypto
          <input
            type="number"
            min={0}
            step={500}
            value={profiel.beleggingen}
            onChange={(event) =>
              setProfiel({ ...profiel, beleggingen: Math.max(0, Number(event.target.value) || 0) })
            }
            className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="text-sm font-bold">
          Waarde tweede woning · voorbeeld
          <input
            type="number"
            min={0}
            step={5000}
            value={profiel.tweedeWoning}
            onChange={(event) =>
              setProfiel({ ...profiel, tweedeWoning: Math.max(0, Number(event.target.value) || 0) })
            }
            className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="text-sm font-bold">
          Aandelen in eigen BV · percentage
          <input
            type="number"
            min={0}
            max={100}
            value={profiel.bvPercentage}
            onChange={(event) =>
              setProfiel({
                ...profiel,
                bvPercentage: Math.min(100, Math.max(0, Number(event.target.value) || 0)),
              })
            }
            className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 font-semibold dark:border-gray-700">
          <input
            type="checkbox"
            checked={profiel.woning}
            onChange={(event) => setProfiel({ ...profiel, woning: event.target.checked })}
            className="rounded"
          />
          Ik heb een eigen woning waarin ik woon
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 font-semibold sm:col-span-2 dark:border-gray-700">
          <input
            type="checkbox"
            checked={profiel.pensioenregeling}
            onChange={(event) => setProfiel({ ...profiel, pensioenregeling: event.target.checked })}
            className="rounded"
          />
          Ik bouw pensioen op via een pensioenregeling van mijn werkgever
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 font-semibold sm:col-span-2 dark:border-gray-700">
          <input
            type="checkbox"
            checked={profiel.pensioenbeleggen}
            onChange={(event) => setProfiel({ ...profiel, pensioenbeleggen: event.target.checked })}
            className="rounded"
          />
          Ik bouw zelf aanvullend pensioen op, bijvoorbeeld via lijfrente of pensioenbeleggen
        </label>
      </div>
      <section className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7" aria-live="polite">
        <h3 className="text-xl font-black">Jouw eerste overzicht</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            [
              'Box 1',
              box1,
              profiel.woning
                ? 'Inkomen uit werk en mogelijk de eigen woning.'
                : 'Inkomen uit werk; de woning kan eigen regels hebben.',
            ],
            [
              'Box 2',
              box2,
              box2
                ? 'Je aandelenbelang kan box 2 relevant maken.'
                : 'Geen aanmerkelijk belang op basis van dit percentage.',
            ],
            [
              'Box 3',
              box3,
              box3
                ? `${geld.format(vermogen)} spaargeld, beleggingen en eventueel een tweede woning kunnen box 3 relevant maken.`
                : 'Geen spaargeld of beleggingen ingevuld.',
            ],
          ].map(([box, relevant, tekst]) => (
            <article
              key={String(box)}
              className={`rounded-xl border p-4 ${relevant ? 'border-emerald-300 bg-emerald-900' : 'border-white/15 bg-white/5'}`}
            >
              <p className="text-xs font-bold tracking-wider text-emerald-200 uppercase">{box}</p>
              <p className="mt-2 text-lg font-black">
                {relevant ? 'Kan relevant zijn' : 'Niet aangegeven'}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">{tekst}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm leading-relaxed text-slate-200">
          <p>
            <strong>Waar bouw je op?</strong>{' '}
            {profiel.pensioenregeling
              ? 'Je geeft werkgeverspensioen (pijler 2) aan.'
              : 'Geen werkgeversregeling ingevuld; controleer dit op je pensioenoverzicht.'}{' '}
            {profiel.pensioenbeleggen
              ? 'Je geeft ook een eigen pensioenaanvulling (mogelijk pijler 3) aan. '
              : ''}
            Spaargeld en beleggingen zijn vrij vermogen; leeftijd {profiel.leeftijd} bepaalt op
            zichzelf geen box.
          </p>
          <p className="mt-2">
            <strong>Waar kijken?</strong> Op je loonstrook naar brutoloon, loonheffing en
            pensioenbijdrage; bij de aangifte naar jaarinkomen, eigen woning, belangen en vermogen.
          </p>
        </div>
      </section>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        Dit overzicht bepaalt geen belastingbedrag of pensioenrecht. Schulden, partner,
        uitzonderingen, precieze eigendom en actuele regels kunnen de uitkomst veranderen. De
        ingevulde gegevens worden niet opgeslagen.
      </p>
    </div>
  )
}

type VisualisatieProps = Parameters<typeof Visualisatie>[0]

export default function BelastingBasisCursus() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [completed, setCompleted] = useState<string[]>([])
  const [answer, setAnswer] = useState<number | null>(null)
  const [ingehouden, setIngehouden] = useState(8500)
  const [verschuldigd, setVerschuldigd] = useState(8000)
  const [geselecteerdeLoonstrook, setGeselecteerdeLoonstrook] = useState('Loonheffing')
  const [woningWoz, setWoningWoz] = useState(400000)
  const [woningRente, setWoningRente] = useState(6000)
  const [woningPercentage, setWoningPercentage] = useState(0.35)
  const [bvAandelen, setBvAandelen] = useState(0)
  const [vermogensbedrag, setVermogensbedrag] = useState(25000)
  const [rendement, setRendement] = useState(4)
  const [selectedBox, setSelectedBox] = useState('box1')
  const [profiel, setProfiel] = useState({
    leeftijd: 30,
    salaris: 42000,
    spaargeld: 10000,
    woning: false,
    tweedeWoning: 0,
    beleggingen: 2500,
    pensioenregeling: true,
    pensioenbeleggen: false,
    bvPercentage: 0,
  })
  const hoofdstuk = belastingBasisHoofdstukken[activeIndex]
  const vorige = belastingBasisHoofdstukken[activeIndex - 1]
  const volgende = belastingBasisHoofdstukken[activeIndex + 1]
  const [ready, setReady] = useState(false)
  const progress = Math.round((completed.length / belastingBasisHoofdstukken.length) * 100)

  useEffect(() => {
    const opgeslagen = readBelastingBasisProgress()
    setCompleted(opgeslagen)
    const eerstVolgende = belastingBasisHoofdstukken.findIndex(
      (item) => !opgeslagen.includes(item.id)
    )
    if (eerstVolgende >= 0) setActiveIndex(eerstVolgende)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(BELASTING_BASIS_STORAGE_KEY, JSON.stringify(completed))
    } catch (error) {
      console.warn('Voortgang van de basismodule kon niet worden opgeslagen.', error)
    }
  }, [completed, ready])

  useEffect(() => {
    setAnswer(null)
  }, [activeIndex])

  const alleAfgerond = completed.length === belastingBasisHoofdstukken.length
  function selectAnswer(selected: number) {
    setAnswer(selected)
    if (selected === hoofdstuk.juist) {
      setCompleted((current) =>
        current.includes(hoofdstuk.id) ? current : [...current, hoofdstuk.id]
      )
    }
  }

  function navigate(index: number) {
    setActiveIndex(Math.max(0, Math.min(belastingBasisHoofdstukken.length - 1, index)))
    setAnswer(null)
    document.getElementById('module0-stap')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="space-y-7">
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 p-5 text-white sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-wider text-emerald-300 uppercase">
              Jouw route · module 0
            </p>
            <h2 className="mt-1 text-xl font-black sm:text-2xl">
              Van loonstrook naar jouw belastingroute
            </h2>
          </div>
          <p className="text-sm font-bold text-slate-200">
            {ready
              ? `${completed.length} / ${belastingBasisHoofdstukken.length} stappen geleerd`
              : 'Voortgang laden…'}
          </p>
        </div>
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-label="Afgeronde stappen in module 0"
          aria-valuemin={0}
          aria-valuemax={belastingBasisHoofdstukken.length}
          aria-valuenow={completed.length}
        >
          <div
            className="h-full rounded-full bg-emerald-300 transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 overflow-x-auto pb-2">
          <ol className="flex min-w-max items-center" aria-label="Stappen in module 0">
            {belastingBasisHoofdstukken.map((item, index) => {
              const isComplete = completed.includes(item.id)
              const isActive = index === activeIndex
              return (
                <li key={item.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => navigate(index)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Stap ${index + 1}: ${item.titel}${isComplete ? ', afgerond' : ''}`}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-black transition ${isActive ? 'border-amber-300 bg-amber-300 text-slate-950 ring-4 ring-amber-300/20' : isComplete ? 'border-emerald-300 bg-emerald-300 text-emerald-950' : 'border-white/30 bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {isComplete ? '✓' : index + 1}
                  </button>
                  {index < belastingBasisHoofdstukken.length - 1 && (
                    <span
                      className={`h-0.5 w-3 sm:w-5 ${index < activeIndex ? 'bg-emerald-300' : 'bg-white/20'}`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
          <span>Start: belasting en loon</span>
          <span>Finish: jouw overzicht</span>
        </div>
      </section>

      <article
        id="module0-stap"
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <header className="border-b border-gray-200 bg-gray-50 p-5 sm:p-7 dark:border-gray-700 dark:bg-gray-950">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-blue-800 dark:text-blue-200">
            <span>MODULE 0</span>
            <span aria-hidden="true">·</span>
            <span>
              STAP {activeIndex + 1} / {belastingBasisHoofdstukken.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>Ongeveer 3 minuten</span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{hoofdstuk.titel}</h2>
          <p className="mt-3 text-lg font-bold text-gray-800 dark:text-gray-100">
            {hoofdstuk.vraag}
          </p>
          <div className="mt-3 max-w-4xl space-y-3 leading-relaxed text-gray-700 dark:text-gray-200">
            {hoofdstuk.uitleg.map((tekst) => (
              <p key={tekst}>{tekst}</p>
            ))}
          </div>
        </header>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section aria-label="Interactieve visualisatie">
            <p className="mb-3 text-xs font-bold tracking-wider text-blue-700 uppercase dark:text-blue-300">
              Kijk, klik en probeer
            </p>
            <Visualisatie
              hoofdstuk={hoofdstuk}
              ingehouden={ingehouden}
              setIngehouden={setIngehouden}
              verschuldigd={verschuldigd}
              setVerschuldigd={setVerschuldigd}
              geselecteerdeLoonstrook={geselecteerdeLoonstrook}
              setGeselecteerdeLoonstrook={setGeselecteerdeLoonstrook}
              woningWoz={woningWoz}
              setWoningWoz={setWoningWoz}
              woningRente={woningRente}
              setWoningRente={setWoningRente}
              woningPercentage={woningPercentage}
              setWoningPercentage={setWoningPercentage}
              bvAandelen={bvAandelen}
              setBvAandelen={setBvAandelen}
              vermogensbedrag={vermogensbedrag}
              setVermogensbedrag={setVermogensbedrag}
              rendement={rendement}
              setRendement={setRendement}
              selectedBox={selectedBox}
              setSelectedBox={setSelectedBox}
              profiel={profiel}
              setProfiel={setProfiel}
            />
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-5 dark:bg-amber-950">
              <p className="text-xs font-bold tracking-wider text-amber-900 uppercase dark:text-amber-200">
                Onthoud
              </p>
              <p className="mt-2 leading-relaxed font-bold">{hoofdstuk.onthouden}</p>
            </div>
            <section
              className="rounded-2xl bg-slate-950 p-5 text-white"
              aria-labelledby="module0-quiz"
            >
              <p className="text-xs font-bold tracking-wider text-emerald-300 uppercase">
                Kennischeck · stap {activeIndex + 1}
              </p>
              <h3 id="module0-quiz" className="mt-2 font-black">
                {hoofdstuk.vraagCheck}
              </h3>
              <div className="mt-4 space-y-2">
                {hoofdstuk.opties.map((optie, index) => (
                  <button
                    key={optie}
                    type="button"
                    onClick={() => selectAnswer(index)}
                    aria-pressed={answer === index}
                    className={`w-full rounded-xl border p-3 text-left text-sm leading-relaxed transition ${answer === index ? (answer === hoofdstuk.juist ? 'border-emerald-300 bg-emerald-900' : 'border-rose-300 bg-rose-950') : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
                  >
                    {optie}
                  </button>
                ))}
              </div>
              {answer !== null && (
                <p
                  className={`mt-3 text-sm leading-relaxed ${answer === hoofdstuk.juist ? 'text-emerald-200' : 'text-amber-200'}`}
                  role="status"
                >
                  <strong>{answer === hoofdstuk.juist ? 'Goed!' : 'Nog niet.'}</strong>{' '}
                  {hoofdstuk.feedback}
                  {answer !== hoofdstuk.juist && ' Probeer nog eens.'}
                </p>
              )}
            </section>
          </aside>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
          {vorige ? (
            <button
              type="button"
              onClick={() => navigate(activeIndex - 1)}
              className="rounded-xl border border-gray-300 px-4 py-2 font-bold hover:bg-white dark:border-gray-600 dark:hover:bg-gray-900"
            >
              ← Vorige stap
            </button>
          ) : (
            <Link
              href="/modules"
              className="rounded-xl border border-gray-300 px-4 py-2 font-bold hover:bg-white dark:border-gray-600 dark:hover:bg-gray-900"
            >
              ← Modules
            </Link>
          )}
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {completed.includes(hoofdstuk.id)
              ? 'Stap afgerond ✓'
              : 'Beantwoord de kennischeck om deze stap af te ronden'}
          </p>
          {volgende ? (
            <button
              type="button"
              disabled={!completed.includes(hoofdstuk.id)}
              onClick={() => navigate(activeIndex + 1)}
              className="rounded-xl bg-blue-800 px-5 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-200 dark:text-blue-950"
            >
              Volgende stap →
            </button>
          ) : alleAfgerond ? (
            <Link
              href="/modules"
              className="rounded-xl bg-emerald-700 px-5 py-2 font-bold text-white dark:bg-emerald-200 dark:text-emerald-950"
            >
              Module afronden ✓
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="rounded-xl bg-emerald-700 px-5 py-2 font-bold text-white opacity-40 dark:bg-emerald-200 dark:text-emerald-950"
            >
              Rond eerst de stappen af
            </button>
          )}
        </footer>
      </article>

      {alleAfgerond && (
        <section
          className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950"
          role="status"
        >
          <h2 className="text-xl font-black">Module 0 afgerond — je kent nu de basis.</h2>
          <p className="mt-2 leading-relaxed">
            Je kunt nu verder met de leerroute over AOW, werkgeverspensioen, vermogen en sociale
            zekerheid.
          </p>
          <Link
            href="/modules"
            className="mt-4 inline-flex font-bold text-emerald-900 underline dark:text-emerald-200"
          >
            Ga naar de volgende module →
          </Link>
        </section>
      )}
      <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
        Uitleg en percentages in voorbeelden zijn vereenvoudigd. Belastingregels kunnen veranderen
        en afhangen van persoonlijke omstandigheden; deze module berekent geen aanslag.
      </p>
    </div>
  )
}
