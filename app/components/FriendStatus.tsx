import React from 'react';

interface FriendStatus {
  Status: string;
}

const FriendStatus: React.FC<FriendStatus> = ({ Status }) => {
  return (
    <div>
      {Status === "Close Friends" ? (
        <div className='flex bg-cfbg text-cft ml-[10px] rounded-full ml-[10px] text-[12px] font-semibold px-[8.75px] py-[3px]'>
          Close Friends
        </div>
      ) : Status === "Super Close Friends" ? (
        <div className='flex bg-scfbg text-scft ml-[10px] rounded-full ml-[10px] text-[12px] font-semibold px-[8.75px] py-[3px]'>
          Super Close Friends
        </div>
      ) : null}
    </div>
  );
};

export default FriendStatus;
