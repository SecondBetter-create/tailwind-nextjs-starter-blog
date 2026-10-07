import Link from 'next/link'
import type { Pijler } from '@/lib/pensioen/types'
import { formatEuro } from '@/lib/pensioen/rendement'

export default function PijlerKaart({ pijler }: { pijler: Pijler }) {
  const hoogte = Math.max(10, Math.min(100, (pijler.bedrag / 1550) * 100))
  return (
    <Link
      href={pijler.href}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="mx-auto flex h-72 w-32 items-end overflow-hidden rounded-t-xl rounded-b-3xl border-4 border-gray-300/80 bg-gray-100/40 dark:border-gray-600 dark:bg-gray-800/40">
        <div
          className={`w-full ${pijler.kleur} transition-all duration-1000 motion-reduce:transition-none`}
          style={{ height: `${hoogte}%` }}
        />
      </div>
      <p className="mt-6 text-sm font-bold tracking-wider text-gray-500 uppercase">
        Pijler {pijler.nummer}
      </p>
      <h3 className="mt-1 text-2xl font-black">{pijler.titel}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{pijler.subtitel}</p>
      <p className="mt-4 text-xl font-bold">{formatEuro(pijler.bedrag)} per maand</p>
      <span className="mt-4 inline-block font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
        Lees verder →
      </span>
    </Link>
  )
}
