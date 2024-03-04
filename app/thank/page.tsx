import React from 'react'

const Thank = () => {
  return (
    <div className='grid h-screen place-content-center'>
      <div>
        <h1 className='text-3xl font-bold'>Thank You!</h1>
        <p className='mt-4 text-gray-600'>
          Your recordings have been successfully sent. We appreciate you
          donating your voice!
        </p>
        <a
          href='/'
          className='mt-6 inline-block rounded-md bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-700'
        >
          Back Home
        </a>
      </div>
    </div>
  )
}

export default Thank
