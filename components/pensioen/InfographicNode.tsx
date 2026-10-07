import type { GeldstroomNode, NodeSoort } from '@/data/pensioenGeldstromen'

type InfographicNodeProps = {
  node: GeldstroomNode
  actief: boolean
  gedimd?: boolean
  onSelect: (id: string) => void
}

const soortStijlen: Record<NodeSoort, string> = {
  betaler:
    'border-slate-400 bg-slate-50 hover:border-slate-600 dark:border-slate-600 dark:bg-slate-900',

  premie: 'border-blue-400 bg-blue-50 hover:border-blue-600 dark:border-blue-700 dark:bg-blue-950',

  inning:
    'border-orange-400 bg-orange-50 hover:border-orange-600 dark:border-orange-700 dark:bg-orange-950',

  fonds: 'border-cyan-400 bg-cyan-50 hover:border-cyan-600 dark:border-cyan-700 dark:bg-cyan-950',

  uitvoerder:
    'border-purple-400 bg-purple-50 hover:border-purple-600 dark:border-purple-700 dark:bg-purple-950',

  uitkering:
    'border-green-400 bg-green-50 hover:border-green-600 dark:border-green-700 dark:bg-green-950',

  pensioen:
    'border-violet-400 bg-violet-50 hover:border-violet-600 dark:border-violet-700 dark:bg-violet-950',
}

const soortLabels: Record<NodeSoort, string> = {
  betaler: 'Betaler',
  premie: 'Premie of heffing',
  inning: 'Inning',
  fonds: 'Stelsel of voorziening',
  uitvoerder: 'Uitvoerder',
  uitkering: 'Uitkering',
  pensioen: 'Pensioenpremie',
}

export default function InfographicNode({
  node,
  actief,
  gedimd = false,
  onSelect,
}: InfographicNodeProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={actief}
      className={`w-full rounded-2xl border-2 p-5 text-left shadow-sm transition duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none ${
        soortStijlen[node.soort]
      } ${
        actief
          ? 'scale-[1.02] shadow-lg ring-4 ring-blue-200 dark:ring-blue-900'
          : 'hover:-translate-y-1 hover:shadow-md'
      } ${gedimd ? 'opacity-40 grayscale' : 'opacity-100'}`}
    >
      <span className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
        {soortLabels[node.soort]}
      </span>

      <h3 className="mt-2 text-xl font-bold">{node.korteTitel ?? node.titel}</h3>

      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {node.subtitel}
      </p>

      <span className="mt-4 inline-block text-sm font-semibold">Bekijk uitleg →</span>
    </button>
  )
}
