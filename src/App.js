import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import States from './pages/States'
import Waa from './pages/Waa'
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom'
import { About, Contact } from './pages/About'
import NoPage from './pages/NoPage'
import { Button } from 'semantic-ui-react'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />}>
            <Route path="" element={<Waa />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="states" element={<States />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function MainMenu() {
  return (
    <div>

      <Link to="/">
        <Button color='blue'>Home</Button>
      </Link>

      <Button as={Link} to="/about" color='blue'>About</Button>
      <Button as={Link} to="/contact" color='blue'>Contact</Button>
      <Button as={Link} to="/states" color='blue'>States</Button>
      <Button as={Link} to='/user' color='blue'>User</Button>

      <hr />
      <div style={{ padding: 10 }}>
        <Outlet />
      </div>
      <hr />
    </div>
  )
}