import Link from 'next/link'
import { pensioenRoutes } from '@/lib/pensioen/rendement'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'PensioenWijzer — begrijp je pensioen',
  description:
    'Volg de geldstromen, ontdek de drie pensioenpijlers en leer welke keuzes bij jouw situatie kunnen passen.',
})

const leerRoute = [
  {
    nummer: '01',
    titel: 'Volg het geld',
    beschrijving:
      'Ontdek wie premies en belastingen betaalt, wie ze int en welke organisaties pensioen of uitkeringen uitvoeren.',
    href: '/pensioen',
    linktekst: 'Bekijk de geldstromen',
  },
  {
    nummer: '02',
    titel: 'Leer de drie pijlers kennen',
    beschrijving:
      'Bekijk het verschil tussen AOW, pensioen via je werkgever en een eigen aanvulling.',
    href: pensioenRoutes.pijlers,
    linktekst: 'Bekijk de drie pijlers',
  },
  {
    nummer: '03',
    titel: 'Lees je loonstrook',
    beschrijving:
      'Zie welke bedragen worden ingehouden en hoe loonheffing en pensioenpremies van elkaar verschillen.',
    href: pensioenRoutes.loonstrook,
    linktekst: 'Open de loonstrooktool',
  },
  {
    nummer: '04',
    titel: 'Bekijk wat je zelf kunt aanvullen',
    beschrijving:
      'Lees hoe jaarruimte en reserveringsruimte werken en welke gegevens voor een berekening nodig zijn.',
    href: pensioenRoutes.jaarruimte,
    linktekst: 'Ontdek jaarruimte',
  },
]

const redenen = [
  {
    titel: 'Later begint met keuzes van nu',
    tekst:
      'Pensioen helpt om inkomen over verschillende levensfasen te verdelen. Zelf vooruitkijken kan voorkomen dat je later voor een onverwacht tekort staat.',
  },
  {
    titel: 'Een basis tegen armoede op oudere leeftijd',
    tekst:
      'De AOW is een wettelijke basisvoorziening. Werkgeverspensioen en eigen aanvullingen kunnen daar, afhankelijk van je situatie, naast staan.',
  },
  {
    titel: 'Risico’s worden niet altijd alleen gedragen',
    tekst:
      'In een collectieve pensioenregeling worden risico’s anders verdeeld dan bij zelf sparen of beleggen. De precieze bescherming hangt af van de regeling.',
  },
]

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
        <p className="font-semibold tracking-[0.2em] text-blue-300 uppercase">PensioenWijzer</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
          Pensioen wordt duidelijker als je de route kent.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 sm:text-xl">
          Geld voor later loopt via verschillende routes. De AOW, een regeling via je werkgever en
          zelf aanvullen zijn niet hetzelfde. Volg stap voor stap wie betaalt, wie uitvoert en wat
          jij kunt onderzoeken.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/modules"
            className="rounded-xl bg-amber-400 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-300"
          >
            Bekijk modules en voortgang
          </Link>
          <Link
            href="/oefenen"
            className="rounded-xl border border-white/30 px-6 py-3 text-center font-bold hover:bg-white/10"
          >
            Probeer de simulaties
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8 dark:border-emerald-900 dark:bg-emerald-950">
        <p className="font-semibold tracking-wider text-emerald-800 uppercase dark:text-emerald-200">
          Leren door te doen
        </p>
        <h2 className="mt-2 text-2xl font-black">Twee modules, korte kennischecks, eigen tempo</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
          Begin met belasting begrijpen en ontdek daarna hoe geldstromen, zekerheid en pensioen
          samenhangen. Beantwoord kennisvragen en zie per module hoe ver je bent. Je voortgang
          blijft op dit apparaat bewaard.
        </p>
        <Link
          href="/modules"
          className="mt-5 inline-flex rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-700 dark:bg-emerald-200 dark:text-emerald-950 dark:hover:bg-emerald-100"
        >
          Naar modules en voortgang <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </section>

      <section className="py-16" aria-labelledby="leerroute-title">
        <div className="max-w-3xl">
          <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
            Een logische route
          </p>
          <h2 id="leerroute-title" className="mt-3 text-3xl font-black sm:text-4xl">
            Van geldstroom naar jouw mogelijkheden
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Je hoeft niet alles tegelijk uit te zoeken. Begin met het overzicht en ga daarna verder
            naar de onderwerpen die voor jou relevant zijn.
          </p>
        </div>

        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {leerRoute.map((stap) => (
            <li
              key={stap.nummer}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <p className="text-sm font-black tracking-widest text-blue-700 dark:text-blue-300">
                STAP {stap.nummer}
              </p>
              <h3 className="mt-3 text-2xl font-bold">{stap.titel}</h3>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                {stap.beschrijving}
              </p>
              <Link
                href={stap.href}
                className="mt-5 inline-flex font-bold text-blue-700 hover:underline dark:text-blue-300"
              >
                {stap.linktekst} <span aria-hidden="true">&nbsp;→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="border-t border-gray-200 py-14 dark:border-gray-700"
        aria-labelledby="waarom-title"
      >
        <div className="max-w-3xl">
          <p className="font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-300">
            Waarom is er een pensioenstelsel?
          </p>
          <h2 id="waarom-title" className="mt-3 text-3xl font-black">
            Inkomen voor later is meer dan zelf sparen
          </h2>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {redenen.map((reden) => (
            <article key={reden.titel} className="rounded-2xl bg-gray-100 p-6 dark:bg-gray-900">
              <h3 className="text-xl font-bold">{reden.titel}</h3>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">{reden.tekst}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/oefenen#pensioen-denkexperiment"
            className="inline-flex font-bold text-blue-700 hover:underline dark:text-blue-300"
          >
            Lees meer over pensioen en belasting <span aria-hidden="true">&nbsp;→</span>
          </Link>
          <Link
            href={pensioenRoutes.vroegBeginnen}
            className="inline-flex font-bold text-blue-700 hover:underline dark:text-blue-300"
          >
            Bekijk het effect van vroeg beginnen <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
      </section>

      <aside className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-gray-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
        <h2 className="text-lg font-bold">Wegwijzer, geen persoonlijk advies</h2>
        <p className="mt-2 leading-relaxed">
          Regels, bedragen en pensioenafspraken kunnen veranderen en verschillen per persoon en
          regeling. Gebruik de uitleg als startpunt en controleer persoonlijke gegevens bij je
          pensioenuitvoerder, de SVB of de Belastingdienst.
        </p>
      </aside>
    </main>
  )
}
