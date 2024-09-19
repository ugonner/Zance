'use client'

import EventCard from '@/components/features/events/EventCard'
import GridContainer from '@/components/ui/containers/GridContainer'
import { Skeleton } from '@/components/ui/skeleton'
import useApi from '@/hooks/useApi'
import { getToken } from '@/store/reducers/authSlice'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchPage = () => {
  //   const router = useRouter()
  const searchParams = useSearchParams()

  const token = useSelector(getToken)

  const searchQuery = searchParams.get('query')
  const {
    fetchData,
    loading,
    error: fetchingError,
    data: results,
  } = useApi<{ token: string }, any>()

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        if (token && searchQuery) {
          await fetchData(`events/search/${searchQuery}`, token)
        }
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }
    getSearchResults()
  }, [fetchData, searchQuery, token])
  return (
    <div>
      <div>
        <h1 className='mb-4 text-2xl font-bold'>Search Results for: {searchQuery}</h1>

        {loading && <p>Loading...</p>}
        {fetchingError && (
          <p className='text-red-500'>Error fetching results: {fetchingError.message}</p>
        )}

        <>
          {loading ? (
            <Skeleton className='h-12 w-10/12' />
          ) : (
            <GridContainer>
              {results?.data.length ? (
                results.data.map((event: any) => <EventCard key={event?._id} event={event} />)
              ) : (
                <p className='text-gray-500'>No search results found</p>
              )}
            </GridContainer>
          )}
        </>
      </div>
    </div>
  )
}

export default SearchPage
