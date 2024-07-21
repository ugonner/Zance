'use Client'

import React from 'react'

const Contact = () => {
  return (
    <section id='contact' className='h-full w-full'>
      <div className='flex flex-col items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-8 md:px-12 md:py-12 lg:px-20 lg:py-16 xl:px-48'>
        <h4 className='text-black-400 mb-3 text-2xl font-bold md:text-5xl'>Get In Touch</h4>
        <form action='' className='mx-auto flex w-full flex-col text-center md:w-1/2'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            className='rounded-md border-2 bg-transparent p-2 text-black focus:outline-none'
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='my-4 rounded-md border-2 bg-transparent p-2 text-black focus:outline-none'
          />
          <textarea
            name='message'
            placeholder='Enter your message'
            rows={10}
            className='bottom-2 mb-2 rounded-md border-2 bg-transparent p-2 text-black duration-500 focus:outline-none'></textarea>
          <button className='my-2 flex w-fit items-center rounded-md bg-blue-50 px-10 py-3 text-gray-50 hover:bg-blue-100'>
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
