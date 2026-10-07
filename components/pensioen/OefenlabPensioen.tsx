'use client'

import { useState, type DragEvent } from 'react'
import { eindwaardeMaandelijks, formatEuro } from '@/lib/pensioen/rendement'

const geldformat = new Intl.NumberFormat('nl-NL', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const sectoren = [
  { code: 'S.11', naam: 'Niet-financiële vennootschappen' },
  { code: 'S.12', naam: 'Financiële instellingen' },
  { code: 'S.13', naam: 'Overheid' },
  { code: 'S.14', naam: 'Huishoudens' },
  { code: 'S.15', naam: 'Instellingen zonder winstoogmerk voor huishoudens' },
] as const

const organisaties = [
  { naam: 'Belastingdienst', sector: 'S.13' },
  { naam: 'Werkgevers', sector: 'S.11' },
  { naam: 'Pensioenfondsen', sector: 'S.12' },
  { naam: 'Gemeenten', sector: 'S.13' },
  { naam: 'Huishoudens', sector: 'S.14' },
  { naam: 'Verzekeraars', sector: 'S.12' },
  { naam: 'Buurthuisstichting', sector: 'S.15' },
  { naam: 'UWV en SVB', sector: 'S.13' },
  { naam: 'Zorginstituut Nederland', sector: 'S.13' },
] as const

const publiekeBestemmingen = [
  {
    naam: 'Inkomen en zekerheid',
    voorbeelden: 'AOW, WW, WIA, bijstand en toeslagen',
    icoon: '🤝',
  },
  { naam: 'Zorg', voorbeelden: 'Zorg, langdurige zorg en publieke gezondheid', icoon: '♡' },
  { naam: 'Leren', voorbeelden: 'Scholen, mbo, hbo en universiteiten', icoon: '▤' },
  { naam: 'Leefomgeving', voorbeelden: 'Wegen, water, gemeenten en openbaar vervoer', icoon: '⌂' },
  { naam: 'Samen veilig', voorbeelden: 'Politie, rechtspraak en defensie', icoon: '⬡' },
]

const socialeRegelingen = [
  [
    'AOW',
    'Verzekerden en algemene middelen',
    'AOW-fonds / begroting',
    'Belastingdienst',
    'SVB',
    'Gerechtigde oudere',
  ],
  [
    'Anw',
    'Premies volksverzekeringen',
    'Premie volksverzekeringen',
    'Belastingdienst',
    'SVB',
    'Naaste die aan voorwaarden voldoet',
  ],
  [
    'WW',
    'Premies werknemersverzekeringen, vooral werkgevers',
    'Sectorfonds / Algemeen Werkloosheidsfonds',
    'Belastingdienst',
    'UWV',
    'Werkloze werknemer die aan voorwaarden voldoet',
  ],
  [
    'WIA',
    'Premies werknemersverzekeringen',
    'Arbeidsongeschiktheidsfonds en andere UWV-fondsen',
    'Belastingdienst',
    'UWV',
    'Werknemer die aan voorwaarden voldoet',
  ],
  [
    'Wajong',
    'Publieke middelen',
    'Rijksbegroting',
    'Rijksbegroting',
    'UWV',
    'Jongere die aan voorwaarden voldoet',
  ],
  [
    'Wlz',
    'Premies en publieke middelen',
    'Fonds langdurige zorg',
    'Belastingdienst en CAK, afhankelijk van bijdrage',
    'Zorgkantoren en CAK',
    'Verzekerde met langdurige zorgbehoefte',
  ],
  [
    'Zvw',
    'Nominale premie en werkgeversheffing zijn aparte geldstromen',
    'Zorgverzekeraars / Zorgverzekeringsfonds',
    'Verzekerde, werkgever en Belastingdienst',
    'Zorgverzekeraar',
    'Verzekerde/patiënt',
  ],
  [
    'Kinderbijslag',
    'Publieke middelen',
    'Rijksbegroting',
    'Rijksbegroting',
    'SVB',
    'Ouder/verzorger die recht heeft',
  ],
  [
    'Bijstand',
    'Gemeentelijke middelen en rijksbijdragen',
    'Gemeentebegroting',
    'Gemeente',
    'Gemeente',
    'Inwoner die aan voorwaarden voldoet',
  ],
] as const

export default function OefenlabPensioen() {
  const [verschuldigd, setVerschuldigd] = useState(8000)
  const [ingehouden, setIngehouden] = useState(8500)
  const [verzekerdeJaren, setVerzekerdeJaren] = useState(40)
  const [maandInleg, setMaandInleg] = useState(200)
  const [jaren, setJaren] = useState(35)
  const [rendement, setRendement] = useState(5)
  const [spaargeld, setSpaargeld] = useState(12000)
  const [beleggingen, setBeleggingen] = useState(0)
  const [crypto, setCrypto] = useState(0)
  const [tweedeWoning, setTweedeWoning] = useState(0)
  const [sectorAntwoorden, setSectorAntwoorden] = useState<Record<string, string>>({})
  const [geselecteerd, setGeselecteerd] = useState<string | null>(null)
  const [geselecteerdePartij, setGeselecteerdePartij] = useState('Belastingdienst')

  const belastingVerschil = ingehouden - verschuldigd
  const pensioenWaarde = eindwaardeMaandelijks({
    maandinleg: maandInleg,
    jaarrendementProcent: rendement,
    jaren,
  })
  const pensioenInleg = maandInleg * jaren * 12
  const vermogenVoorbeeld = spaargeld + beleggingen + crypto + tweedeWoning
  const juisteSectoren = organisaties.filter(
    (organisatie) => sectorAntwoorden[organisatie.naam] === organisatie.sector
  ).length

  function plaatsOrganisatie(sector: string, organisatie = geselecteerd) {
    if (!organisatie) return
    setSectorAntwoorden((current) => ({ ...current, [organisatie]: sector }))
    setGeselecteerd(null)
  }

  return (
    <section className="mt-12 space-y-10" aria-labelledby="oefenlab-title">
      <header className="max-w-4xl">
        <p className="font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-200">
          Interactief oefenlab
        </p>
        <h2 id="oefenlab-title" className="mt-2 text-3xl font-black sm:text-4xl">
          Probeer het zelf
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          Pas bedragen en scenario&apos;s aan. De voorbeelden helpen je verbanden ontdekken, maar
          voorspellen niet je persoonlijke belasting of pensioen.
        </p>
      </header>

      <section
        id="simulator-teruggave"
        className="scroll-mt-28 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-900"
        aria-labelledby="teruggave-title"
      >
        <p className="font-bold text-blue-800 dark:text-blue-200">MODULE 3 · SIMULATOR</p>
        <h3 id="teruggave-title" className="mt-2 text-2xl font-black">
          Krijg ik terug of moet ik bijbetalen?
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
          Vul een fictieve jaarafrekening in. Een aangifte is in werkelijkheid uitgebreider en houdt
          rekening met persoonlijke gegevens en de regels voor dat jaar.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Bedrag
            id="belasting-verschuldigd"
            label="Uiteindelijk verschuldigd in dit voorbeeld"
            value={verschuldigd}
            onChange={setVerschuldigd}
          />
          <Bedrag
            id="belasting-ingehouden"
            label="Loonheffing al ingehouden"
            value={ingehouden}
            onChange={setIngehouden}
          />
        </div>
        <div
          className={`mt-6 rounded-2xl p-6 ${
            belastingVerschil >= 0
              ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100'
              : 'bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100'
          }`}
          aria-live="polite"
        >
          <p className="text-2xl font-black">
            {belastingVerschil >= 0 ? 'Terug in dit voorbeeld: ' : 'Bijbetalen in dit voorbeeld: '}
            {geldformat.format(Math.abs(belastingVerschil))}
          </p>
          <p className="mt-2 leading-relaxed">
            {belastingVerschil >= 0
              ? 'Er is meer loonheffing betaald dan de uiteindelijke belasting.'
              : 'Er is minder loonheffing betaald dan de uiteindelijke belasting.'}
          </p>
        </div>
      </section>

      <section
        id="simulator-aow"
        className="scroll-mt-28 rounded-3xl bg-gradient-to-br from-blue-950 to-slate-950 p-6 text-white sm:p-8"
        aria-labelledby="aow-simulator-title"
      >
        <p className="font-bold tracking-wider text-blue-200 uppercase">MODULE 4 · AOW-SIMULATOR</p>
        <h3 id="aow-simulator-title" className="mt-2 text-2xl font-black">
          Hoeveel verzekerde jaren tel ik?
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-slate-200">
          De vereenvoudigde vuistregel is 2% per verzekerd jaar in de opbouwperiode van 50 jaar vóór
          je AOW-leeftijd. Pas de slider aan om te zien wat verzekerde jaren betekenen.
        </p>
        <label htmlFor="aow-jaren" className="mt-7 block font-bold">
          Verzekerde jaren: {verzekerdeJaren} van 50
        </label>
        <input
          id="aow-jaren"
          type="range"
          min={0}
          max={50}
          value={verzekerdeJaren}
          onChange={(event) => setVerzekerdeJaren(Number(event.target.value))}
          className="mt-3 w-full accent-emerald-400"
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="h-5 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-emerald-400 transition-[width] duration-500"
              style={{ width: `${verzekerdeJaren * 2}%` }}
            />
          </div>
          <p className="text-3xl font-black">{verzekerdeJaren * 2}% van volledige opbouw</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">
          Gemiste verzekerde jaren: {50 - verzekerdeJaren}. Volgens deze vuistregel verlaagt elk
          onverzekerd jaar de opbouw met ongeveer 2 procentpunt.
        </p>
        <p className="mt-5 rounded-xl border border-white/15 bg-white/5 p-4 text-sm leading-relaxed text-slate-200">
          Dit is alleen de opbouwvuistregel, geen eurobedrag of rechtentoets. Wonen en werken,
          verzekeringsstatus, verdragen en vrijwillige verzekering kunnen verschil maken. Vraag je
          eigen overzicht op bij de SVB. Een jaar zonder inkomen kan toch een verzekerd jaar zijn;
          meer premie betalen geeft niet vanzelf meer AOW.
        </p>
        <div
          className="mt-6 grid gap-2 sm:grid-cols-9 sm:items-center"
          aria-label="Vereenvoudigde AOW-geldstroom"
        >
          {[
            ['Werkenden van nu', 'dragen bij'],
            ['Belastingdienst', 'int premie'],
            ['AOW-fonds en begroting', 'financieren samen'],
            ['SVB', 'voert uit'],
            ['AOW-gerechtigden', 'ontvangen AOW'],
          ].map(([titel, uitleg], index, rij) => (
            <div key={titel} className="contents">
              <StroomNode titel={titel} uitleg={uitleg} />
              {index < rij.length - 1 && (
                <span
                  className="hidden text-center text-2xl text-emerald-300 sm:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        id="simulator-rendement"
        className="scroll-mt-28 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-900"
        aria-labelledby="rendement-simulator-title"
      >
        <p className="font-bold text-blue-800 dark:text-blue-200">MODULE 5 · RENDEMENTSSIMULATOR</p>
        <h3 id="rendement-simulator-title" className="mt-2 text-2xl font-black">
          Wat kan maandelijks inleggen op termijn doen?
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <label className="block font-bold">
            Maandelijkse inleg
            <select
              value={maandInleg}
              onChange={(event) => setMaandInleg(Number(event.target.value))}
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-slate-950"
            >
              {[100, 200, 300].map((value) => (
                <option key={value} value={value}>
                  {geldformat.format(value)} per maand
                </option>
              ))}
            </select>
          </label>
          <label className="block font-bold">
            Looptijd
            <select
              value={jaren}
              onChange={(event) => setJaren(Number(event.target.value))}
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-slate-950"
            >
              {[25, 35, 45].map((value) => (
                <option key={value} value={value}>
                  {value} jaar
                </option>
              ))}
            </select>
          </label>
          <label className="block font-bold">
            Verondersteld gemiddeld rendement per jaar
            <select
              value={rendement}
              onChange={(event) => setRendement(Number(event.target.value))}
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white p-3 dark:border-gray-700 dark:bg-slate-950"
            >
              {[3, 5, 7].map((value) => (
                <option key={value} value={value}>
                  {value}% (rekenvoorbeeld)
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <ResultaatKaart
            label="Eigen inleg samen"
            bedrag={pensioenInleg}
            maximum={Math.max(pensioenWaarde, pensioenInleg)}
            kleur="bg-blue-700"
          />
          <ResultaatKaart
            label="Rekenkundige eindwaarde"
            bedrag={pensioenWaarde}
            maximum={Math.max(pensioenWaarde, pensioenInleg)}
            kleur="bg-emerald-700"
          />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <h4 className="font-black">Niets extra&apos;s inleggen</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              Extra inleg in dit voorbeeld: € 0. Andere pijlers, zoals AOW en een bestaande
              werkgeversregeling, kunnen wel verder opbouwen.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <h4 className="font-black">Vandaag extra beginnen</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              Bij {geldformat.format(maandInleg)} per maand is je totale voorbeeldinleg na {jaren}{' '}
              jaar {geldformat.format(pensioenInleg)}; de rekenkundige eindwaarde is{' '}
              {geldformat.format(pensioenWaarde)}. Rendement is onzeker en de uitkomst is geen
              voorspelling.
            </p>
          </div>
        </div>
        <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed dark:bg-amber-950">
          <strong>Geen voorspelling of garantie.</strong> Dit model rekent met vaste maandinleg en
          rendement, zonder inflatie, veranderende inleg, belastingen, productkosten of
          koersschommelingen. Een goed of slecht rendement is niet voorspelbaar. Beginnen geeft
          rendement meer tijd, maar kies een risico dat bij je past.
        </p>
      </section>

      <section
        id="vergelijk-sparen"
        className="scroll-mt-28 rounded-3xl border border-gray-200 p-6 sm:p-8 dark:border-gray-700"
        aria-labelledby="vergelijk-title"
      >
        <p className="font-bold text-blue-800 dark:text-blue-200">MODULE 7 · VERGELIJKEN</p>
        <h3 id="vergelijk-title" className="mt-2 text-2xl font-black">
          Drie routes voor geld later
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <VergelijkKaart
            naam="Vrij sparen"
            kleur="border-blue-500"
            plus="Meestal eenvoudig opneembaar; handig voor buffer en doelen dichtbij."
            aandacht="Rente kan lager zijn dan inflatie; vrij vermogen kan in box 3 meetellen."
          />
          <VergelijkKaart
            naam="Pensioen via werk"
            kleur="border-emerald-500"
            plus="Regeling via werk met premie en opbouw volgens de afspraken."
            aandacht="Niet vrij opneembaar zoals een bankrekening; resultaat en bescherming volgen de regeling."
          />
          <VergelijkKaart
            naam="Zelf beleggen of lijfrente"
            kleur="border-amber-500"
            plus="Je kiest zelf hoe je aanvult; een kwalificerende lijfrente kan fiscale ruimte hebben."
            aandacht="Beleggen kan dalen; product, kosten, belastingregels en voorwaarden verschillen."
          />
        </div>
        <p className="mt-5 leading-relaxed text-gray-700 dark:text-gray-200">
          Een buffer voor onverwachte kosten vraagt vaak om toegankelijk geld. Pensioengeld heeft
          meestal een bestemming voor later. Denk daarom niet alleen aan rendement, maar ook aan
          risico, kosten, toegang en bescherming.
        </p>
      </section>

      <section
        id="simulator-box3"
        className="scroll-mt-28 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-900"
        aria-labelledby="box3-title"
      >
        <p className="font-bold text-blue-800 dark:text-blue-200">MODULE 8 · BOX-3-OEFENING</p>
        <h3 id="box3-title" className="mt-2 text-2xl font-black">
          Welke bezittingen kunnen bij vermogen horen?
        </h3>
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-200">
          Vul fictieve bedragen in. De oefening telt ze op om vermogen te bespreken, maar berekent
          geen belastbaar bedrag of belasting.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Bedrag id="box3-spaargeld" label="Spaargeld" value={spaargeld} onChange={setSpaargeld} />
          <Bedrag
            id="box3-beleggingen"
            label="Beleggingen"
            value={beleggingen}
            onChange={setBeleggingen}
          />
          <Bedrag id="box3-crypto" label="Crypto" value={crypto} onChange={setCrypto} />
          <Bedrag
            id="box3-tweede-woning"
            label="Voorbeeldwaarde tweede woning"
            value={tweedeWoning}
            onChange={setTweedeWoning}
          />
        </div>
        <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
          <p className="text-sm font-bold tracking-wider text-slate-300 uppercase">
            Opgetelde voorbeeldbezittingen
          </p>
          <p className="mt-2 text-3xl font-black">{formatEuro(vermogenVoorbeeld)}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            Dit bedrag is geen box-3-belastinggrondslag. Vrijstellingen, schulden, waardering en de
            regels van het betreffende jaar zijn hier niet verwerkt. Een eigen woning valt meestal
            in box 1; box-3-regels kunnen veranderen.
          </p>
        </div>
      </section>

      <section
        id="simulator-geldstromen"
        className="scroll-mt-28 rounded-3xl bg-slate-950 p-6 text-white sm:p-8"
        aria-labelledby="geldstromen-kaart-title"
      >
        <p className="font-bold text-emerald-300">MODULE 10 · GELDSTROMENKAART</p>
        <h3 id="geldstromen-kaart-title" className="mt-2 text-2xl font-black">
          Kies een route door Nederland
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-slate-200">
          Selecteer een partij. De kaart laat voorbeelden zien van geld dat binnenkomt en waar
          publieke uitgaven aan bijdragen. Bedragen op een loonstrook zijn niet individueel
          geoormerkt aan een van deze bestemmingen.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Werknemers', 'Werkgevers', 'Bedrijven', 'Consumenten', 'Belastingdienst'].map(
            (partij) => (
              <button
                type="button"
                key={partij}
                aria-pressed={geselecteerdePartij === partij}
                onClick={() => setGeselecteerdePartij(partij)}
                className={`rounded-xl border px-4 py-2 font-bold ${
                  geselecteerdePartij === partij
                    ? 'border-emerald-300 bg-emerald-800 text-white'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                {partij}
              </button>
            )
          )}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          <StroomNode
            titel={
              geselecteerdePartij === 'Belastingdienst'
                ? 'Huishoudens, werkgevers, bedrijven en consumenten'
                : geselecteerdePartij
            }
            uitleg={
              geselecteerdePartij === 'Belastingdienst'
                ? 'Betalen verschillende belastingen en premies; welke partij betaalt, hangt af van de heffing.'
                : 'Betaalt belasting, premie, prijs of bijdrage. Niet elke betaling gaat naar de overheid.'
            }
          />
          <span className="grid place-items-center text-3xl text-emerald-300" aria-hidden="true">
            →
          </span>
          <StroomNode
            titel={
              geselecteerdePartij === 'Belastingdienst'
                ? 'Belastingdienst'
                : 'Ontvanger of uitvoerder'
            }
            uitleg={
              geselecteerdePartij === 'Belastingdienst'
                ? 'Ontvangt belastingen en bepaalde premies. Andere geldstromen kunnen naar fondsen, pensioenuitvoerders of verzekeraars lopen.'
                : 'Verwerkt geld voor een bepaalde belasting, verzekering, dienst of regeling.'
            }
          />
          <span className="grid place-items-center text-3xl text-emerald-300" aria-hidden="true">
            →
          </span>
          <StroomNode
            titel={
              geselecteerdePartij === 'Belastingdienst'
                ? 'Gezamenlijke publieke uitgaven'
                : 'Regeling, fonds of aanbieder'
            }
            uitleg="De bestemming hangt af van de regeling. Publieke uitgaven komen uit gezamenlijke middelen."
          />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {publiekeBestemmingen.map((bestemming) => (
            <article
              key={bestemming.naam}
              className="rounded-xl border border-white/15 bg-white/5 p-4"
            >
              <p className="text-2xl" aria-hidden="true">
                {bestemming.icoon}
              </p>
              <h4 className="mt-2 font-bold">{bestemming.naam}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {bestemming.voorbeelden}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          Voorbeelden van gezamenlijke publieke uitgaven; dit is geen verdeling van jouw specifieke
          euro en ook geen vast percentage.
        </p>
      </section>

      <section
        id="overzicht-sociale-zekerheid"
        className="scroll-mt-28 rounded-3xl border border-gray-200 p-6 sm:p-8 dark:border-gray-700"
        aria-labelledby="sociale-zekerheid-title"
      >
        <p className="font-bold text-blue-800 dark:text-blue-200">MODULE 9 · OVERZICHT</p>
        <h3 id="sociale-zekerheid-title" className="mt-2 text-2xl font-black">
          Volg de route per regeling
        </h3>
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-200">
          Dit is een vereenvoudigde routekaart, geen juridisch schema. Premie-inning, fonds,
          financiering en uitvoering verschillen en kunnen meerdere partijen omvatten.
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                {[
                  'Regeling',
                  'Wie betaalt?',
                  'Fonds / financieringsbron',
                  'Wie int?',
                  'Wie voert uit?',
                  'Wie ontvangt?',
                ].map((heading) => (
                  <th scope="col" key={heading} className="p-3 font-bold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {socialeRegelingen.map((regeling) => (
                <tr key={regeling[0]} className="border-t border-gray-200 dark:border-gray-700">
                  {regeling.map((cel, index) =>
                    index === 0 ? (
                      <th scope="row" key={`${regeling[0]}-${cel}`} className="p-3 font-bold">
                        {cel}
                      </th>
                    ) : (
                      <td key={`${regeling[0]}-${index}`} className="p-3 leading-relaxed">
                        {cel}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Bij de Zvw zijn de nominale zorgpremie die de verzekerde betaalt en de werkgeversheffing
          twee verschillende geldstromen. Regels en verantwoordelijkheden kunnen wijzigen; gebruik
          dit overzicht om vragen te stellen, niet als individueel besluit.
        </p>
      </section>

      <section
        id="oefening-sectoren"
        className="scroll-mt-28 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-900"
        aria-labelledby="sectoren-oefening-title"
      >
        <p className="font-bold text-blue-800 dark:text-blue-200">MODULE 11 · SORTEEROEFENING</p>
        <h3 id="sectoren-oefening-title" className="mt-2 text-2xl font-black">
          Zet elke organisatie bij een CBS-sector
        </h3>
        <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-200">
          Kies een organisatie en klik op een sector, of sleep haar naar een vak. Meerdere
          organisaties kunnen bij dezelfde sector horen. Deze voorbeelden zijn vereenvoudigd;
          officiële indelingen volgen de statistische kenmerken van de instelling.
        </p>
        <p className="mt-3 font-bold" aria-live="polite">
          {juisteSectoren} van {organisaties.length} organisaties goed geplaatst
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {organisaties.map((organisatie) => {
            const beantwoord = sectorAntwoorden[organisatie.naam]
            const juist = beantwoord === organisatie.sector
            return (
              <button
                type="button"
                draggable
                key={organisatie.naam}
                aria-pressed={geselecteerd === organisatie.naam}
                onClick={() => setGeselecteerd(organisatie.naam)}
                onDragStart={(event) => event.dataTransfer.setData('text/plain', organisatie.naam)}
                className={`rounded-full border px-4 py-2 font-semibold ${
                  juist
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
                    : geselecteerd === organisatie.naam
                      ? 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100'
                      : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950'
                }`}
              >
                {juist ? '✓ ' : ''}
                {organisatie.naam}
                {beantwoord && !juist ? ' · probeer opnieuw' : ''}
              </button>
            )
          })}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sectoren.map((sector) => {
            const geplaatst = organisaties.filter(
              (organisatie) => sectorAntwoorden[organisatie.naam] === sector.code
            )
            return (
              <div
                key={sector.code}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  placeDraggedOrganization(event, sector.code, plaatsOrganisatie)
                }}
                className="rounded-2xl border-2 border-dashed border-gray-300 p-4 dark:border-gray-700"
              >
                <h4 className="font-black">
                  {sector.code} · {sector.naam}
                </h4>
                <div className="mt-3 flex min-h-9 flex-wrap gap-2">
                  {geplaatst.map((organisatie) => (
                    <span
                      key={organisatie.naam}
                      className={`rounded-lg px-2 py-1 text-sm ${
                        organisatie.sector === sector.code
                          ? 'bg-emerald-100 text-emerald-950 dark:bg-emerald-900 dark:text-emerald-100'
                          : 'bg-rose-100 text-rose-950 dark:bg-rose-900 dark:text-rose-100'
                      }`}
                    >
                      {organisatie.naam}
                    </span>
                  ))}
                  {geplaatst.length === 0 && (
                    <span className="text-sm text-gray-500">
                      Selecteer een organisatie hierboven
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  disabled={!geselecteerd}
                  onClick={() => plaatsOrganisatie(sector.code)}
                  className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white enabled:hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-700"
                >
                  Plaats geselecteerde organisatie
                </button>
              </div>
            )
          })}
        </div>
        {juisteSectoren === organisaties.length && (
          <p
            role="status"
            className="mt-5 rounded-xl bg-emerald-50 p-4 font-bold dark:bg-emerald-950"
          >
            Goed gedaan! Je hebt alle voorbeelden geplaatst. Een sectorcode beschrijft de instelling
            in economische statistieken; hij vertelt niet rechtstreeks wie een uitkering uitvoert.
          </p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          S.11 niet-financiële vennootschappen · S.12 financiële instellingen · S.13 overheid · S.14
          huishoudens · S.15 instellingen zonder winstoogmerk ten behoeve van huishoudens. Een
          pensioenfonds valt in deze indeling doorgaans onder S.12, niet S.13.
        </p>
      </section>
    </section>
  )
}

function placeDraggedOrganization(
  event: DragEvent<HTMLDivElement>,
  sector: string,
  place: (sector: string, organization?: string | null) => void
) {
  const naam = event.dataTransfer.getData('text/plain')
  if (organisaties.some((organisatie) => organisatie.naam === naam)) place(sector, naam)
}

function Bedrag({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <label htmlFor={id} className="block font-bold">
      {label}
      <span className="mt-2 flex items-center rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950">
        <span className="pl-4 text-gray-500">€</span>
        <input
          id={id}
          type="number"
          min={0}
          max={1000000}
          step={500}
          value={value}
          onChange={(event) =>
            onChange(Math.min(1000000, Math.max(0, Number(event.target.value) || 0)))
          }
          className="w-full rounded-xl border-0 bg-transparent px-3 py-3 tabular-nums focus:ring-2 focus:ring-blue-500"
        />
      </span>
    </label>
  )
}

function ResultaatKaart({
  label,
  bedrag,
  maximum,
  kleur,
}: {
  label: string
  bedrag: number
  maximum: number
  kleur: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
      <p className="font-semibold text-gray-600 dark:text-gray-300">{label}</p>
      <p className="mt-2 text-2xl font-black tabular-nums">{geldformat.format(bedrag)}</p>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${kleur}`}
          style={{ width: `${Math.max(0, Math.min(100, (bedrag / Math.max(maximum, 1)) * 100))}%` }}
        />
      </div>
    </div>
  )
}

function VergelijkKaart({
  naam,
  kleur,
  plus,
  aandacht,
}: {
  naam: string
  kleur: string
  plus: string
  aandacht: string
}) {
  return (
    <article className={`rounded-2xl border-l-4 ${kleur} bg-gray-50 p-5 dark:bg-gray-950`}>
      <h4 className="text-lg font-black">{naam}</h4>
      <p className="mt-3 leading-relaxed">
        <strong>Handig om te weten:</strong> {plus}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
        <strong>Let op:</strong> {aandacht}
      </p>
    </article>
  )
}

function StroomNode({ titel, uitleg }: { titel: string; uitleg: string }) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-5">
      <p className="text-sm font-bold tracking-wider text-emerald-300 uppercase">
        {titel === 'Belastingdienst' ? 'Ontvanger / route' : 'Stap in de route'}
      </p>
      <h4 className="mt-2 text-xl font-black">{titel}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">{uitleg}</p>
    </article>
  )
}
