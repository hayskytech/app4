import React, { useState } from 'react'
import { Button, Form, Input, List } from 'semantic-ui-react'

export default function TodoList2() {
  let oldData = []
  if (localStorage.getItem('todos')) {
    oldData = JSON.parse(localStorage.getItem('todos'))
  }
  const [list, setList] = useState(oldData)
  const [text, setText] = useState('')

  function addItem(e) {
    e.preventDefault() // to avoid page reload

    if (text === '') return
    let newList = [...list]
    newList.push(text)
    setList(newList)
    localStorage.setItem('todos', JSON.stringify(newList))
    setText('')
  }
  function deleteItem(index) {
    let newList = [...list]
    newList.splice(index, 1)
    setList(newList)
    localStorage.setItem('todos', JSON.stringify(newList))
  }
  function deleteAll() {
    setList([])
    localStorage.setItem('todos', JSON.stringify([]))
  }

  return (
    <div>

      <form onSubmit={addItem}>

        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button color='blue'>ADD</Button>
      </form>

      <Button color='red' onClick={deleteAll}>Delete All</Button>

      <List divided verticalAlign='middle' style={{ padding: 20 }}>

        {list.map((item, index) => (
          <List.Item>
            <List.Content floated='right'>
              <Button onClick={() => deleteItem(index)}>Delete</Button>
            </List.Content>
            <List.Content>{item}</List.Content>
          </List.Item>
        ))}

      </List>
    </div>
  )
}
