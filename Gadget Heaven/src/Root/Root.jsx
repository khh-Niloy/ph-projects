import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import UserContextProvider from '../Components/context/UserContextProvider'

export default function Root() {
  return (
    <>
        <UserContextProvider>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </UserContextProvider>
    </>
  )
}
