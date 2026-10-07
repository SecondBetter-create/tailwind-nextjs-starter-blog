'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  eindwaardeEenmalig,
  eindwaardeMaandelijks,
  formatEuro,
  formatGetal,
} from '@/lib/pensioen/rendement'

function NummerVeld({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string
  value: number
  onChange: (waarde: number) => void
  min: number
  max: number
  step?: number
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
      />
    </label>
  )
}

function Resultaat({
  titel,
  leeftijd,
  pensioenleeftijd,
  inleg,
  eindwaarde,
}: {
  titel: string
  leeftijd: number
  pensioenleeftijd: number
  inleg: number
  eindwaarde: number
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
      <h3 className="text-xl font-black">{titel}</h3>
      <dl className="mt-4 space-y-2">
        <div className="flex justify-between gap-4">
          <dt>Beginleeftijd</dt>
          <dd className="font-bold">{leeftijd} jaar</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Looptijd</dt>
          <dd className="font-bold">{pensioenleeftijd - leeftijd} jaar</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Eigen inleg</dt>
          <dd className="font-bold">{formatEuro(inleg)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Eindwaarde</dt>
          <dd className="font-bold">{formatEuro(eindwaarde)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Rendement</dt>
          <dd className="font-bold">{formatEuro(eindwaarde - inleg)}</dd>
        </div>
      </dl>
    </div>
  )
}

export default function RendementVergelijking() {
  const [eenmalig, setEenmalig] = useState(1000)
  const [rendement, setRendement] = useState(5)
  const [pensioenleeftijd, setPensioenleeftijd] = useState(65)
  const [vroeg, setVroeg] = useState(25)
  const [laat, setLaat] = useState(55)
  const [maandinleg, setMaandinleg] = useState(200)
  const [vroegMaand, setVroegMaand] = useState(25)
  const [laatMaand, setLaatMaand] = useState(45)
  const [animatie, setAnimatie] = useState(0)

  const eenmaligeResultaten = useMemo(() => {
    const vroegWaarde = eindwaardeEenmalig(eenmalig, rendement, pensioenleeftijd - vroeg)
    const laatWaarde = eindwaardeEenmalig(eenmalig, rendement, pensioenleeftijd - laat)
    return {
      vroegWaarde,
      laatWaarde,
      verschil: vroegWaarde - laatWaarde,
      factor: laatWaarde ? vroegWaarde / laatWaarde : 0,
    }
  }, [eenmalig, rendement, pensioenleeftijd, vroeg, laat])

  const maandResultaten = useMemo(() => {
    const jarenVroeg = pensioenleeftijd - vroegMaand
    const jarenLaat = pensioenleeftijd - laatMaand
    const vroegWaarde = eindwaardeMaandelijks({
      maandinleg,
      jaarrendementProcent: rendement,
      jaren: jarenVroeg,
    })
    const laatWaarde = eindwaardeMaandelijks({
      maandinleg,
      jaarrendementProcent: rendement,
      jaren: jarenLaat,
    })
    const vroegInleg = maandinleg * jarenVroeg * 12
    const laatInleg = maandinleg * jarenLaat * 12
    return {
      jarenVroeg,
      jarenLaat,
      vroegWaarde,
      laatWaarde,
      vroegInleg,
      laatInleg,
      verschil: vroegWaarde - laatWaarde,
      factor: laatWaarde ? vroegWaarde / laatWaarde : 0,
    }
  }, [maandinleg, rendement, pensioenleeftijd, vroegMaand, laatMaand])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setAnimatie(1)
      return
    }
    setAnimatie(0)
    const start = performance.now()
    const duur = 900
    let frame = 0
    const tick = (nu: number) => {
      const p = Math.min(1, (nu - start) / duur)
      setAnimatie(p)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [eenmaligeResultaten.vroegWaarde, eenmaligeResultaten.laatWaarde])

  const max = Math.max(eenmaligeResultaten.vroegWaarde, eenmaligeResultaten.laatWaarde)
  const scenarios = [
    { label: 'Voorzichtig', rate: 3 },
    { label: 'Midden', rate: 5 },
    { label: 'Gunstig', rate: 7 },
  ]

  return (
    <section id="rendement" className="scroll-mt-36 py-16">
      <h2 className="text-3xl font-black sm:text-4xl">Wat doet vroeg beginnen met € 1.000?</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <NummerVeld
          label="Eenmalige inleg"
          value={eenmalig}
          onChange={setEenmalig}
          min={0}
          max={1000000}
          step={100}
        />
        <NummerVeld
          label="Rendement na kosten (%)"
          value={rendement}
          onChange={setRendement}
          min={0}
          max={15}
          step={0.1}
        />
        <NummerVeld
          label="Pensioenleeftijd"
          value={pensioenleeftijd}
          onChange={setPensioenleeftijd}
          min={18}
          max={100}
        />
        <NummerVeld
          label="Vroege startleeftijd"
          value={vroeg}
          onChange={setVroeg}
          min={0}
          max={pensioenleeftijd}
        />
        <NummerVeld
          label="Late startleeftijd"
          value={laat}
          onChange={setLaat}
          min={0}
          max={pensioenleeftijd}
        />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Resultaat
          titel="Vroege inleg"
          leeftijd={vroeg}
          pensioenleeftijd={pensioenleeftijd}
          inleg={eenmalig}
          eindwaarde={eenmaligeResultaten.vroegWaarde}
        />
        <Resultaat
          titel="Late inleg"
          leeftijd={laat}
          pensioenleeftijd={pensioenleeftijd}
          inleg={eenmalig}
          eindwaarde={eenmaligeResultaten.laatWaarde}
        />
      </div>
      <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
        <p className="text-xl font-black">Verschil: {formatEuro(eenmaligeResultaten.verschil)}</p>
        <p className="mt-2">
          De vroege inleg wordt ongeveer {formatGetal(eenmaligeResultaten.factor)} keer zo groot.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p>Vroeg: {formatEuro(eenmaligeResultaten.vroegWaarde)}</p>
            <div
              className="mt-2 h-6 rounded-full bg-blue-500 motion-reduce:transition-none"
              style={{ width: `${(eenmaligeResultaten.vroegWaarde / max) * 100 * animatie}%` }}
            />
          </div>
          <div>
            <p>Laat: {formatEuro(eenmaligeResultaten.laatWaarde)}</p>
            <div
              className="mt-2 h-6 rounded-full bg-amber-400 motion-reduce:transition-none"
              style={{ width: `${(eenmaligeResultaten.laatWaarde / max) * 100 * animatie}%` }}
            />
          </div>
        </div>
      </div>
      <p className="mt-6 rounded-2xl bg-blue-50 p-6 text-lg leading-relaxed dark:bg-blue-950">
        Dezelfde {formatEuro(eenmalig)}. Toch ontstaat een verschil van{' '}
        {formatEuro(eenmaligeResultaten.verschil)}. Niet doordat er meer geld is ingelegd, maar
        doordat de eerste inleg langer de tijd kreeg om te renderen.
      </p>

      <div className="mt-16 border-t border-gray-200 pt-14 dark:border-gray-700">
        <h2 className="text-3xl font-black sm:text-4xl">Wat doet maandelijks € 200 inleggen?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <NummerVeld
            label="Maandelijkse inleg"
            value={maandinleg}
            onChange={setMaandinleg}
            min={0}
            max={100000}
            step={25}
          />
          <NummerVeld
            label="Rendement na kosten (%)"
            value={rendement}
            onChange={setRendement}
            min={0}
            max={15}
            step={0.1}
          />
          <NummerVeld
            label="Pensioenleeftijd"
            value={pensioenleeftijd}
            onChange={setPensioenleeftijd}
            min={18}
            max={100}
          />
          <NummerVeld
            label="Vroege startleeftijd"
            value={vroegMaand}
            onChange={setVroegMaand}
            min={0}
            max={pensioenleeftijd}
          />
          <NummerVeld
            label="Late startleeftijd"
            value={laatMaand}
            onChange={setLaatMaand}
            min={0}
            max={pensioenleeftijd}
          />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Resultaat
            titel={`Beginnen op ${vroegMaand} jaar`}
            leeftijd={vroegMaand}
            pensioenleeftijd={pensioenleeftijd}
            inleg={maandResultaten.vroegInleg}
            eindwaarde={maandResultaten.vroegWaarde}
          />
          <Resultaat
            titel={`Beginnen op ${laatMaand} jaar`}
            leeftijd={laatMaand}
            pensioenleeftijd={pensioenleeftijd}
            inleg={maandResultaten.laatInleg}
            eindwaarde={maandResultaten.laatWaarde}
          />
        </div>
        <p className="mt-6 rounded-2xl bg-emerald-50 p-6 text-lg leading-relaxed dark:bg-emerald-950">
          Wie vroeg begint, legt in dit voorbeeld meer geld in. Het eindvermogen wordt ongeveer{' '}
          {formatGetal(maandResultaten.factor)} keer zo groot. Dat komt doordat de eerste stortingen
          langer kunnen renderen en ook het behaalde rendement opnieuw kan renderen.
        </p>
      </div>

      <div className="mt-14">
        <h3 className="text-2xl font-black">Drie rekenscenario&apos;s bij € 200 per maand</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {scenarios.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700"
            >
              <p className="font-bold tracking-wider text-gray-500 uppercase">{s.label}</p>
              <p className="mt-2 text-3xl font-black">{s.rate}%</p>
              <p className="mt-5">
                40 jaar:{' '}
                <strong>
                  {formatEuro(
                    eindwaardeMaandelijks({
                      maandinleg: 200,
                      jaarrendementProcent: s.rate,
                      jaren: 40,
                    })
                  )}
                </strong>
              </p>
              <p className="mt-2">
                20 jaar:{' '}
                <strong>
                  {formatEuro(
                    eindwaardeMaandelijks({
                      maandinleg: 200,
                      jaarrendementProcent: s.rate,
                      jaren: 20,
                    })
                  )}
                </strong>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 font-semibold dark:bg-amber-950">
          Dit zijn rekenvoorbeelden, geen voorspellingen. Rendement is onzeker en kan hoger of lager
          uitvallen. De bedragen zijn nominaal en niet gecorrigeerd voor inflatie of belasting.
          Officiële pensioenuitvoerders gebruiken hun eigen voorgeschreven scenarioberekeningen.
        </p>
      </div>
    </section>
  )
}
