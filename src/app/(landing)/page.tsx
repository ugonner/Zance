import About from '@/components/features/landing/About'
import Benefits from '@/components/features/landing/Benefits'
import Contact from '@/components/features/landing/Contact'
import Footer from '@/components/features/landing/Footer'
import Founder from '@/components/features/landing/Founder'
import Hero from '@/components/features/landing/Hero'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Benefits />
      <Founder />
      <Contact />
      <Footer />
    </>
  )
}

export default HomePage
