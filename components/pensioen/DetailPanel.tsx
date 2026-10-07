import type { GeldstroomNode } from '@/data/pensioenGeldstromen'

type DetailPanelProps = {
  node: GeldstroomNode | null
  onClose: () => void
  onSelect: (id: string) => void
  volgendeNodes: GeldstroomNode[]
}

export default function DetailPanel({ node, onClose, onSelect, volgendeNodes }: DetailPanelProps) {
  if (!node) {
    return (
      <aside className="rounded-2xl border-2 border-dashed border-gray-300 p-6 dark:border-gray-700">
        <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Uitlegpaneel</p>

        <h2 className="mt-2 text-2xl font-bold">Kies een onderdeel</h2>

        <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
          Klik op een kaart in de infographic. Hier verschijnt vervolgens wie betaalt, wie int, wie
          de regeling uitvoert en waar de geldstroom daarna naartoe gaat.
        </p>
      </aside>
    )
  }

  return (
    <aside
      id="detail-panel"
      aria-live="polite"
      className="scroll-mt-40 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
            Geselecteerd onderdeel
          </p>

          <h2 className="mt-2 text-3xl font-bold">{node.titel}</h2>

          <p className="mt-2 font-medium text-gray-600 dark:text-gray-300">{node.subtitel}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Uitlegpaneel sluiten"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          Sluiten
        </button>
      </div>

      <p className="mt-6 text-lg leading-relaxed">{node.uitleg}</p>

      <h3 className="mt-7 text-lg font-bold">Belangrijk om te weten</h3>

      <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
        {node.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>

      {volgendeNodes.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="text-lg font-bold">Volg de geldstroom</h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Kies waar deze betaling of regeling daarna naartoe gaat.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {volgendeNodes.map((volgendeNode) => (
              <button
                key={volgendeNode.id}
                type="button"
                onClick={() => onSelect(volgendeNode.id)}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                {volgendeNode.korteTitel ?? volgendeNode.titel} →
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
