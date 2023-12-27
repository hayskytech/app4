import React, { useEffect, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default function NewsAPI2() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const data = {
      _fields: 'id,title,date',
      // offset: 0,
      offset: offset,
      per_page: 10
    }
    const str = new URLSearchParams(data).toString()
    setLoading(true) // loading ON
    fetch('https://dharshininews.com/wp-json/wp/v2/posts?' + str)
      .then(res => res.json())
      .then(json => {
        setList(json);
        setLoading(false) // loading OFF
      })

  }, [offset])

  function showNext() {
    if (offset >= 50) {
      return
    }
    setOffset(offset + 10)
  }
  function showPrev() {
    if (offset <= 0) return
    setOffset(offset - 10)
  }

  return (
    <div>
      <div>
        <button>sadid</button>
        <Button primary>Hello</Button>
        <Button color='red'>Hello</Button>
        <Button inverted color='red'>Hello</Button>
        <hr />
        <Button color='facebook' size='large'>
          <Icon name='facebook' /> Facebook
        </Button>

        <Button color='twitter' size='huge'>
          <Icon name='twitter' /> Twitter
        </Button>


        <Button color='google plus'>
          <Icon name='google plus' /> Google Plus
        </Button>
      </div>
      <hr />

      Offset: {offset} <br />


      {offset > 0 && <Button onClick={showPrev}>Previous</Button>}
      {offset < 50 && <Button onClick={showNext}>Next</Button>}


      {
        loading ?
          <Icon name='spinner' size='big' loading />
          :
          <ol>
            {
              list.map((item) =>
                <li style={{ fontSize: 20, margin: 10 }}>{item.title.rendered}</li>
              )
            }
          </ol>
      }
    </div>
  )
}
