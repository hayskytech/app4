import React, { useState } from 'react'

export default function App() {
  const [x, setx] = useState(0)
  const [y, sety] = useState(0)
  function handleX(e) {
    setx(e.target.value)
  }
  function handleY(e) {
    sety(e.target.value)
  }
  return (
    <div>
      X: <input type="number" value={x} onChange={handleX} />
      <br />
      Y: <input type="number" value={y} onChange={handleY} />
      <hr />
      <h1>X value : {x}</h1>
      <h1>Y value: {y}</h1>
      <h2>Addition: {Number(x) + Number(y)}</h2>
      <h2>Substraction {x - y}</h2>
      <h2>Mul {x * y}</h2>
      <h2>Division {x / y}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex modi magni repellat reiciendis, accusantium quaerat nihil? Dignissimos necessitatibus cupiditate laborum, nulla debitis ipsum vero molestias blanditiis exercitationem quia. Omnis, ratione.
      </p>
    </div>
  )
}
