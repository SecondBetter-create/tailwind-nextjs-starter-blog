import PijlerKaart from './PijlerKaart'
import { pensioenRoutes } from '@/lib/pensioen/rendement'
import type { Pijler } from '@/lib/pensioen/types'
import { formatEuro } from '@/lib/pensioen/rendement'

const pijlers: Pijler[] = [
  {
    nummer: 1,
    titel: 'AOW',
    subtitel: 'De basis van de overheid',
    kleur: 'bg-blue-900',
    bedrag: 1550,
    href: pensioenRoutes.aow,
  },
  {
    nummer: 2,
    titel: 'Werkgeverspensioen',
    subtitel: 'Samen opgebouwd via het werk',
    kleur: 'bg-emerald-600',
    bedrag: 1100,
    href: pensioenRoutes.werkgeverspensioen,
  },
  {
    nummer: 3,
    titel: 'Zelf geregeld',
    subtitel: 'Je eigen aanvulling',
    kleur: 'bg-amber-400',
    bedrag: 350,
    href: pensioenRoutes.zelfRegelen,
  },
]

export default function PensioenPijlersUitleg() {
  const totaal = pijlers.reduce((som, pijler) => som + pijler.bedrag, 0)
  return (
    <section className="py-16" aria-labelledby="pijlers-titel">
      <div className="text-center">
        <p className="font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
          Drie bronnen
        </p>
        <h2 id="pijlers-titel" className="mt-3 text-3xl font-black sm:text-4xl">
          Je pensioeninkomen kan uit meerdere bronnen bestaan
        </h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pijlers.map((pijler) => (
          <PijlerKaart key={pijler.nummer} pijler={pijler} />
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-slate-950 p-6 text-center text-white">
        <p className="text-sm font-bold tracking-wider text-slate-400 uppercase">
          Fictief bruto voorbeeld. Geen persoonlijk pensioenadvies.
        </p>
        <p className="mt-2 text-3xl font-black">Totaal: {formatEuro(totaal)} per maand</p>
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-600 dark:text-gray-300">
        Niet iedere pijler is bij iedereen even groot. Sommige mensen hebben geen
        werkgeverspensioen. Anderen hebben minder AOW opgebouwd of regelen bewust een extra
        aanvulling.
      </p>
    </section>
  )
}
