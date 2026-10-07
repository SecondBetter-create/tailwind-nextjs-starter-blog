export function eindwaardeEenmalig(
  beginbedrag: number,
  jaarrendementProcent: number,
  jaren: number
) {
  const rendement = jaarrendementProcent / 100
  return beginbedrag * Math.pow(1 + rendement, Math.max(0, jaren))
}

export function effectieveMaandrente(jaarrendementProcent: number) {
  return Math.pow(1 + jaarrendementProcent / 100, 1 / 12) - 1
}

export function eindwaardeMaandelijks({
  maandinleg,
  jaarrendementProcent,
  jaren,
}: {
  maandinleg: number
  jaarrendementProcent: number
  jaren: number
}) {
  const maanden = Math.max(0, Math.round(jaren * 12))
  const maandrente = effectieveMaandrente(jaarrendementProcent)
  if (maandrente === 0) return maandinleg * maanden
  return maandinleg * ((Math.pow(1 + maandrente, maanden) - 1) / maandrente)
}

export function formatEuro(bedrag: number) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(bedrag)
}

export function formatGetal(getal: number, decimalen = 2) {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: decimalen,
    maximumFractionDigits: decimalen,
  }).format(getal)
}

export const pensioenRoutes = {
  pijlers: '/leren/pijlers',
  aow: '/leren/aow',
  werkgeverspensioen: '/leren/pijlers',
  zelfRegelen: '/leren/aanvullen',
  vroegBeginnen: '/oefenen#vroeg-beginnen',
  jaarruimte: '/leren/aanvullen',
  reserveringsruimte: '/leren/aanvullen',
  loonstrook: '/oefenen#loonstrook',
} as const
