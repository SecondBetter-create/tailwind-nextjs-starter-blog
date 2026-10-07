import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'flex w-full items-center justify-between gap-6 border-b border-gray-200 bg-white/95 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-xl font-bold tracking-tight sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex min-w-0 items-center gap-2 leading-5 sm:gap-3">
        <nav
          aria-label="Hoofdnavigatie"
          className="no-scrollbar hidden min-w-0 items-center gap-x-1 overflow-x-auto lg:flex"
        >
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap text-gray-700 transition hover:bg-blue-50 hover:text-blue-800 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-300"
              >
                {link.title}
              </Link>
            ))}
        </nav>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
