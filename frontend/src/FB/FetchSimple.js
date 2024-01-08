import React, { useEffect, useState } from 'react'

export default function FetchSimple() {
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('https://newone-55b3f-default-rtdb.firebaseio.com/names.json')
      .then(res => res.json())
      .then(json => setList(json))
  }, [])
  return (
    <div>
      <ol>
        {list.map(item => <li>{item}</li>)}
      </ol>
    </div>
  )
}
