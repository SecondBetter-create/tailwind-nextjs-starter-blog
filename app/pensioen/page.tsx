import GeldstroomInfographic from '@/components/pensioen/GeldstroomInfographic'
import Image from '@/components/Image'
import Link from 'next/link'
import PensioenPijlersUitleg from '@/components/pensioen/PensioenPijlersUitleg'
import PensioenDetails from '@/components/pensioen/PensioenDetails'
import { pensioenRoutes } from '@/lib/pensioen/rendement'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Volg het geld',
  description:
    'Interactieve infographic over sociale premies, pensioenpremies, uitvoerders en uitkeringen.',
})

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-7">
        <Link
          href="/modules"
          className="font-semibold text-blue-800 hover:underline dark:text-blue-200"
        >
          ← Terug naar de modules
        </Link>
      </nav>
      <header className="mb-12 max-w-4xl">
        <p className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase">
          Interactieve infographic
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Waar gaat het geld van werknemer en werkgever naartoe?
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Een werknemer ziet inhoudingen op het loon, terwijl een werkgever daarnaast eigen premies
          en werkgeverslasten betaalt. Volg de verschillende geldstromen naar de Belastingdienst,
          pensioenuitvoerder, SVB, UWV en de uiteindelijke voorzieningen.
        </p>

        <div className="mt-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5 dark:bg-amber-950">
          <p className="font-semibold">Let op het verschil tussen innen en uitvoeren</p>

          <p className="mt-2 leading-relaxed">
            De organisatie die een bedrag int, is niet altijd dezelfde organisatie die de regeling
            uitvoert of de uitkering betaalt.
          </p>
        </div>
      </header>

      <section className="mb-12 rounded-2xl border border-gray-200 bg-blue-50 p-6 dark:border-gray-700 dark:bg-blue-950">
        <h2 className="text-2xl font-bold">Pensioen op je loonstrook</h2>
        <p className="mt-2 max-w-3xl leading-relaxed">
          Bekijk met een interactieve voorbeeldstrook hoe de drie pijlers verschillen: AOW, pensioen
          via je werkgever en zelf aanvullen.
        </p>
        <Link
          href={pensioenRoutes.loonstrook}
          className="mt-5 inline-block rounded-xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-600"
        >
          Probeer de loonstrooktool →
        </Link>
      </section>

      <section className="mb-12" aria-labelledby="rollen-heading">
        <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
          Eerst het onderscheid
        </p>
        <h2 id="rollen-heading" className="mt-2 text-3xl font-black">
          Betalen, innen en uitvoeren zijn verschillende rollen
        </h2>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Een geldstroom loopt niet altijd rechtstreeks van je loon naar een uitkering. Een
          werkgever of werknemer kan betalen, de Belastingdienst kan heffen en een andere
          organisatie kan de regeling uitvoeren. Bij werkgeverspensioen kan een pensioenfonds,
          verzekeraar of PPI de regeling uitvoeren en het vermogen beleggen.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
            <h3 className="text-xl font-bold">1. Wie betaalt?</h3>
            <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
              Werknemers en werkgevers kunnen verschillende bedragen bijdragen. Welke partij betaalt
              hangt af van de regeling en het soort premie.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
            <h3 className="text-xl font-bold">2. Wie int of beheert?</h3>
            <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
              De Belastingdienst verwerkt belasting en veel premies. Een pensioenuitvoerder beheert
              een werkgeversregeling; dat zijn verschillende taken.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
            <h3 className="text-xl font-bold">3. Wie voert uit?</h3>
            <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
              De SVB voert onder meer de AOW uit, het UWV voert werknemersverzekeringen uit en
              pensioenuitvoerders verzorgen regelingen via werkgevers.
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-100 p-5 dark:bg-gray-900">
          <h3 className="font-bold">Partijen horen bij verschillende sectoren</h3>
          <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
            Huishoudens, werkgevers en andere bedrijven, de overheid, financiële instellingen en
            maatschappelijke organisaties spelen elk een andere rol. Dit zijn groepen om
            organisaties te begrijpen, geen vaste opeenvolgende stappen in iedere geldstroom.
          </p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-950">
            <h3 className="text-xl font-bold">AOW en sociale zekerheid</h3>
            <p className="mt-3 leading-relaxed">
              AOW-premies en publieke middelen dragen bij aan de wettelijke basisvoorziening. De AOW
              is geen persoonlijke beleggingspot; de SVB verzorgt de uitvoering. Voor
              werknemersverzekeringen lopen werkgeverspremies via een andere route en voert het UWV
              uitkeringen uit.
            </p>
            <Link
              href={pensioenRoutes.pijlers}
              className="mt-4 inline-flex font-bold text-blue-700 hover:underline dark:text-blue-300"
            >
              Lees over AOW <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </article>

          <article className="rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950">
            <h3 className="text-xl font-bold">Pensioen via je werkgever</h3>
            <p className="mt-3 leading-relaxed">
              Premies van werknemer en werkgever gaan naar de uitvoerder van de regeling. Inleg,
              beleggingsresultaten, kosten en eventuele verzekeringen beïnvloeden samen de uitkomst.
              Premiesplitsing en dekking verschillen per regeling.
            </p>
            <Link
              href={`${pensioenRoutes.pijlers}#werkgeverspensioen`}
              className="mt-4 inline-flex font-bold text-emerald-800 hover:underline dark:text-emerald-300"
            >
              Bekijk de tweede pijler <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </article>

          <article className="rounded-2xl bg-amber-50 p-6 dark:bg-amber-950">
            <h3 className="text-xl font-bold">Zelf aanvullend opbouwen</h3>
            <p className="mt-3 leading-relaxed">
              Een lijfrente of pensioenspaarproduct is vrijwillig. Stortingen kunnen binnen de
              fiscale voorwaarden aftrekbaar zijn; belasting wordt dan uitgesteld, niet afgeschaft.
              Jaarruimte en reserveringsruimte hangen af van je gegevens en het belastingjaar.
            </p>
            <Link
              href={pensioenRoutes.jaarruimte}
              className="mt-4 inline-flex font-bold text-amber-900 hover:underline dark:text-amber-200"
            >
              Lees over jaarruimte <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </article>
        </div>

        <p className="mt-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 leading-relaxed dark:bg-amber-950">
          <strong>Ook zorgpremies hebben verschillende routes:</strong> een werkgeversheffing voor
          de Zorgverzekeringswet is niet hetzelfde als de nominale zorgpremie die je zelf
          rechtstreeks aan je zorgverzekeraar betaalt.
        </p>
      </section>

      <GeldstroomInfographic />

      <section className="mt-14" aria-labelledby="pensioenpijlers-heading">
        <div className="mb-8 max-w-4xl">
          <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
            Van geldstroom naar pensioen
          </p>
          <h2 id="pensioenpijlers-heading" className="mt-2 text-3xl font-black sm:text-4xl">
            Drie pijlers, drie verschillende routes
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            Bekijk hoe AOW, werkgeverspensioen en zelf aanvullen samenhangen. Je kunt daarna per
            onderwerp verder leren in de leerroute of een voorbeeld uitproberen in het oefenlab.
          </p>
        </div>
        <PensioenPijlersUitleg />
        <PensioenDetails />
      </section>

      <section aria-labelledby="photos-heading" className="mt-12">
        <h2 id="photos-heading" className="mb-4 text-2xl font-bold">
          Foto's
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="relative h-80 bg-gray-100 dark:bg-gray-800">
              <Image
                src="/static/images/laddertekst.png"
                alt="Een persoon op een ladder bij een gedicht op een muur"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-300">
              Een gedicht op een muur
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="relative h-80 bg-gray-100 dark:bg-gray-800">
              <Image
                src="/static/images/fiets.jpg"
                alt="Een fietsframe op de grond voor een muurschildering van schapen"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="p-3 text-sm text-gray-600 dark:text-gray-300">
              Een fiets bij een muurschildering
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className="mt-12 border-t border-gray-200 pt-6 text-sm leading-relaxed text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <p>
          Deze infographic geeft een vereenvoudigd educatief overzicht. De precieze premieheffing,
          verzekeringsplicht en uitkeringsvoorwaarden kunnen per persoon, werkgever, jaar en
          regeling verschillen.
        </p>
      </footer>
    </main>
  )
}
