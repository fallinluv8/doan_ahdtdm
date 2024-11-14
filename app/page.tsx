'use client';

import { useState } from 'react';
import FIFO from '@/components/FIFO';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import Navbar from '@/components/Navbar';
import OPT from '@/components/OPT';
import LRU from '@/components/LRU';

export default function Home() {
  const [activePage, setActivePage] = useState('HomePage');

  const renderPage = () => {
    switch (activePage) {
      case 'First In First Out':
        return <FIFO />;
      case 'Optimal':
        return <OPT />;
      case 'Least Recently Used':
        return <LRU />;
      default:
        return <HomePage />;
    }
  };

  return (
    <main className=' overflow-hidden min-h-screen dark:bg-black dark:text-white'>
      <div className='fixed w-full'>
        <Navbar onSelectPage={setActivePage} />
      </div>
      <div className='my-32'>{renderPage()}</div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
