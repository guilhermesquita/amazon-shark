import Link from 'next/link';

const pages = [
  { name: 'Investir', href: '/investir' },
  { name: 'Como Funciona', href: '/como-funciona' },
  { name: 'Captar', href: '/captar' },
  { name: 'Aprenda a Investir', href: '/aprenda-a-investir' },
  { name: 'Blog', href: '/blog' },
];

export default function MenuButton() {
  return (
    <nav className="flex space-x-4">
      {pages.map((page) => (
        <Link key={page.name} href={page.href} passHref>
          <div className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover cursor-pointer">
            {page.name}
          </div>
        </Link>
      ))}
    </nav>
  );
}
