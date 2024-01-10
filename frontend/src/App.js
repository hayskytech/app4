import React, { createContext, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import States from './comp/States'
import NoPage from './comp/NoPage'
import About from './comp/About'
import Contact from './comp/Contact'
import Services from './comp/Services'
import NewsAPI from './comp/NewsAPI'
import NewsAPI2 from './comp/NewsAPI2'
import { Button } from 'semantic-ui-react'
import TodoListBasic from './comp/TodoListBasic'
import TodoList2 from './comp/TodoList2'
import FetchfromFB from './FB/FetchfromFB'
import FetchSimple from './FB/FetchSimple'
import TodosSimple from './FB/TodosSimple'
import OTPLogin from './FB/OTPLogin'
import { auth } from './FB/conf';
import Account from './FB/Account';
import MyTodoList from './FB/MyTodoList';
import Students from './express/Students';
export const MyContext = createContext(null)

export default function App() {
  const [user, setUser] = useState(55)
  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, [auth]);
  return (<MyContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />}>
          <Route index element={<States />} />
          <Route element={<States />} path='states' />
          <Route element={<About />} path="about" />
          <Route element={<Contact />} path="contact" />
          <Route element={<Services />} path="services" />
          <Route element={<NewsAPI />} path='newsapi' />
          <Route element={<NewsAPI2 />} path='newsapi2' />
          <Route element={<TodoListBasic />} path='todolistbasic' />
          <Route element={<TodoList2 />} path='todolist2' />
          <Route element={<FetchfromFB />} path='fetchfromfb' />
          <Route element={<FetchSimple />} path='fetchsimple' />
          <Route element={<Students />} path='students' />
          <Route element={<TodosSimple />} path='todossimple' />
          <Route element={<OTPLogin />} path='otplogin' />
          <Route element={<Account />} path='account' />
          <Route element={<MyTodoList />} path='mytodolist' />
          <Route element={<Students />} path='Students' />
          <Route element={<NoPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  </MyContext.Provider>)
}


function MainMenu() {
  return (
    <>
      <div>
        <Link to='fetchfromfb'><Button>FetchfromFB</Button></Link>
        <Link to='fetchsimple'><Button>Fetch Simple</Button></Link>
        <Link to='students'><Button>Students</Button></Link>
        <Link to='todossimple'><Button>Todos Simple</Button></Link>
        <Link to='otplogin'><Button>OTP Login</Button></Link>
        <Link to='account'><Button>Account</Button></Link>
        <Link to='mytodolist'><Button>My todo list</Button></Link>
        <Link to='students'><Button>Students</Button></Link>
        {/* <Link to='/'>Home</Link> */}
        {/* <Link to='/'><Button>Home</Button></Link>
        <Link to='/states'><Button>States</Button></Link>
        <Link to='/about'><Button>About</Button></Link>
        <Link to='/contact'><Button>Contact Us</Button></Link>
        <Link to='/hello'><Button>Hello</Button></Link>
        <Link to='/services'><Button>Services</Button></Link>
        <Link to='/newsapi'><Button>NewsAPI</Button></Link>
        <Link to='/newsapi2'><Button>NewsAPI2</Button></Link>
        <Link to='/todolistbasic'><Button>TodoListBasic</Button></Link>
        <Link to='/todolist2'><Button>TodoList2</Button></Link> */}
      </div>
      <hr />
      <Outlet />
    </>
  )
}


// const x = 123
// const y = 'hello'
// const z = true
// const names = ['apple', 'bag', 'vat']
// const student = { name: 'raju', age: 20 }
// alert(student.age)

// const countries = [
//   { name: 'India', code: 'IN' },
//   { name: 'India', code: 'IN' },
//   { name: 'India', code: 'IN' },
//   { name: 'India', code: 'IN' },
//   { name: 'India', code: 'IN' },
//   { name: 'India', code: 'IN' },
// ]
// alert(countries[0].code)