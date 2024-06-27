import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layouts = ({children}) => {
  return (
    <>
    <Header/>
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default Layouts
