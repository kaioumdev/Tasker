import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import HeroSection from './HeroSection'
import TaskBoard from './Task/TaskBoard'

const App = () => {
  return (
    <div>
      <Header></Header>
      <div className='flex flex-col justify-center items-center'>
      <HeroSection></HeroSection>
      <TaskBoard></TaskBoard>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App