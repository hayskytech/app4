import React, { useEffect, useState } from 'react'

export default function NewsAPI() {
  // const [list, setList] = useState(['apple', 'bat', 'cat'])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('https://dharshininews.com/wp-json/wp/v2/posts?per_page=20')
      .then(res => res.json())
      .then(json => {
        setList(json)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading ?
        <progress /> :
        <ol>
          {
            list.map((item, index) => {
              return <li key={item.id}>{item.title.rendered}</li>
            })
          }
        </ol>
      }
    </>
  )
}
