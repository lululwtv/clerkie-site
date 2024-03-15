import React from 'react'
import {NavBar} from './components'

const page = () => {
  return (
    <div className='flex flex-col'>
      <div className=''>
        <NavBar/>
      </div>
      <div className='bg-white text-black width-1/3'>
        <h1>Content</h1>
      </div>
    </div>
  )
}

export default page