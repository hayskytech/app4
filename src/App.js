import React from 'react'
import { About, Contact } from './pages/About'
import Waa from './pages/Waa'
import Header from './pages/Header'

export default function App() {
  return (
    <div>
      <Header />

      <h1 style={{ color: 'red', backgroundColor: 'skyblue' }}>Hello world</h1>
      <table border='1'>
        <tr>
          <td>hai</td>
          <td>hai</td>
          <td>hai</td>
        </tr>
        <tr>
          <td>hai</td>
          <td>hai</td>
          <td>hai</td>
        </tr>
        <tr>
          <td>hai</td>
          <td>hai</td>
          <td>hai</td>
        </tr>
      </table>

      <About />
      <Contact />
      <Waa />
    </div>
  )
}