'use client';

import React, { useState, useEffect } from 'react';
import { FriendsBar, NavBar } from '../components';
import { useRouter } from 'next/navigation'

type Friend = {
  Name: string;
  Status: number;
  Email: string;
  Phone: string;
}

const Page = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const router = useRouter();

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
      } else {
        console.error('Error fetching friends');
      }
    }
    fetchFriends();
  }
  , []);

  return (
    <div className='flex flex-row h-screen'>
      <div className='w-[250px]'>
        <NavBar />
      </div>
      <div className='flex flex-col flex-grow bg-white text-black w-auto'>
        <FriendsBar />
        <ul className='flex flex-col items-center'>
          {friends.map((friend) => (
            <div className='flex justify-center w-[80%] max-w-[1050px] h-[114px] border-[1px] border-bordercolor my-[15px] rounded-[6px]'>
              <li key={friend.Name}>
                <div className='text-black'>
                  <h2>{friend.Name}</h2>
                  <p>{friend.Status}</p>
                  <p>{friend.Email}</p>
                  <p>{friend.Phone}</p>
                  <p></p>
                </div>
              </li>
            </div>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Page;
