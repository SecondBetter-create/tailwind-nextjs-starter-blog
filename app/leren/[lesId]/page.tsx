import { notFound } from 'next/navigation'
import LesPagina from '@/components/pensioen/LesPagina'
import { lessen } from '@/lib/pensioen/leerroute'
import { genPageMetadata } from 'app/seo'

type LesRouteProps = {
  params: Promise<{ lesId: string }>
}

export function generateStaticParams() {
  return lessen.map((les) => ({ lesId: les.id }))
}

export async function generateMetadata({ params }: LesRouteProps) {
  const { lesId } = await params
  const les = lessen.find((item) => item.id === lesId)

  return genPageMetadata({
    title: les ? `Les ${les.nummer}: ${les.titel}` : 'Les niet gevonden',
    description: les?.intro ?? 'Deze les bestaat niet.',
  })
}

export default async function LesRoute({ params }: LesRouteProps) {
  const { lesId } = await params
  if (!lessen.some((les) => les.id === lesId)) notFound()

  return <LesPagina lesId={lesId} />
}
