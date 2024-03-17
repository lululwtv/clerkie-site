'use client';

import React, { useState, useEffect } from 'react';
import { FriendsBar, NavBar, FriendsHero } from '../components';
import { useRouter } from 'next/navigation';

type Friend = {
  Name: string;
  Status: number;
  Email: string;
  Phone: string;
}

const Page = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-[250px]'>
        <NavBar />
      </div>
      <div className='flex flex-col flex-grow bg-white text-black w-auto'>
        <FriendsBar />
        <FriendsHero />

      </div>
    </div>
  );
};

export default Page;
