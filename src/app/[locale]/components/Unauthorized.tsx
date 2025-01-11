import React from 'react'

const UnauthorizedComponent: React.FC = () => {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center text-center'>
      <h1 className='text-2xl font-bold'>Unauthorized</h1>
      <p className='text-lg'>You are not authorized to access this page</p>
    </section>
  )
}

export default UnauthorizedComponent
