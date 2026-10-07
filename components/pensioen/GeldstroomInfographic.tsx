'use client'

import { useMemo, useState } from 'react'
import DetailPanel from './DetailPanel'
import InfographicNode from './InfographicNode'
import Legenda from './Legenda'
import {
  pensioenGeldstromen,
  type GeldstroomNode,
  type Perspectief,
} from '@/data/pensioenGeldstromen'

type Filter = 'alles' | 'sociaal' | 'zorg' | 'pensioen'

const werknemerStartIds = [
  'werknemer',
  'loonheffing',
  'volksverzekeringen',
  'pensioenpremie-werknemer',
]

const werkgeverStartIds = [
  'werkgever',
  'werknemersverzekeringen',
  'zvw-werkgeversheffing',
  'pensioenpremie-werkgever',
]

const sociaalIds = [
  'werknemer',
  'werkgever',
  'loonheffing',
  'volksverzekeringen',
  'aow-premie',
  'anw-premie',
  'werknemersverzekeringen',
  'ww',
  'zw',
  'wia',
  'belastingdienst',
  'svb',
  'uwv',
  'aow-uitkering',
  'anw-uitkering',
  'ww-uitkering',
  'zw-uitkering',
  'wia-uitkering',
]

const zorgIds = [
  'werkgever',
  'wlz-premie',
  'zvw-werkgeversheffing',
  'belastingdienst',
  'zorgstelsel',
]

const pensioenIds = [
  'werknemer',
  'werkgever',
  'pensioenpremie-werknemer',
  'pensioenpremie-werkgever',
  'pensioenuitvoerder',
  'tweede-pijler',
  'pensioenuitkering',
  'aow-premie',
  'svb',
  'aow-uitkering',
]

function haalNodesOp(ids: string[]): GeldstroomNode[] {
  return ids
    .map((id) => pensioenGeldstromen.find((node) => node.id === id))
    .filter((node): node is GeldstroomNode => node !== undefined)
}

export default function GeldstroomInfographic() {
  const [perspectief, setPerspectief] = useState<Perspectief>('werknemer')

  const [filter, setFilter] = useState<Filter>('alles')

  const [actieveNodeId, setActieveNodeId] = useState<string | null>(null)

  const actieveNode = actieveNodeId
    ? (pensioenGeldstromen.find((node) => node.id === actieveNodeId) ?? null)
    : null

  const startNodes = useMemo(() => {
    return haalNodesOp(perspectief === 'werknemer' ? werknemerStartIds : werkgeverStartIds)
  }, [perspectief])

  const volgendeNodes = actieveNode ? haalNodesOp(actieveNode.volgendeIds) : []

  function hoortBijFilter(node: GeldstroomNode) {
    if (filter === 'alles') return true
    if (filter === 'sociaal') return sociaalIds.includes(node.id)
    if (filter === 'zorg') return zorgIds.includes(node.id)
    if (filter === 'pensioen') return pensioenIds.includes(node.id)

    return true
  }

  function selecteerNode(id: string) {
    setActieveNodeId(id)

    window.setTimeout(() => {
      document.getElementById('detail-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 50)
  }

  function wijzigPerspectief(nieuwPerspectief: Perspectief) {
    setPerspectief(nieuwPerspectief)
    setActieveNodeId(null)
  }

  return (
    <div>
      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold">Stap 1: kies een perspectief</h2>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Bekijk de betalingen vanuit de werknemer of vanuit de werkgever.
            </p>
          </div>

          <div
            className="inline-flex w-full rounded-xl bg-gray-200 p-1 sm:w-auto dark:bg-gray-800"
            role="group"
            aria-label="Kies een perspectief"
          >
            <button
              type="button"
              onClick={() => wijzigPerspectief('werknemer')}
              className={`flex-1 rounded-lg px-5 py-3 font-semibold transition sm:flex-none ${
                perspectief === 'werknemer'
                  ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-300'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300'
              }`}
            >
              Werknemer
            </button>

            <button
              type="button"
              onClick={() => wijzigPerspectief('werkgever')}
              className={`flex-1 rounded-lg px-5 py-3 font-semibold transition sm:flex-none ${
                perspectief === 'werkgever'
                  ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-300'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300'
              }`}
            >
              Werkgever
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Stap 2: kies wat je wilt bekijken</h2>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter de infographic">
          {(
            [
              ['alles', 'Alles'],
              ['sociaal', 'Sociale zekerheid'],
              ['zorg', 'Zorg'],
              ['pensioen', 'Pensioen'],
            ] as [Filter, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === id
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section
        aria-label={`Geldstromen vanuit de ${perspectief}`}
        className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {startNodes.map((node) => (
          <InfographicNode
            key={node.id}
            node={node}
            actief={actieveNodeId === node.id}
            gedimd={!hoortBijFilter(node)}
            onSelect={selecteerNode}
          />
        ))}
      </section>

      <div className="my-8 flex justify-center" aria-hidden="true">
        <div className="flex flex-col items-center text-gray-400">
          <div className="h-10 w-0.5 bg-gray-300 dark:bg-gray-700" />
          <span className="-mt-1 text-2xl">↓</span>
        </div>
      </div>

      <section className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="text-2xl font-bold">Geldstroom</h2>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Klik op een onderdeel en volg daarna de knoppen in het uitlegvenster.
          </p>

          {actieveNode ? (
            <div className="mt-6">
              <InfographicNode node={actieveNode} actief onSelect={selecteerNode} />

              {volgendeNodes.length > 0 && (
                <>
                  <div
                    className="my-5 flex justify-center text-3xl text-gray-400"
                    aria-hidden="true"
                  >
                    ↓
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {volgendeNodes.map((node) => (
                      <InfographicNode
                        key={node.id}
                        node={node}
                        actief={false}
                        gedimd={!hoortBijFilter(node)}
                        onSelect={selecteerNode}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
              <p className="text-lg font-semibold">Selecteer hierboven een kaart</p>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                De eerste stap van de geldstroom verschijnt vervolgens hier.
              </p>
            </div>
          )}
        </div>

        <DetailPanel
          node={actieveNode}
          volgendeNodes={volgendeNodes}
          onSelect={selecteerNode}
          onClose={() => setActieveNodeId(null)}
        />
      </section>

      <div className="mt-12">
        <Legenda />
      </div>
    </div>
  )
}
