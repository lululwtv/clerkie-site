import React from 'react'
import {HomeBar, NavBar, HomeHero} from './components'

const page = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='w-[250px]'>
        <NavBar/>
      </div>
      <div className='flex flex-grow flex-col'>
          <HomeBar/>
          <HomeHero/>
      </div>
    </div>
  )
}

export default page