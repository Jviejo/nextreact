import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <div className='pb-4'>
        <Link className=' text-blue-500' href="/products">
          Products
        </Link>
    </div>
  )
}

export default Header