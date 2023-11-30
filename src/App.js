import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import States from './pages/States'
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom'
import { About, Contact } from './pages/About'
import NoPage from './pages/NoPage'
import { Button } from 'semantic-ui-react'
import TodoListSimple from './pages/TodoListSimple'
import TodoLocal from './pages/TodoLocal'
import CatFacts from './api/CatFacts'
import News from './api/News'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />}>
            <Route index element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="todolistsimple" element={<TodoListSimple />} />
            <Route path="states" element={<States />} />
            <Route path="todolocal" element={<TodoLocal />} />
            <Route path="catfacts" element={<CatFacts />} />
            <Route path="news" element={<News />} />
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
      <Button as={Link} to='/' color='blue'>Home</Button>
      <Button as={Link} to="/contact" color='blue'>Contact</Button>
      <Button as={Link} to="/states" color='blue'>States</Button>
      <Button as={Link} to='/todolistsimple' color='blue'>TodoListSimple</Button>
      <Button as={Link} to='/todolocal' color='blue'>TodoLocal</Button>
      <Button as={Link} to='/catfacts' color='blue'>CatFacts</Button>
      <Button as={Link} to='/news' color='blue'>News</Button>
      <hr />
      <div style={{ padding: 10 }}>
        <Outlet />
      </div>
      <hr />
    </div>
  )
}