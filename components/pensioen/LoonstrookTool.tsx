'use client'

import { useState } from 'react'
import { formatEuro } from '@/lib/pensioen/rendement'
import LoonstrookLes from './LoonstrookLes'

const initialValues = {
  brutoloon: 4000,
  werknemerspremie: 5,
  werkgeverspremie: 10,
  eigenInleg: 150,
}

function Invoer({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix: string
  onChange: (value: number) => void
}) {
  const formatValue = (amount: number) => (suffix === '%' ? `${amount}%` : formatEuro(amount))

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <span className="font-bold tabular-nums">{formatValue(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-blue-700"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  )
}

function PillarCard({
  number,
  title,
  amount,
  description,
  note,
  color,
}: {
  number: number
  title: string
  amount: string
  description: string
  note: string
  color: string
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <p className={`font-bold tracking-wider uppercase ${color}`}>Pijler {number}</p>
      <h3 className="mt-2 text-2xl font-black">{title}</h3>
      <p className="mt-4 text-3xl font-black tabular-nums">{amount}</p>
      <p className="mt-1 text-sm text-gray-500">per maand in dit voorbeeld</p>
      <p className="mt-5 leading-relaxed text-gray-700 dark:text-gray-200">{description}</p>
      <p className="mt-4 border-t border-gray-200 pt-4 text-sm leading-relaxed text-gray-600 dark:border-gray-700 dark:text-gray-300">
        {note}
      </p>
    </article>
  )
}

export default function LoonstrookTool() {
  const [brutoloon, setBrutoloon] = useState(initialValues.brutoloon)
  const [werknemerspremie, setWerknemerspremie] = useState(initialValues.werknemerspremie)
  const [werkgeverspremie, setWerkgeverspremie] = useState(initialValues.werkgeverspremie)
  const [eigenInleg, setEigenInleg] = useState(initialValues.eigenInleg)

  const werknemerBedrag = (brutoloon * werknemerspremie) / 100
  const werkgeverBedrag = (brutoloon * werkgeverspremie) / 100
  const loonNaPensioenpremie = brutoloon - werknemerBedrag

  return (
    <div className="mt-10">
      <LoonstrookLes />

      <section
        aria-labelledby="loonstrook-instellingen"
        className="mt-12 grid gap-8 rounded-3xl bg-slate-950 p-6 text-white sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]"
      >
        <div>
          <p className="font-semibold tracking-wider text-blue-300 uppercase">
            Verdieping · probeer het zelf
          </p>
          <h2 id="loonstrook-instellingen" className="mt-2 text-2xl font-black">
            Wat gebeurt er met de pensioenpremie?
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            De percentages voor het werkgeverspensioen zijn voorbeelden. Pas ze aan om te zien wat
            er met de bedragen gebeurt.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Voor dit rekenvoorbeeld worden beide percentages toegepast op het volledige bruto
            maandloon. Een echte pensioenregeling kan een andere premiegrondslag en afspraken
            hebben.
          </p>

          <div className="mt-8 space-y-7">
            <Invoer
              id="brutoloon"
              label="Bruto maandloon"
              value={brutoloon}
              min={1500}
              max={10000}
              step={100}
              suffix="€"
              onChange={setBrutoloon}
            />
            <Invoer
              id="werknemerspremie"
              label="Werknemersdeel pensioenpremie"
              value={werknemerspremie}
              min={0}
              max={15}
              step={0.5}
              suffix="%"
              onChange={setWerknemerspremie}
            />
            <Invoer
              id="werkgeverspremie"
              label="Werkgeversdeel pensioenpremie"
              value={werkgeverspremie}
              min={0}
              max={25}
              step={0.5}
              suffix="%"
              onChange={setWerkgeverspremie}
            />
            <Invoer
              id="eigen-inleg"
              label="Eigen maandelijkse aanvulling (pijler 3)"
              value={eigenInleg}
              min={0}
              max={1000}
              step={25}
              suffix="€"
              onChange={setEigenInleg}
            />
          </div>
        </div>

        <section
          aria-labelledby="voorbeeld-loonstrook"
          className="self-start rounded-2xl bg-white p-6 text-slate-950"
        >
          <p className="text-sm font-bold tracking-wider text-gray-500 uppercase">
            Vereenvoudigde voorbeeldstrook
          </p>
          <h2 id="voorbeeld-loonstrook" className="mt-2 text-2xl font-black">
            Je loon en pensioenpremie
          </h2>
          <dl className="mt-6 space-y-4">
            <div className="flex justify-between gap-4 border-b border-dashed pb-3">
              <dt>Bruto maandloon</dt>
              <dd className="font-bold tabular-nums">{formatEuro(brutoloon)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-dashed pb-3">
              <dt>Werknemersdeel pensioenpremie ({werknemerspremie}%)</dt>
              <dd className="font-bold tabular-nums">− {formatEuro(werknemerBedrag)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-dashed pb-3">
              <dt>Bruto na werknemerspremie (vóór loonheffing)</dt>
              <dd className="font-bold tabular-nums">{formatEuro(loonNaPensioenpremie)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-dashed pb-3">
              <dt>Werkgeversdeel pensioenpremie ({werkgeverspremie}%)</dt>
              <dd className="font-bold tabular-nums">+ {formatEuro(werkgeverBedrag)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-violet-800 dark:text-violet-700">
              <dt>Eigen aanvulling vanuit je nettoloon</dt>
              <dd className="font-bold tabular-nums">{formatEuro(eigenInleg)}</dd>
            </div>
          </dl>
          <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            Dit is geen nettoloonberekening. Loonheffing, heffingskortingen, vakantiegeld en andere
            inhoudingen zijn niet meegenomen.
          </p>
        </section>
      </section>

      <section aria-labelledby="drie-pijlers-loonstrook" className="mt-12">
        <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
          Wat vertelt deze strook over pensioen?
        </p>
        <h2 id="drie-pijlers-loonstrook" className="mt-2 text-3xl font-black">
          Drie pijlers, drie verschillende geldstromen
        </h2>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          Een loonstrook laat vooral zien wat er met loon en eventuele pensioenpremie gebeurt. De
          drie pensioenpijlers worden niet op dezelfde manier opgebouwd of betaald.
        </p>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <PillarCard
            number={1}
            title="AOW"
            amount="Geen aparte regel"
            description="De AOW is de wettelijke basis. Je bouwt geen persoonlijke AOW-pot op met een bedrag dat op je loonstrook staat."
            note="De AOW wordt landelijk gefinancierd uit belasting- en premie-inkomsten. De loonstrook vermeldt meestal geen aparte persoonlijke AOW-inleg."
            color="text-blue-700 dark:text-blue-300"
          />
          <PillarCard
            number={2}
            title="Via je werkgever"
            amount={formatEuro(werknemerBedrag + werkgeverBedrag)}
            description="In dit voorbeeld gaat deze maand dit bedrag aan pensioenpremie naar de pensioenregeling."
            note={`Jij draagt ${formatEuro(werknemerBedrag)} bij; je werkgever legt ${formatEuro(werkgeverBedrag)} in. De regeling en premiegrondslag verschillen per werkgever.`}
            color="text-emerald-700 dark:text-emerald-300"
          />
          <PillarCard
            number={3}
            title="Zelf aanvullen"
            amount={formatEuro(eigenInleg)}
            description="Dit is de eigen maandelijkse aanvulling die je hierboven instelt, bijvoorbeeld sparen of beleggen voor later."
            note="Een lijfrente kan onder voorwaarden fiscaal aftrekbaar zijn als je voldoende jaarruimte of reserveringsruimte hebt. Gewoon sparen of beleggen werkt fiscaal anders."
            color="text-amber-700 dark:text-amber-300"
          />
        </div>
      </section>
    </div>
  )
}
