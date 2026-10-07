import BelastingBasisCursus from '@/components/pensioen/BelastingBasisCursus'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Module 0: begrijp belasting betalen',
  description:
    'Interactieve basiscursus over loonheffing, inkomstenbelasting, box 1, box 2, box 3, je eigen woning, sparen en pensioen.',
})

export default function BelastingBasisPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12">
      <header className="mb-7 max-w-4xl rounded-3xl bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 p-6 text-white sm:p-9">
        <p className="text-sm font-bold tracking-wider text-emerald-300 uppercase">
          Basis · 14 hoofdstukken + eindopdracht
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Module 0 — begrijp belasting betalen
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-200">
          Volg je geld van salaris naar loonheffing, aangifte, de drie boxen en je keuzes voor
          later. Elke stap heeft dezelfde opbouw: uitleg, een grafisch voorbeeld, een onthoudpunt en
          een korte kennischeck.
        </p>
      </header>
      <BelastingBasisCursus />
    </main>
  )
}
