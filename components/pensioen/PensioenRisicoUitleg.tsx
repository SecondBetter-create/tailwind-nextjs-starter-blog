import Link from 'next/link'
import { pensioenRoutes } from '@/lib/pensioen/rendement'

export default function PensioenRisicoUitleg() {
  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-10 dark:border-emerald-900 dark:bg-emerald-950">
      <h2 className="text-3xl font-black">
        Gelukkig hoef je niet zelf het volledige risico te dragen
      </h2>
      <p className="mt-5 text-lg leading-relaxed">
        Zelf beginnen met opbouwen is belangrijk, maar je pensioen hangt in Nederland meestal niet
        alleen af van je eigen spaar- of beleggingsrekening. Het pensioenstelsel bestaat uit drie
        pijlers. De AOW biedt een wettelijke basis. Veel werknemers bouwen daarnaast pensioen op via
        hun werkgever. Wat daarna nog ontbreekt, kun je mogelijk zelf aanvullen.
      </p>
      <p className="mt-5 rounded-2xl bg-white/70 p-5 leading-relaxed dark:bg-black/20">
        <strong>Belangrijke nuance:</strong> dat betekent niet dat pensioen zonder risico is. De
        hoogte van pensioen kan veranderen. In pensioenregelingen via werkgevers worden financiële
        risico&apos;s echter gezamenlijk gedragen en kunnen reserves worden gebruikt om tegenvallers
        te dempen. Bij individueel sparen of beleggen draag je doorgaans meer zelf het risico van
        rendement, kosten en timing.
      </p>
      <Link
        href={pensioenRoutes.pijlers}
        className="mt-7 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-600"
      >
        Bekijk hoe de drie pensioenpijlers samenwerken
      </Link>
    </section>
  )
}
