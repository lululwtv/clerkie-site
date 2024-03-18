'use client';
import React, { useState } from 'react';

import { navLinks } from '../constants';
import { usePathname, useRouter } from 'next/navigation';
import { clerkie } from '../assets';

const NavBar = () => {
  const router = useRouter();
  const path = usePathname();
  const [page, setPage] = useState<string>(path.split('/')[1] ? path.split('/')[1] : 'home');

  return (
    <nav className="w-[40%] h-full flex flex-col justify-between items-center navbar bg-theme
      fixed transition-all duration-300ms" style={{overflowX: 'hidden', maxWidth: '250px', maxHeight: '100vh'}}>
      <ul className="list-none flex flex-col fixed justify-center flex-1 font-inter">
        <div className='h-[20px] w-full pt-[32px] text-center text-white mr-0'>
          <div className='flex text-[16px] font-semibold'>
            <img src={clerkie.src} className='h-[20px] w-[20px] ml-[10px] mr-[10px] tracking-[0.5%]'/>
            Clerkie Challenge
          </div>
        </div>

        {navLinks.map((nav,index) => (
            <li
              key={nav.id}
              className={`text-[16px] w-[220px]
                mr-0 text-white ${index === 0 ? 'pt-[61px]' : null}`}>
                <button 
                  className={`hover:bg-menu w-full h-[40px] rounded-[6px] text-left
                      font-medium text-[16px] transition-all duration-250ms flex items-center ${page === nav.id ? 'bg-menu' : 'bg-theme'}`}
                  style={{maxWidth: '250px'}}
                  onClick={() => { 
                      if (nav.id === 'home') {
                        router.push('./');
                        setPage('home');
                      } else {
                        setPage(nav.id);
                        router.push(`./${nav.id}`);
                      }
                      }}>
                    <div className='flex'>
                      <img src={nav.img.src} className='h-[24px] w-[24px] ml-[10px] mr-[10px]' />
                      {nav.title}
                    </div>
                </button>
            </li>
        ))}
        
      </ul>

    </nav>
  )
}

export default NavBar