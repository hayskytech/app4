import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button } from 'semantic-ui-react'

export default function News() {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let url = 'https://telugunewsadda.com/wp-json/wp/v2/posts?'
    const data = {
      _fields: 'id,title',
      per_page: 10,
      offset: offset
    }
    const params = new URLSearchParams(data).toString()
    setLoading(true)
    fetch(url + params)
      .then(res => res.json())
      .then(json => {
        setlist(json)
        setLoading(false)
      })
  }, [offset, refresh])

  function nextBtn() {
    if (offset > 90) return
    setOffset(offset + 10)
  }
  function prevBtn() {
    if (offset < 10) return
    setOffset(offset - 10)
  }
  function homeBtn() {
    setOffset(0)
  }
  function refreshBtn() {
    setRefresh(!refresh)
  }

  return (
    <div>
      {/* {offset} */}
      {offset >= 10 && <Button onClick={prevBtn}>Previous</Button>}
      <Button onClick={homeBtn}>Home</Button>
      {offset <= 90 && <Button onClick={nextBtn}>Next</Button>}
      <Button onClick={refreshBtn}>Refresh</Button>
      <hr />
      <h3>Showing {offset + 1} to {offset + 10} news articles.</h3>
      {
        loading ? <progress /> :
          list.map((item) => {
            return (<li>{item.title.rendered}</li>)
          })
      }
    </div>
  )
}
