import React from 'react'
import Navbar from '../components/Navbar' 
import  Footer from '../components/Footer' 
import Hero from '../components/Hero'
import ReadingQuran from '../components/ReadingQuran'

const Home = () => {

  return (
    <>
      <Navbar />
        <Hero />
        <ReadingQuran />
      <Footer />
    </>
  )
}

export default Home
