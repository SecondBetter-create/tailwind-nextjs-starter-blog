export type Pijler = {
  nummer: 1 | 2 | 3
  titel: string
  subtitel: string
  kleur: string
  bedrag: number
  href: string
}

export type RendementScenario = {
  label: 'Voorzichtig' | 'Midden' | 'Gunstig'
  percentage: number
}
