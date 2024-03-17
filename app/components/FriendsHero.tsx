'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { filtericon, clickedicon } from '../assets';

type Friend = {
  Name: string;
  Status: string;
  Email: string;
  Phone: string;
}

const FriendHero = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filter, setfilter] = useState<number>(0b00);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [clicked, toggleClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchFriends = async () => {
      const url = '/api/friends';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (response.status === 401) {
        router.push('/');
      }

      if (response.ok) {
        const data = await response.json();
        setFriends(data);
        setLoading(false);
      } else {
        console.error('Error fetching friends');
      }
    }

    fetchFriends();
  }, [router]);

  return (
    <div className='columns-3 flex-row bg-white flex'>

      {/* Left column */}
      <div className='w-[16.1%] max-w-[310px] h-full'></div>

      <div className='flex-grow w-[67.8%] flex flex-col'>
        <div>
          <div className='flex flex-row'>
            <button className={`px-[20px] py-[8.5px] mt-[46px]  rounded-[21px]
              ${clicked 
                  ? 'bg-click border-[1px] border-click' 
                  : 'bg-white border-bordercolor border-[1px]'}
              transition-all duration-300ms`}
              onClick={() => toggleClicked(!clicked)}>
              {clicked  
                ? <img src={clickedicon.src} className='h-[20px] w-[19px]' />
                : <img src={filtericon.src} className='h-[20px] w-[19px]' />}
            </button>
            <div className="border-l border-textcolor h-[28px] mt-[51px] ml-[15px]"></div>
            <div className='text-[14px] mt-[56px] ml-[15px] text-textcolor'>Clear all</div>
          </div>
        </div>
        <ul className='items-center bg-white w-full flex-grow'>
          {friends.map((friend) => (
            <div className='w-full bg-white h-[114px] border-[1px]
                border-textcolor my-[15px] rounded-[6px] flex items-center'>
              <li key={friend.Name}>
                <div className='mb-[6px]'>
                  <div className='flex flex-row'>
                    <h2 className='font-inter font-bold text-black text-[16px] ml-[30px]'>{friend.Name}</h2>
                    {friend.Status == "Close Friends"
                      ? <div className='flex bg-cfbg text-cft ml-[10px] rounded-full ml-[10px]
                        text-[12px] font-semibold px-[8.75px] py-[3px]'>Close Friends</div>
                      : friend.Status == "Super Close Friends"
                        ? <div className='flex bg-scfbg text-scft ml-[10px] rounded-full ml-[10px]
                          text-[12px] font-semibold px-[8.75px] py-[3px]'>Super Close Friends</div>
                        : null}
                  </div>
                  <div className='flex flex-row mt-[6px] flex items-center text-bordercolor'>
                    <p className='ml-[30px] text-[14px]'>{friend.Email}</p>
                    <span className='bg-bordercolor h-[4px] w-[4px] rounded-[50%] ml-[7px]'/>
                    <p className='ml-[7px] text-[14px]'>{friend.Phone}</p>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      
      {/* Right column */}
      <div className='w-[16.1%] h-full'></div>

    </div>
  );
};

export default FriendHero;
