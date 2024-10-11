 'use client'
import { useRouter } from 'next/navigation'
import EVENTS from '../../../consts/Events'
import { Event } from '../../../types'
import { FormEvent, use, useState } from 'react'
import Image from 'next/image'

export interface IEventCheckInPageParams {
  eventCode: string
  userEmail: string
}

export const EventCheckInForm = () => {
  const router = useRouter()
  const [checkInData, setCheckInData] = useState({} as IEventCheckInPageParams)
  const [events, setEvents] = useState([] as Event[])
  const [displaySearchDropDown, setDisplaySearchDropDown] = useState(false)
  const [inputError, setInputError ] = useState({userEmail: "", eventCode: ""})
  const validateInputs = (inputName: string, inputValue: string) => {
    if(/email/i.test(inputName)){
      if((!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue))) setInputError({...inputError, userEmail: "Invalid email address"})
        else setInputError({...inputError, userEmail: ""});
    }
    if(/event/i.test(inputName)){
      if(inputValue.length < 8) setInputError({...inputError, eventCode: "Invalid event code"});
      else setInputError({...inputError, eventCode: ""});
    }
  
  }
  const searchEvent = (evt: FormEvent<HTMLInputElement>) => {
    const eventCode = evt.currentTarget.value
    setEvents(
      () => EVENTS.filter(evt => new RegExp(eventCode).test(evt.eventCode)) as unknown as Event[],
    )
  }

  const handleChange = (evt: FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setCheckInData({ ...checkInData, [name]: value })
    validateInputs(name, value);
  }

    return (
        <>
        <form className='flex max-w-sm flex-col space-y-2'>
        <input
          aria-controls='#checkin-event-search-box'
          type='search'
          className='border-8 border-blue-100 px-6 py-4'
          value={checkInData.eventCode}
          placeholder='Enter Event Code'
          name='eventCode'
          onChange={evt => {
            searchEvent(evt)
            setDisplaySearchDropDown(true)
            handleChange(evt)
          }}
        />
        <small>{inputError.eventCode}</small>
        <div className='relative border-8 px-6 py-4'>
          <input
            type='email'
            className='border-blue-100'
            placeholder='Email'
            name='userEmail'
            onChange={handleChange}
          />

          <Image
            src='/location-enter.svg'
            alt='search button'
            className='absolute bottom-0 right-3 top-4 object-cover'
            width={24}
            height={24}
            role='button'
            aria-label='click to go to checkin'
            onClick={() => {
              if(inputError.userEmail || inputError.eventCode) return;
              router.push(`/app/events/checkin/?eventCode=${checkInData.eventCode}&userEmail=${checkInData.userEmail}`)
            }}
          />
        </div>
        <small>{inputError.userEmail}</small>
        {events?.length && displaySearchDropDown ? (
          <div className='relative border-8 px-6 py-4' 
          id='checkin-event-search-box'>
            {events.map(evt => (
              <div
                key={evt._id}
                className='m-2'
                role='button'
                onClick={() => {
                  setDisplaySearchDropDown(false)
                  setCheckInData({ ...checkInData, eventCode: `${evt.eventCode}` })
                }}>
                <small>{evt.name}</small> | <h6>{evt.eventCode || 'NA'}</h6>
              </div>
            ))}
          </div>
        ) : (<></>)}
      </form>
        </>
    )
}
export default EventCheckInForm;