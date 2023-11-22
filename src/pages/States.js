import React, { useState } from 'react'

export default function Calculator() {
  const [x, setx] = useState(10)
  const [y, sety] = useState(2)

  function handlex(e) {
    setx(Number(e.target.value))
  }

  return (
    <div>
      <p>Arthematic</p>
      X : <input type="number" value={x} onChange={handlex} />
      Y: <input
        type="number"
        value={y}
        onChange={(e) => { sety(Number(e.target.value)) }}
      />
      <h3>{x} + {y} = {x + y}</h3>
      <h3>{x} - {y} = {x - y}</h3>
      <h3>{x} * {y} = {x * y}</h3>
      <h3>{x} / {y} = {x / y}</h3>
    </div>
  )
}
