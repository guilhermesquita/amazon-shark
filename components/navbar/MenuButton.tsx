import Link from 'next/link';

export const pages = [
  { name: 'Sobre Nós', href: '/sobre-nos' },
  { name: 'Como Funciona', href: '/como-funciona' },
  { name: 'Portifólio', href: '/portifolio' }
];

export default function MenuButton() {
  return (
    <nav className="lg:flex space-x-28 hidden">
      {pages.map((page) => (
        <Link key={page.name} href={page.href} passHref>
          <div className="py-2 px-4 flex rounded-md hover:bg-btn-background-hover cursor-pointer">
            {page.name}
          </div>
        </Link>
      ))}
    </nav>
  );
}
