import React, { useEffect, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'

export default function TodoListBasic() {
  let oldData = []
  if (localStorage.getItem('myData')) {
    oldData = JSON.parse(localStorage.getItem('myData'))
  }

  const [list, setList] = useState(oldData)
  const [text, setText] = useState('')

  function addItem() {
    if (text === '') return
    let newList = [...list]
    newList.push(text)
    setList(newList)
    localStorage.setItem('myData', JSON.stringify(newList))
    setText('')
  }
  return (
    <div>
      <h3>Todo List</h3>

      <Input type="text"
        label="Item"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button onClick={addItem}>ADD</Button>

      <ul>
        {list.map((item) => (<li>{item}</li>))}
      </ul>
    </div>
  )
}
