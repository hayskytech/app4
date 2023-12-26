import React from 'react'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import States from './comp/States'
import NoPage from './comp/NoPage'
import About from './comp/About'
import Contact from './comp/Contact'
import Services from './comp/Services'
import NewsAPI from './comp/NewsAPI'

export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />}>
          <Route index element={<States />} />
          <Route path='states' element={<States />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path='newsapi' element={<NewsAPI />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>)
}


function MainMenu() {
  return (
    <>
      <div>
        {/* <Link to='/'>Home</Link> */}
        <Link to='/'><button>Home</button></Link>
        <Link to='/states'><button>States</button></Link>
        <Link to='/about'><button>About</button></Link>
        <Link to='/contact'><button>Contact Us</button></Link>
        <Link to='/hello'><button>Hello</button></Link>
        <Link to='/services'><button>Services</button></Link>
        <Link to='/newsapi'><button>NewsAPI</button></Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}
