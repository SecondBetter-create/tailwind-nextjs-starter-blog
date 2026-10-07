const legendaItems = [
  {
    label: 'Betaler',
    kleur: 'bg-slate-400',
    uitleg: 'Werknemer of werkgever',
  },
  {
    label: 'Premie of heffing',
    kleur: 'bg-blue-500',
    uitleg: 'Bedrag dat wordt betaald of ingehouden',
  },
  {
    label: 'Inning',
    kleur: 'bg-orange-500',
    uitleg: 'Organisatie die de afdracht ontvangt',
  },
  {
    label: 'Uitvoerder',
    kleur: 'bg-purple-500',
    uitleg: 'Organisatie die de regeling uitvoert',
  },
  {
    label: 'Uitkering',
    kleur: 'bg-green-500',
    uitleg: 'Inkomen of voorziening voor de burger',
  },
  {
    label: 'Pensioen',
    kleur: 'bg-violet-500',
    uitleg: 'Geldstroom naar de tweede pensioenpijler',
  },
]

export default function Legenda() {
  return (
    <section
      aria-labelledby="legenda-titel"
      className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700"
    >
      <h2 id="legenda-titel" className="text-xl font-bold">
        Legenda
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {legendaItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-1 h-4 w-4 shrink-0 rounded-full ${item.kleur}`}
            />

            <div>
              <p className="font-semibold">{item.label}</p>

              <p className="text-sm text-gray-600 dark:text-gray-300">{item.uitleg}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
