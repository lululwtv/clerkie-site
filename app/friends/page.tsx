import React from 'react'
import { NavBar } from '../components'

const page = () => {
  return (
    <div>
        <div><NavBar/></div>
        <div className='bg-white'>
            <h1 className='text-black'>Content</h1>
        </div>
    </div>
  )
}

export default page