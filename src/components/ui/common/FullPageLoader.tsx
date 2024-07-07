import { Loader } from 'lucide-react'
import React from 'react'

const FullPageLoader: React.FC = () => {
  return (
    <div className='pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-transparent text-secondary'>
      <div className='flex items-center gap-2'>
        <Loader size={25} className='animate-spin rounded-full' />
        <span className='text-lg font-semibold'>Loading...</span>
      </div>
    </div>
  )
}

export default FullPageLoader
