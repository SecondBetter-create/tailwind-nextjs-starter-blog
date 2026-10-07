'use client'

import { useState } from 'react'
import Link from 'next/link'
import { externeRoutes } from '@/lib/pensioen/routes'
import { pensioenRoutes } from '@/lib/pensioen/rendement'

const AOW_OPBOUW_PER_JAAR = 2
const MAXIMALE_AOW_JAREN = 50

const WERKNEMERSPREMIE_PER_MAAND = 250
const WERKGEVERSPREMIE_PER_MAAND = 500
const LOOPTIJD_IN_JAREN = 10
const FICTIEF_RENDEMENT = 5

export default function PensioenDetails() {
  const [jaren, setJaren] = useState(MAXIMALE_AOW_JAREN)

  const aowPercentage = Math.min(100, jaren * AOW_OPBOUW_PER_JAAR)

  const ontbrekendeAowOpbouw = 100 - aowPercentage

  const totaleMaandpremie = WERKNEMERSPREMIE_PER_MAAND + WERKGEVERSPREMIE_PER_MAAND

  const aantalMaanden = LOOPTIJD_IN_JAREN * 12

  const werknemersbijdrage = WERKNEMERSPREMIE_PER_MAAND * aantalMaanden

  const werkgeversbijdrage = WERKGEVERSPREMIE_PER_MAAND * aantalMaanden

  const totaleInlegZonderRendement = werknemersbijdrage + werkgeversbijdrage

  const fictieveEindwaarde = eindwaardeMaandelijks(
    totaleMaandpremie,
    FICTIEF_RENDEMENT,
    LOOPTIJD_IN_JAREN
  )

  const fictiefRendement = fictieveEindwaarde - totaleInlegZonderRendement

  return (
    <>
      <section id="aow" className="scroll-mt-40 py-16">
        <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
          Eerste pensioenpijler
        </p>

        <h2 className="mt-3 text-3xl font-black sm:text-4xl">Pijler 1: AOW als wettelijke basis</h2>

        <p className="mt-5 text-lg leading-relaxed">
          De AOW is het basispensioen van de overheid. Je bouwt hiervoor geen persoonlijke
          beleggingspot op. Voor ieder jaar waarin je binnen de opbouwperiode verzekerd bent voor de
          AOW, bouw je 2% van een volledige AOW-uitkering op.
        </p>

        <p className="mt-4 text-lg leading-relaxed">
          De volledige opbouwperiode bestaat uit de vijftig verzekerde jaren voor je AOW-leeftijd.
          Na vijftig volledig verzekerde jaren bedraagt je AOW-opbouw 100%.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [50, 100],
            [45, 90],
            [40, 80],
            [30, 60],
          ].map(([verzekerdeJaren, percentage]) => (
            <div
              key={verzekerdeJaren}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <p className="font-bold">{verzekerdeJaren} verzekerde jaren</p>

              <p className="mt-2 text-3xl font-black text-blue-700 dark:text-blue-300">
                {percentage}%
              </p>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {verzekerdeJaren} × 2% opbouw
              </p>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {100 - percentage}% ontbrekende opbouw
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-blue-50 p-6 dark:bg-blue-950">
          <label htmlFor="aow-jaren" className="block text-lg font-bold">
            Hoeveel jaar was je vermoedelijk verzekerd voor de AOW?
          </label>

          <input
            id="aow-jaren"
            className="mt-5 w-full cursor-pointer accent-blue-700"
            type="range"
            min="0"
            max={MAXIMALE_AOW_JAREN}
            step="1"
            value={jaren}
            onChange={(event) => setJaren(Number(event.target.value))}
          />

          <div className="mt-3 flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>0 jaar</span>
            <span>25 jaar</span>
            <span>50 jaar</span>
          </div>

          <p className="mt-6 text-2xl font-black">
            Bij {jaren} verzekerde jaren komt de berekende AOW-opbouw uit op {aowPercentage}%.
          </p>

          {ontbrekendeAowOpbouw > 0 ? (
            <p className="mt-3 font-semibold text-amber-800 dark:text-amber-300">
              In deze vereenvoudigde berekening ontbreekt daarmee {ontbrekendeAowOpbouw}% van een
              volledige AOW-opbouw.
            </p>
          ) : (
            <p className="mt-3 font-semibold text-emerald-800 dark:text-emerald-300">
              In deze vereenvoudigde berekening heb je een volledige AOW-opbouw.
            </p>
          )}

          <p className="mt-4 leading-relaxed">
            Meestal ben je verzekerd wanneer je in Nederland woont of werkt. Internationale
            situaties kunnen anders uitpakken. De SVB bepaalt je officiële verzekerde jaren en
            AOW-opbouw.
          </p>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Deze schuifregelaar geeft uitsluitend een vereenvoudigde indicatie op basis van 2%
            opbouw per verzekerd jaar.
          </p>
        </div>

        <Link
          href={pensioenRoutes.aow}
          className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-600"
        >
          Lees alles over pijler 1 en AOW →
        </Link>
      </section>

      <section
        id="werkgeverspensioen"
        className="scroll-mt-40 border-t border-gray-200 py-16 dark:border-gray-700"
      >
        <p className="font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-300">
          Tweede pensioenpijler
        </p>

        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
          Pijler 2: pensioen via je werkgever
        </h2>

        <p className="mt-5 text-lg leading-relaxed">
          Veel werknemers bouwen boven op de AOW pensioen op via een werkgever. De werkgever en
          werknemer kunnen daarvoor allebei een deel van de pensioenpremie betalen. De
          pensioenuitvoerder voert de regeling uit en belegt het geld.
        </p>

        <p className="mt-4 text-lg leading-relaxed">
          Onder de nieuwe pensioenregels wordt duidelijker hoeveel premie namens een deelnemer wordt
          ingelegd en welk rendement daarop wordt behaald. Niet iedere pensioenregeling is al
          overgestapt. Tijdens de overgang kunnen oude en nieuwe regelingen naast elkaar bestaan.
        </p>

        <ul className="mt-6 list-disc space-y-3 pl-6 leading-relaxed">
          <li>Het pensioen is niet automatisch een vast percentage van je laatste salaris.</li>

          <li>
            Eerder ingelegde premies kunnen langer renderen dan premies die vlak voor pensionering
            worden ingelegd.
          </li>

          <li>
            Rendementen, kosten en economische ontwikkelingen beïnvloeden de uiteindelijke
            pensioenuitkomst.
          </li>

          <li>Financiële risico&apos;s worden binnen de pensioenregeling gezamenlijk gedeeld.</li>

          <li>
            Afhankelijk van de regeling kunnen reserves worden gebruikt om financiële tegenvallers
            gedeeltelijk te dempen.
          </li>

          <li>
            Pensioen kan omhooggaan, maar kan bij tegenvallende resultaten ook lager uitvallen.
          </li>

          <li>
            Tijdens de overgang naar het nieuwe pensioenstelsel kunnen verschillende soorten
            pensioenregelingen naast elkaar bestaan.
          </li>
        </ul>

        <div className="mt-8 rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-black">Fictief premievoorbeeld</h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Tien jaar lang maandelijks inleggen met een fictief rendement van 5% per jaar.
              </p>
            </div>

            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              Educatief voorbeeld
            </span>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Rekenregel
              label="Werknemer per maand"
              waarde={formatEuro(WERKNEMERSPREMIE_PER_MAAND)}
            />

            <Rekenregel
              label="Werkgever per maand"
              waarde={formatEuro(WERKGEVERSPREMIE_PER_MAAND)}
            />

            <Rekenregel label="Totaal per maand" waarde={formatEuro(totaleMaandpremie)} />

            <Rekenregel label="Totaal per jaar" waarde={formatEuro(totaleMaandpremie * 12)} />

            <Rekenregel
              label="Inleg na tien jaar"
              waarde={formatEuro(totaleInlegZonderRendement)}
            />

            <Rekenregel
              label="Fictieve eindwaarde bij 5%"
              waarde={formatEuro(fictieveEindwaarde)}
              accent
            />

            <Rekenregel label="Eigen bijdrage" waarde={formatEuro(werknemersbijdrage)} />

            <Rekenregel label="Werkgeversbijdrage" waarde={formatEuro(werkgeversbijdrage)} />

            <Rekenregel
              label="Berekend fictief rendement"
              waarde={formatEuro(fictiefRendement)}
              accent
            />
          </dl>

          <p className="mt-6 rounded-xl bg-gray-100 p-4 text-sm leading-relaxed dark:bg-gray-800">
            Dit is alleen een rekenvoorbeeld. De berekening gaat uit van een constante maandelijkse
            inleg aan het einde van iedere maand en een fictief constant rendement van 5% per jaar.
            Werkelijke pensioenpremies, kosten, risicodekkingen, rendementen en de verdeling tussen
            werkgever en werknemer verschillen per regeling. Rendement is niet gegarandeerd.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={pensioenRoutes.werkgeverspensioen}
            className="rounded-xl bg-emerald-700 px-6 py-3 text-center font-bold text-white hover:bg-emerald-600"
          >
            Lees alles over pijler 2 →
          </Link>

          <a
            href={externeRoutes.mijnPensioenoverzicht}
            className="rounded-xl border border-gray-300 px-6 py-3 text-center font-bold hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            Bekijk je officiële pensioen bij Mijnpensioenoverzicht.nl ↗
          </a>
        </div>
      </section>

      <section
        id="zelf-regelen"
        className="scroll-mt-40 border-t border-gray-200 py-16 dark:border-gray-700"
      >
        <p className="font-semibold tracking-wider text-violet-700 uppercase dark:text-violet-300">
          Derde pensioenpijler
        </p>

        <h2 className="mt-3 text-3xl font-black sm:text-4xl">Pijler 3: wat je zelf regelt</h2>

        <p className="mt-5 text-lg leading-relaxed">
          Wanneer je AOW en werkgeverspensioen samen niet aansluiten bij je gewenste inkomen voor
          later, kun je mogelijk zelf een aanvullende voorziening opbouwen.
        </p>

        <p className="mt-4 text-lg leading-relaxed">
          Dat kan bijvoorbeeld via een lijfrenteverzekering, een lijfrenterekening of een
          lijfrentebeleggingsrecht. Je kunt ook vrij sparen of beleggen, maar dat heeft andere
          fiscale eigenschappen.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-violet-700 text-lg font-black text-white">
              A
            </span>

            <h3 className="mt-5 text-2xl font-black">Fiscaal pensioenproduct</h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
              <li>Bedoeld om inkomen voor later op te bouwen.</li>

              <li>De inleg kan onder voorwaarden aftrekbaar zijn in box 1.</li>

              <li>
                De mogelijke aftrek is beperkt tot je persoonlijke jaarruimte en reserveringsruimte.
              </li>

              <li>Het opgebouwde geld is gebonden aan fiscale voorwaarden.</li>

              <li>Over de latere uitkeringen wordt inkomstenbelasting betaald.</li>

              <li>Voortijdig afkopen of opnemen kan nadelige fiscale gevolgen hebben.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-lg font-black text-white">
              B
            </span>

            <h3 className="mt-5 text-2xl font-black">Vrij sparen of beleggen</h3>

            <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
              <li>De inleg is niet aftrekbaar via jaarruimte of reserveringsruimte.</li>

              <li>Het geld is doorgaans vrijer beschikbaar.</li>

              <li>Het vermogen kan, afhankelijk van je situatie, gevolgen hebben voor box 3.</li>

              <li>
                Risico, kosten, beschikbaarheid en verwacht rendement verschillen per product.
              </li>

              <li>Omdat het geld vrij beschikbaar is, kun je het ook eerder uitgeven.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <Link
            href={pensioenRoutes.jaarruimte}
            className="rounded-xl border border-gray-200 p-5 font-bold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Bekijk de jaarruimte →
          </Link>
          <Link
            href={pensioenRoutes.reserveringsruimte}
            className="rounded-xl border border-gray-200 p-5 font-bold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Bekijk de reserveringsruimte →
          </Link>
          <Link
            href={pensioenRoutes.zelfRegelen}
            className="rounded-xl border border-gray-200 p-5 font-bold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Lees meer over zelf pensioen regelen →
          </Link>
        </div>

        <p className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 leading-relaxed font-semibold dark:bg-amber-950">
          Een storting in een pensioenproduct is niet automatisch aftrekbaar. Je hebt alleen recht
          op aftrek wanneer je aan de fiscale voorwaarden voldoet en voldoende jaarruimte of
          reserveringsruimte hebt. Gebruik voor je aangifte de officiële berekening en laat de
          uitkomst bij twijfel controleren.
        </p>
      </section>
    </>
  )
}

type RekenregelProps = {
  label: string
  waarde: string
  accent?: boolean
}

function Rekenregel({ label, waarde, accent = false }: RekenregelProps) {
  return (
    <div
      className={`rounded-xl p-4 ${
        accent ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-gray-50 dark:bg-gray-800'
      }`}
    >
      <dt className="text-sm font-semibold text-gray-600 dark:text-gray-300">{label}</dt>

      <dd
        className={`mt-2 text-2xl font-black ${
          accent ? 'text-emerald-700 dark:text-emerald-300' : ''
        }`}
      >
        {waarde}
      </dd>
    </div>
  )
}

type ActieKaartProps = {
  titel: string
  tekst: string
  href: string
}

function ActieKaart({ titel, tekst, href }: ActieKaartProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
      <h3 className="text-xl font-black">{titel}</h3>

      <p className="mt-3 flex-1 leading-relaxed text-gray-700 dark:text-gray-200">{tekst}</p>

      <Link
        href={href}
        className="mt-5 font-semibold text-blue-700 hover:underline dark:text-blue-300"
      >
        {titel} →
      </Link>
    </div>
  )
}

function eindwaardeMaandelijks(
  maandelijkseInleg: number,
  jaarlijksRendementPercentage: number,
  aantalJaren: number
) {
  const aantalMaanden = aantalJaren * 12
  const maandRendement = jaarlijksRendementPercentage / 100 / 12

  if (maandRendement === 0) {
    return maandelijkseInleg * aantalMaanden
  }

  return maandelijkseInleg * ((Math.pow(1 + maandRendement, aantalMaanden) - 1) / maandRendement)
}

function formatEuro(bedrag: number) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(bedrag)
}
