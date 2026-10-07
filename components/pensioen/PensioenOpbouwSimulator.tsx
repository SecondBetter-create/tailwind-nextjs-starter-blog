'use client'

import { useState } from 'react'
import { formatEuro } from '@/lib/pensioen/rendement'

export default function PensioenOpbouwSimulator() {
  const [salaris, setSalaris] = useState(48000)
  const [franchise, setFranchise] = useState(18000)
  const [premiepercentage, setPremiepercentage] = useState(20)
  const [werknemersdeel, setWerknemersdeel] = useState(30)

  const pensioengrondslag = Math.max(0, salaris - franchise)
  const totalePremie = (pensioengrondslag * premiepercentage) / 100
  const premieWerknemer = (totalePremie * werknemersdeel) / 100
  const premieWerkgever = totalePremie - premieWerknemer

  return (
    <section
      className="mt-10 rounded-3xl bg-slate-950 p-6 text-white sm:p-8"
      aria-labelledby="opbouw-simulator-title"
    >
      <p className="font-bold tracking-wider text-emerald-300 uppercase">
        Oefen met een voorbeeldregeling
      </p>
      <h2 id="opbouw-simulator-title" className="mt-2 text-2xl font-black">
        Van salaris naar maandpremie
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-slate-200">
        Verander de voorbeeldbedragen. De premiepercentages, pensioengrondslag en franchise van jouw
        eigen regeling kunnen anders zijn. Dit rekent alleen een fictieve premie op basis van een
        jaarsalaris; het berekent niet hoeveel pensioen je later krijgt.
      </p>

      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        <div className="space-y-6">
          <NumberSlider
            id="pensioengevend-salaris"
            label="Pensioengevend jaarsalaris"
            value={salaris}
            min={20000}
            max={120000}
            step={1000}
            onChange={setSalaris}
          />
          <NumberSlider
            id="franchise"
            label="Franchise per jaar"
            value={franchise}
            min={0}
            max={30000}
            step={500}
            onChange={setFranchise}
          />
          <NumberSlider
            id="premiepercentage"
            label="Totale premie over de grondslag"
            value={premiepercentage}
            min={0}
            max={40}
            step={0.5}
            suffix="%"
            onChange={setPremiepercentage}
          />
          <NumberSlider
            id="werknemersdeel"
            label="Werknemersdeel van deze premie"
            value={werknemersdeel}
            min={0}
            max={100}
            step={1}
            suffix="%"
            onChange={setWerknemersdeel}
          />
        </div>

        <div className="rounded-2xl bg-white p-6 text-slate-950">
          <p className="text-sm font-bold tracking-wider text-gray-600 uppercase">
            Voorbeeld per jaar
          </p>
          <div className="mt-5 space-y-4">
            <Berekening naam="Pensioengevend salaris" waarde={formatEuro(salaris)} />
            <Berekening naam="Franchise" waarde={`− ${formatEuro(franchise)}`} />
            <div className="border-t border-gray-300 pt-4">
              <Berekening naam="Pensioengrondslag" waarde={formatEuro(pensioengrondslag)} nadruk />
            </div>
            <Berekening
              naam={`Totale premie (${premiepercentage}%)`}
              waarde={formatEuro(totalePremie)}
            />
            <Berekening
              naam={`Werknemersdeel (${werknemersdeel}%)`}
              waarde={formatEuro(premieWerknemer)}
            />
            <Berekening
              naam="Werkgeversdeel (rekenkundig restant)"
              waarde={formatEuro(premieWerkgever)}
            />
          </div>
          <p className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-relaxed">
            Gebruik je regeling, UPO of pensioenportaal voor echte bedragen. Premie is niet
            één-op-één je latere pensioenuitkering: regels, verzekeringen, kosten en
            beleggingsresultaten tellen ook mee.
          </p>
        </div>
      </div>
    </section>
  )
}

function NumberSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  suffix = '',
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="font-black tabular-nums">
          {suffix ? `${value}${suffix}` : formatEuro(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-emerald-400"
      />
    </div>
  )
}

function Berekening({
  naam,
  waarde,
  nadruk = false,
}: {
  naam: string
  waarde: string
  nadruk?: boolean
}) {
  return (
    <div className={`flex justify-between gap-4 ${nadruk ? 'text-lg font-black' : ''}`}>
      <dt>{naam}</dt>
      <dd className="text-right tabular-nums">{waarde}</dd>
    </div>
  )
}
