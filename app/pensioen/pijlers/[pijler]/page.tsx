import { notFound, redirect } from 'next/navigation'

const pijlerAnchors: Record<string, string> = {
  aow: 'aow',
  werkgeverspensioen: 'werkgeverspensioen',
  'zelf-regelen': 'zelf-regelen',
}

export default async function Page({ params }: { params: Promise<{ pijler: string }> }) {
  const { pijler } = await params
  const anchor = pijlerAnchors[pijler]

  if (!anchor) {
    notFound()
  }

  redirect(`/pensioen#${anchor}`)
}
