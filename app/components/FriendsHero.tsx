'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { filtericon, clickedicon, close } from '../assets';
import { CheckBox } from '.';

type Friend = {
  Name: string;
  Status: string;
  Email: string;
  Phone: string;
}

const FriendHero = () => {
  const [friends, setFriends] = useState<Friend[]>([]); // original friends list
  const router = useRouter();
  const [clicked, toggleClicked] = useState<boolean>(false);
  const [closeFriendsChecked, setCloseFriendsChecked] = useState<boolean>(false);
  const [superCloseFriendsChecked, setSuperCloseFriendsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // loading state

  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]); // filtered friends list

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
        setTimeout(() => {
          setFriends(data);
          setFilteredFriends(data);
          setLoading(false);
        }, 1000);
      } else {
        console.error('Error fetching friends');
      }
    }

    fetchFriends();
  }, [router]);


  const handleApply = () => {
    const newFilterList = new Map();
    
    if (closeFriendsChecked) {
      newFilterList.set('Close Friends', 'Close Friends');
    }
    
    if (superCloseFriendsChecked) {
      newFilterList.set('Super Close Friends', 'Super Close Friends');
    }
  
    const newFriendsList = friends.filter((friend) => newFilterList.has(friend.Status));
  
    if (newFriendsList.length !== 0) {
      setFilteredFriends(newFriendsList);
    } else {
      setFilteredFriends(friends);
    }
    toggleClicked(false);
  };
  
  

  return (
    <div className='columns-3 flex-row bg-white flex'>

      {/* Left column */}
      <div className='w-[16.1%] max-w-[310px] h-full'></div>

      {/* Middle column */}
      <div className='flex-grow w-[67.8%] flex flex-col'>


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
            <span className="border-l border-textcolor h-[28px] mt-[51px] ml-[15px]" />
            <div className={`text-[14px] mt-[56px] ml-[15px] font-semibold ${
              filteredFriends.length == friends.length ? 'text-textcolor' : 'text-[#3399FF]'
              }`}
              onClick={() => {
                setFilteredFriends(friends);
                setCloseFriendsChecked(false);
                setSuperCloseFriendsChecked(false);
              }}
              >Clear all</div>
          </div>

        <div className='flex flex-col'>
          <div className={`flex ${clicked ? "" : 'hidden'} absolute mt-[10px]`}>
            <div className='bg-white shadow-lg rounded-[6px] w-[320px]'>
              <div className='flex flex-row justify-between items-center mt-[21px]'>
                <p className={`ml-[25px] font-inter font-semibold text-[14px] ${
                  closeFriendsChecked || superCloseFriendsChecked ? 'text-[#3399FF]' : 'text-textcolor'
                  }`}
                  onClick={() => {
                    setCloseFriendsChecked(false);
                    setSuperCloseFriendsChecked(false);
                  }}>Clear all</p>
                <p className='mr-[25px] font-inter font-semibold text-[16px] text-click'>Filter</p>
                <img src={close.src} className='mr-[20px] h-[17px] w-[17px]' onClick={() => toggleClicked(false)} />
              </div>
              <div className='flex flex-col items-start mt-[20px]' style={{borderTopWidth:'1px'}}>
                <h3 className='mt-[26px] ml-[25px] text-[#686868]'>Friend Status</h3>
              </div>
              <div className='flex-col flex mt-[25px] ml-[25px] items-start'>
                <div className='flex flex-row'>
                  <label className='text-click font-inter font-semibold text-[16px] pr-[145px]'>Close Friends</label>
                  <div>
                    <div className="checkbox-wrapper">
                      <input onChange={() => setCloseFriendsChecked(!closeFriendsChecked)}
                        type="checkbox" checked={closeFriendsChecked} />
                    </div>
                  </div>
                </div>
                <div className='flex flex-row pt-[25px]'>
                  <label className='text-click font-inter font-semibold text-[16px] pr-[95px]'>Super Close Friends</label>
                  <div>
                    <div className="checkbox-wrapper">
                      <input onChange={() => setSuperCloseFriendsChecked(!superCloseFriendsChecked)}
                        type="checkbox" checked={superCloseFriendsChecked}/>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                className='flex items-center justify-center w-[300px] h-[45px]
                  bg-click text-white ml-[10px] mb-[16px] mt-[35px] rounded-[6px]'
                onClick={handleApply}>
                Apply
              </button>
            </div>
          </div>

          <ul className='items-center bg-white w-full flex-grow' style={{maxWidth: '1050px'}}>
            {filteredFriends.map((friend) => {
              return <div className='w-full bg-white h-[114px] border-[1px]
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
            })}
          </ul>

          {loading && 
          <div className='flex justify-center flex-col w-full items-center h-full'>
            {[...Array(5)].map((_, i) => (
            <div className='w-full bg-white h-[114px] border-[1px] border-textcolor my-[15px] rounded-[6px] flex items-center justify-between'>
              <div className='w-full ml-[30px] flex flex-col'>
                <div className='h-[18px] w-[28.1%] bg-gradient-to-r from-[#EAEAEA] to-[#ffffff] rounded-[27px] mb-[5px]'></div>
                <div className='h-[18px] w-[32.34%] bg-gradient-to-r from-[#EAEAEA] to-[#ffffff] rounded-[27px] mt-[5px]'></div>
              </div>
              <div className='mr-[30px] w-full flex flex-col items-end'>
                <div className='h-[18px] w-[28.1%] bg-gradient-to-r from-[#ffffff] to-[#EAEAEA] rounded-[27px] mb-[5px]'></div>
                <div className='h-[18px] w-[32.34%] bg-gradient-to-r from-[#ffffff] to-[#EAEAEA] rounded-[27px] mt-[5px]'></div>
              </div>
            </div>
            ))}
          </div>
          }

        </div>
      </div>
      
      {/* Right column */}
      <div className='w-[16.1%] h-full'></div>

    </div>
  );
};

export default FriendHero;
