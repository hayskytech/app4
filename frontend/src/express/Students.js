import React, { useEffect, useState } from 'react'

export default function Students() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/student')
      .then(res => res.json())
      .then(json => setList(json))
  }, [])

  return (
    <div>
      <h3>Students</h3>
      {
        list.map((item) => <p>{item.name}</p>)
      }
    </div>
  )
}
