import React, { useEffect, useState } from 'react'

export default function FetchfromFB() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('https://newone-55b3f-default-rtdb.firebaseio.com/students.json')
      .then(res => res.json())
      .then(json => {
        setList(json);
      })
  }, [])

  return (
    <div>
      <ol>
        {
          list.map((student) => (<li>{student.name} - {student.age}</li>))
        }
      </ol>
    </div>
  )
}


// Database rules
/*

{
  "rules": {
    ".read": true,
    ".write": false
  }
}

*/