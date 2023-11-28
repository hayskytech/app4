import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Input, List } from 'semantic-ui-react'

export default function TodoLocal() {
  let oldData = []
  if (localStorage.getItem('myData')) {
    oldData = JSON.parse(localStorage.getItem('myData'))
  }
  const [text, setText] = useState('')
  const [list, setList] = useState(oldData)

  function addItem(e) {
    e.preventDefault()
    if (text === '') return
    const newList = list.concat(text)
    setList(newList)
    setText('')
  }

  function deleteAll(e) {
    e.preventDefault()
    const newList = []
    setList(newList)
  }

  function deleteOne(index) {
    let newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(list))
  }, [list])

  return (
    <div>

      <form onSubmit={addItem}>
        <Input type="text"
          placeholder='Todo Item:'
          value={text}
          onChange={(e) => { setText(e.target.value) }}
        />{` `}
        <Button color='green' icon='plus'></Button>
        <Button color='red' onClick={deleteAll}>Clear All</Button>
      </form>

      <List divided verticalAlign='middle'>

        {list.map((item, index) => {
          return (
            <List.Item key={index}>
              <List.Content floated='right'>
                <Button
                  color='red'
                  icon='close'
                  onClick={() => deleteOne(index)}
                ></Button>
              </List.Content>
              <List.Content>
                <List.Header>{item}</List.Header>
              </List.Content>
            </List.Item>)
        })}

      </List>
    </div>
  )
}
