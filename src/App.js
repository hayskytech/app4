import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import States from './comp/States'
import NoPage from './comp/NoPage'
import About from './comp/About'
import Contact from './comp/Contact'
import Services from './comp/Services'
import NewsAPI from './comp/NewsAPI'
import NewsAPI2 from './comp/NewsAPI2'
import { Button } from 'semantic-ui-react'
import TodoListBasic from './comp/TodoListBasic'

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
          <Route path='newsapi2' element={<NewsAPI2 />} />
          <Route path='todolistbasic' element={<TodoListBasic />} />
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
        <Link to='/'><Button>Home</Button></Link>
        <Link to='/states'><Button>States</Button></Link>
        <Link to='/about'><Button>About</Button></Link>
        <Link to='/contact'><Button>Contact Us</Button></Link>
        <Link to='/hello'><Button>Hello</Button></Link>
        <Link to='/services'><Button>Services</Button></Link>
        <Link to='/newsapi'><Button>NewsAPI</Button></Link>
        <Link to='/newsapi2'><Button>NewsAPI2</Button></Link>
        <Link to='/todolistbasic'><Button>TodoListBasic</Button></Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}
