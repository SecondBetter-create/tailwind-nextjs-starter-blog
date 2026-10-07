import { lessen } from '@/lib/pensioen/leerroute'
import { belastingBasisHoofdstukken } from '@/lib/pensioen/belastingBasis'

export const LEERROUTE_STORAGE_KEY = 'pensioenwijzer-voltooide-lessen-v1'
export const BELASTING_BASIS_STORAGE_KEY = 'pensioenwijzer-belasting-basis-v1'

const LES_IDS = new Set(lessen.map((les) => les.id))
const BELASTING_BASIS_IDS = new Set(belastingBasisHoofdstukken.map((hoofdstuk) => hoofdstuk.id))

function readStoredIds(storageKey: string, knownIds: Set<string>, warningLabel: string): string[] {
  try {
    const stored = window.localStorage.getItem(storageKey)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      console.warn(`${warningLabel} is geen geldige lijst en wordt opnieuw gestart.`)
      return []
    }

    return [
      ...new Set(parsed.filter((id): id is string => typeof id === 'string' && knownIds.has(id))),
    ]
  } catch (error) {
    console.warn(`${warningLabel} kon niet worden gelezen.`, error)
    return []
  }
}

export function readCompletedLessons(): string[] {
  return readStoredIds(LEERROUTE_STORAGE_KEY, LES_IDS, 'Leerroutevoortgang')
}

export function readBelastingBasisProgress(): string[] {
  return readStoredIds(BELASTING_BASIS_STORAGE_KEY, BELASTING_BASIS_IDS, 'Voortgang basismodule')
}
