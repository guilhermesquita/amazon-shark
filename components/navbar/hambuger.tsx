import { useState } from 'react';
import { pages } from './MenuButton';
import Link from 'next/link';
import { ClientContextType, useClient } from '@/app/context/clientContext';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {client} = useClient() as ClientContextType


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative lg:hidden" style={{
      zIndex: 1
    }}>
      <button
        className="flex flex-col items-center justify-center w-12 h-12 space-y-1.5 bg-gray-800 rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'transform rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''}`} />
      </button>
      <div className={`absolute top-12 right-0 w-40 bg-white border rounded-lg shadow-lg transition-transform duration-300 ${isOpen ? 'transform scale-100' : 'transform scale-0'}`}>
        <ul className="flex flex-col p-2 space-y-2">
            {pages.map((page, index) => {
                return (
                    <li key={index}><Link href={page.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">{page.name}</Link></li>
                );
            })}
                
            {!client?.verification ? <li><Link href='/verified' className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Obter verificação</Link></li> : null}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
