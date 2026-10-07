import Link from 'next/link'
import { pensioenRoutes } from '@/lib/pensioen/rendement'

const kaarten = [
  {
    titel: 'Jaarruimte',
    omschrijving:
      'Jaarruimte kijkt naar je pensioentekort. Voor de jaarruimte van een bepaald belastingjaar zijn gegevens uit het voorafgaande jaar nodig, waaronder je inkomen en pensioenaangroei.',
    gegevens: [
      'Belastingjaar',
      'Inkomen uit het relevante voorafgaande jaar',
      'Pensioenaangroei of relevante UPO-gegevens',
      'Reeds betaalde lijfrentestortingen',
      'Geboortedatum',
      'Andere wettelijk vereiste gegevens',
    ],
    href: pensioenRoutes.jaarruimte,
  },
  {
    titel: 'Reserveringsruimte',
    omschrijving:
      'Heb je de jaarruimte uit eerdere jaren niet volledig gebruikt? Dan kan het niet-gebruikte deel mogelijk meetellen als reserveringsruimte.',
    gegevens: [
      'Niet-benutte jaarruimte uit eerdere jaren',
      'Historische inkomensgegevens',
      'Historische pensioenopbouw',
      'Eerdere aftrekbare lijfrentestortingen',
      'Het berekeningsjaar',
    ],
    href: pensioenRoutes.reserveringsruimte,
  },
]
export default function VervolgKaarten() {
  return (
    <section className="border-t py-16 dark:border-gray-700">
      <h2 className="text-3xl font-black">Jaarruimte en reserveringsruimte</h2>
      <p className="mt-4 max-w-3xl text-lg">
        Lees wat deze fiscale begrippen betekenen en welke gegevens bij een berekening van belang
        kunnen zijn.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {kaarten.map((kaart) => (
          <div
            key={kaart.titel}
            className="flex flex-col rounded-2xl border p-6 dark:border-gray-700"
          >
            <h3 className="text-2xl font-black">{kaart.titel}</h3>
            <p className="mt-3 leading-relaxed">{kaart.omschrijving}</p>
            <h4 className="mt-6 font-bold">Benodigde gegevens</h4>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {kaart.gegevens.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <Link
              href={kaart.href}
              className="mt-7 rounded-xl bg-blue-700 px-6 py-3 text-center font-bold text-white"
            >
              Bekijk de uitleg
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
