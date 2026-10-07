import ModulesOverzicht from '@/components/pensioen/ModulesOverzicht'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Modules over belasting, geld en pensioen',
  description:
    'Bekijk beide leermodules, volg je voortgang en ontdek waar je uitleg, oefeningen en pensioeninformatie vindt.',
})

export default function ModulesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      <header className="max-w-4xl">
        <p className="font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
          PensioenWijzer · modules
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Leer stap voor stap hoe geld, belasting en pensioen samenhangen
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          Kies een module, zie hoe ver je bent en pak de volgende stap op. Begin bij de
          belastingbasis en ga daarna verder met geldstromen, zekerheid en pensioen.
        </p>
      </header>
      <ModulesOverzicht />
    </main>
  )
}
