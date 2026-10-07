'use client'

import { useState } from 'react'

const lessen = [
  {
    titel: 'Van brutoloon naar nettoloon',
    label: 'Les 1 van 4',
    uitleg:
      'De werkgever houdt loonheffing in op je loon en draagt die af. Loonheffing is een voorheffing op inkomstenbelasting en bestaat, afhankelijk van je situatie, ook uit premies volksverzekeringen. Premies voor werknemersverzekeringen zijn meestal werkgeverslasten, geen inhouding op jouw nettoloon.',
    vraag: 'Wie draagt de loonheffing op je loon af aan de Belastingdienst?',
    opties: [
      'De werknemer zelf, rechtstreeks',
      'De werkgever, na inhouding op het loon',
      'De pensioenuitvoerder',
    ],
    goed: 1,
    feedback:
      'De werkgever houdt loonheffing in en draagt die af. De uiteindelijke inkomstenbelasting wordt later vastgesteld op basis van je hele fiscale situatie.',
  },
  {
    titel: 'Hoe werkt belasting in box 1?',
    label: 'Les 2 van 4',
    uitleg:
      'Loon en veel pensioeninkomsten vallen in box 1. Nederland gebruikt schijven: een hoger tarief geldt alleen voor het deel van je belastbare inkomen dat in die hogere schijf valt. Je betaalt dus niet met terugwerkende kracht dat hogere tarief over je hele inkomen. Voor 2026 gelden voor mensen die de AOW-leeftijd nog niet hebben bereikt drie tarieven.',
    vraag: 'Je inkomen komt deels in een hogere belastingschijf. Wat gebeurt er dan?',
    opties: [
      'Je hele inkomen wordt belast tegen het hogere tarief',
      'Alleen het deel in die schijf krijgt het hogere tarief',
      'Je betaalt geen belasting over je inkomen',
    ],
    goed: 1,
    feedback:
      'Belasting werkt met schijven. Een hoger marginaal tarief geldt alleen voor het deel boven de grens van de eerdere schijf.',
  },
  {
    titel: 'Heffingskorting en pensioenpremie',
    label: 'Les 3 van 4',
    uitleg:
      'Heffingskortingen verlagen de te betalen belasting. Loonheffingskorting is de toepassing daarvan bij een uitbetaler van loon of uitkering; laat die doorgaans maar bij één uitbetaler tegelijk toepassen. Een werknemersdeel van een kwalificerende pensioenpremie kan volgens de pensioen- en loonbelastingregels vóór de berekening van loonheffing worden verwerkt. De exacte grondslag verschilt per regeling.',
    vraag:
      'Je hebt twee werkgevers. Bij hoeveel werkgevers laat je meestal tegelijk loonheffingskorting toepassen?',
    opties: ['Bij allebei', 'Bij één werkgever', 'Bij geen van beide'],
    goed: 1,
    feedback:
      'Meestal pas je loonheffingskorting bij één uitbetaler toe. Bij meerdere uitbetalers kan toepassing bij allemaal tot te weinig inhouding leiden; de aangifte verrekent uiteindelijk je totale situatie.',
  },
  {
    titel: 'Wanneer betaal je belasting over pensioen?',
    label: 'Les 4 van 4',
    uitleg:
      'Pensioenpremies in een kwalificerende regeling worden doorgaans niet meteen als loon belast; de pensioenuitkering is later meestal wel belast in box 1. Voor een lijfrente kan de inleg aftrekbaar zijn als je binnen je jaarruimte of reserveringsruimte blijft en aan de voorwaarden voldoet. Gewoon sparen of beleggen geeft niet dezelfde aftrek en valt mogelijk onder box 3.',
    vraag: 'Wat is meestal de fiscale timing bij een kwalificerende pensioenregeling?',
    opties: [
      'De premie is nu belast en de latere uitkering altijd belastingvrij',
      'De premie wordt nu fiscaal gefaciliteerd en de uitkering later belast',
      'Premie en uitkering zijn altijd volledig belastingvrij',
    ],
    goed: 1,
    feedback:
      'De belasting wordt meestal uitgesteld: de premie-inleg krijgt fiscale behandeling tijdens opbouw en de pensioenuitkering wordt later belast. Regeling en persoonlijke situatie zijn bepalend.',
  },
]

const bronLinks = [
  {
    href: 'https://www.belastingdienst.nl/',
    tekst: 'Belastingdienst: actuele tarieven, loonheffing en heffingskortingen',
  },
  {
    href: 'https://www.rijksoverheid.nl/themas/werk/inkomstenbelasting',
    tekst: 'Rijksoverheid: inkomstenbelasting',
  },
  {
    href: 'https://www.rijksoverheid.nl/actueel/nieuws/2025/12/17/kabinet-zet-met-belastingwijzigingen-2026-stappen-naar-een-beter-belastingstelsel',
    tekst: 'Rijksoverheid: wijzigingen belastingschijven 2026',
  },
  {
    href: 'https://www.svb.nl/nl/aow',
    tekst: 'SVB: informatie over de AOW',
  },
]

export default function LoonstrookLes() {
  const [lesIndex, setLesIndex] = useState(0)
  const [antwoord, setAntwoord] = useState<number | null>(null)
  const [afgerond, setAfgerond] = useState<number[]>([])
  const les = lessen[lesIndex]
  const isGoed = antwoord === les.goed

  function kiesAntwoord(index: number) {
    setAntwoord(index)
    if (index === les.goed) {
      setAfgerond((vorige) => (vorige.includes(lesIndex) ? vorige : [...vorige, lesIndex]))
    } else {
      setAfgerond((vorige) => vorige.filter((item) => item !== lesIndex))
    }
  }

  function gaNaarLes(index: number) {
    setLesIndex(index)
    setAntwoord(null)
  }

  return (
    <section
      aria-labelledby="leerroute-titel"
      className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="bg-blue-950 p-6 text-white sm:p-8">
        <p className="font-semibold tracking-wider text-blue-300 uppercase">
          Interactieve leerroute · belastingjaar 2026
        </p>
        <h2 id="leerroute-titel" className="mt-2 text-3xl font-black">
          Begrijp je loonstrook en pensioen
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-blue-100">
          Volg vier korte lessen. Lees de regel, beantwoord de vraag en bekijk direct waarom het
          antwoord klopt.
        </p>

        <div className="mt-6 flex gap-2" role="group" aria-label="Kies een les">
          {lessen.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => gaNaarLes(index)}
              aria-label={`${item.label}${afgerond.includes(index) ? ', afgerond' : ''}`}
              aria-current={lesIndex === index ? 'step' : undefined}
              className={`h-2 flex-1 rounded-full transition ${
                afgerond.includes(index)
                  ? 'bg-emerald-400'
                  : lesIndex === index
                    ? 'bg-amber-300'
                    : 'bg-white/25'
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-blue-200">
          {afgerond.length} van {lessen.length} lessen goed beantwoord
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
        <article>
          <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
            {les.label}
          </p>
          <h3 className="mt-2 text-2xl font-black">{les.titel}</h3>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-200">{les.uitleg}</p>
          {lesIndex === 1 && (
            <>
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="bg-gray-50 px-4 py-3 font-bold dark:bg-gray-800">
                  Box 1 in 2026 · vóór AOW-leeftijd
                </h4>
                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="flex justify-between gap-4 px-4 py-3">
                    <dt>Tot € 38.883 belastbaar inkomen</dt>
                    <dd className="font-bold">35,75%</dd>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-3">
                    <dt>€ 38.883 tot € 78.426</dt>
                    <dd className="font-bold">37,56%</dd>
                  </div>
                  <div className="flex justify-between gap-4 px-4 py-3">
                    <dt>Boven € 78.426</dt>
                    <dd className="font-bold">49,50%</dd>
                  </div>
                </dl>
              </div>
              <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm leading-relaxed dark:bg-blue-950">
                Dit zijn tarieven voor jaarlijkse belastbare box 1-inkomsten, niet een percentage
                dat je simpelweg van je maandloon aftrekt. Na het bereiken van de AOW-leeftijd
                gelden andere tarieven in de eerste schijf. Heffingskortingen en persoonlijke
                omstandigheden beïnvloeden de uiteindelijke belasting. Deze leerroute rekent daarom
                geen officieel nettoloon uit.
              </p>
            </>
          )}
        </article>

        <div>
          <h4 className="text-lg font-bold">{les.vraag}</h4>
          <div className="mt-4 space-y-3">
            {les.opties.map((optie, index) => {
              const geselecteerd = antwoord === index
              const juist = antwoord !== null && index === les.goed
              const onjuist = geselecteerd && !isGoed

              return (
                <button
                  key={optie}
                  type="button"
                  onClick={() => kiesAntwoord(index)}
                  aria-pressed={geselecteerd}
                  className={`w-full rounded-xl border p-4 text-left font-medium transition ${
                    juist
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                      : onjuist
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950'
                        : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-blue-950'
                  }`}
                >
                  <span className="mr-3 font-bold text-gray-500">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {optie}
                </button>
              )
            })}
          </div>

          {antwoord !== null && (
            <p
              role="status"
              className={`mt-4 rounded-xl p-4 leading-relaxed ${
                isGoed
                  ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100'
                  : 'bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100'
              }`}
            >
              <strong>{isGoed ? 'Goed gedaan. ' : 'Nog niet. '}</strong>
              {les.feedback}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-6 py-5 sm:px-8 dark:border-gray-700">
        <button
          type="button"
          disabled={lesIndex === 0}
          onClick={() => gaNaarLes(lesIndex - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600"
        >
          ← Vorige les
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {afgerond.length === lessen.length
            ? 'Leerroute afgerond — je hebt alle vragen goed beantwoord.'
            : 'Je kunt lessen opnieuw bekijken en antwoorden aanpassen.'}
        </p>
        <button
          type="button"
          disabled={lesIndex === lessen.length - 1}
          onClick={() => gaNaarLes(lesIndex + 1)}
          className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Volgende les →
        </button>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 sm:px-8 dark:border-gray-700 dark:bg-gray-800">
        <p className="font-semibold">Officiële bronnen voor de regels</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {bronLinks.map((bron) => (
            <li key={bron.href}>
              <a
                href={bron.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline underline-offset-2 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
              >
                {bron.tekst} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
          Educatieve uitleg, geen persoonlijk belastingadvies. De 2026-regels en tabellen kunnen
          wijzigen; controleer voor een echte berekening altijd de actuele officiële informatie.
        </p>
      </div>
    </section>
  )
}
