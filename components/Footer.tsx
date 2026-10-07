import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">
            {siteMetadata.title}
          </Link>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Heldere uitleg over belasting, sociale zekerheid, pensioen en geld voor later.
          </p>
        </div>
        <nav aria-label="Footernavigatie" className="flex flex-wrap gap-x-5 gap-y-2">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-300"
              >
                {link.title}
              </Link>
            ))}
        </nav>
      </div>
      <div className="border-t border-gray-200 py-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {new Date().getFullYear()} {siteMetadata.author}
      </div>
    </footer>
  )
}
