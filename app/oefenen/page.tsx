import Link from 'next/link'
import OefenlabPensioen from '@/components/pensioen/OefenlabPensioen'
import LoonstrookTool from '@/components/pensioen/LoonstrookTool'
import PensioenOpbouwSimulator from '@/components/pensioen/PensioenOpbouwSimulator'
import PensioenDenkexperiment from '@/components/pensioen/PensioenDenkexperiment'
import RendementVergelijking from '@/components/pensioen/RendementVergelijking'
import PensioenRisicoUitleg from '@/components/pensioen/PensioenRisicoUitleg'
import VervolgKaarten from '@/components/pensioen/VervolgKaarten'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Oefenlab: simulaties over belasting en pensioen',
  description:
    'Oefen met interactieve simulaties over belasting, AOW, pensioenopbouw, vermogen en geldstromen.',
})

export default function OefenlabPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/modules"
          className="font-semibold text-blue-800 hover:underline dark:text-blue-200"
        >
          ← Terug naar modules
        </Link>
        <Link
          href="/modules"
          className="font-semibold text-blue-800 hover:underline dark:text-blue-200"
        >
          Modules en voortgang →
        </Link>
      </nav>
      <header className="max-w-4xl rounded-3xl bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 p-6 text-white sm:p-9">
        <p className="text-sm font-bold tracking-wider text-emerald-300 uppercase">
          Oefenlab · probeer het zelf
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Maak geldstromen zichtbaar
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-200">
          Verander bedragen en keuzes, bekijk wat er gebeurt en vergelijk de uitkomsten. De
          simulaties zijn voorbeelden om het verhaal beter te begrijpen, geen persoonlijk advies.
        </p>
      </header>
      <nav
        aria-label="Simulaties op deze pagina"
        className="mt-6 flex flex-wrap gap-2 text-sm font-bold"
      >
        {[
          ['Belasting en AOW', '#simulator-teruggave'],
          ['Loonstrook', '#loonstrook'],
          ['Pensioenopbouw', '#pensioen-opbouw'],
          ['Vroeg beginnen', '#vroeg-beginnen'],
          ['Denkexperiment', '#pensioen-denkexperiment'],
          ['Geldstromen', '#simulator-geldstromen'],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-gray-300 px-4 py-2 hover:border-blue-600 hover:text-blue-800 dark:border-gray-700 dark:hover:text-blue-200"
          >
            {label}
          </a>
        ))}
      </nav>
      <section
        id="loonstrook"
        className="mt-10 scroll-mt-28 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-900"
        aria-labelledby="loonstrook-title"
      >
        <h2 id="loonstrook-title" className="text-2xl font-black">
          Waar zie je pensioen terug op je loonstrook?
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
          Verken hoe loon, pensioenpremie en de drie pensioenpijlers zich tot elkaar verhouden.
          Bedragen zijn voorbeelden en geen berekening van je nettoloon.
        </p>
        <LoonstrookTool />
      </section>
      <section
        id="pensioen-opbouw"
        className="mt-10 scroll-mt-28"
        aria-labelledby="pensioen-opbouw-title"
      >
        <h2 id="pensioen-opbouw-title" className="text-2xl font-black">
          Pensioenopbouw via je werkgever
        </h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
          Pensioengevend salaris min franchise geeft de pensioengrondslag. De regeling bepaalt hoe
          de premie wordt berekend en verdeeld tussen werknemer en werkgever.
        </p>
        <PensioenOpbouwSimulator />
      </section>
      <section
        id="vroeg-beginnen"
        className="mt-10 scroll-mt-28 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-gray-900"
        aria-labelledby="vroeg-beginnen-title"
      >
        <p className="font-bold tracking-wider text-blue-700 uppercase dark:text-blue-300">
          Pensioen en tijd
        </p>
        <h2 id="vroeg-beginnen-title" className="mt-2 text-3xl font-black">
          Wat doet vroeg beginnen?
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-gray-700 dark:text-gray-200">
          Vergelijk een vroege en late start. Rendement is onzeker; de bedragen zijn voorbeelden,
          geen voorspelling of garantie.
        </p>
        <RendementVergelijking />
        <PensioenRisicoUitleg />
        <VervolgKaarten />
      </section>
      <section
        id="pensioen-denkexperiment"
        className="mt-10 scroll-mt-28"
        aria-label="Interactief pensioen-denkexperiment"
      >
        <PensioenDenkexperiment />
      </section>
      <OefenlabPensioen />
    </main>
  )
}
