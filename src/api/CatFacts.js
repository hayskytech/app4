import React, { useEffect, useState } from 'react'

export default function CatFacts() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // setTimeout(() => {

    fetch("https://cat-fact.herokuapp.com/facts/")
      .then(res => res.json())
      .then(json => {
        setList(json);
        setLoading(false)
      })

    // }, 2000);
  }, [])

  return (
    <div>
      {
        loading ?
          <>
            Loading...
            <progress />
          </>
          :
          list.map((item) => {
            return (<p>{item.text}</p>)
          })
      }
    </div>
  )
}
