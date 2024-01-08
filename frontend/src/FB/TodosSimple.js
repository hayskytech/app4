import React, { useEffect, useState } from 'react'
import { db } from './conf'
import {
  Button, Icon, Input, List, Modal, ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions
} from 'semantic-ui-react'
import { onValue, push, ref, set } from 'firebase/database'

export default function TodosSimple() {
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [editText, setEditText] = useState('')
  const [editKey, setEditKey] = useState(null)
  const [data, setData] = useState(null)
  const todoRef = ref(db, 'todos')

  useEffect(() => {
    onValue(todoRef, (snapshot) => {
      const res = snapshot.val();
      setData(res)
      const newData = Object.entries(res)
      setList(newData);
    })
  }, [])

  function addItem() {
    if (text === '') return
    const newKey = push(todoRef)
    set(newKey, text)
    setText('')
  }
  function deleteItem(key) {
    set(ref(db, '/todos/' + key), null)
  }
  function editItem(key) {
    setEditText(data[key])
    setEditKey(key)
    setOpen(true)
  }
  function saveItem() {
    set(ref(db, '/todos/' + editKey), editText)
    setOpen(false)
    setEditText('')
    setEditKey(null)
  }
  return (
    <div>
      <Input
        label='Todo'
        icon={<Button onClick={addItem}>ADD</Button>}
        // icon={<Icon name="plus" circular />}
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <ModalHeader>Edit</ModalHeader>
        <ModalContent>
          <ModalDescription>
            <Input fluid value={editText} onChange={e => setEditText(e.target.value)} />
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button color='black' onClick={() => setOpen(false)}>Close</Button>
          <Button color='green' onClick={saveItem} >Submit</Button>
        </ModalActions>
      </Modal>

      <List>
        {list.map((item) => (
          <List.Item>
            <List.Content floated='right'>
              <Button color='blue' onClick={() => editItem(item[0])}>Edit</Button>
              <Button color='red' onClick={() => deleteItem(item[0])}>Delete</Button>
            </List.Content>
            <List.Content>{item[1]}</List.Content>


          </List.Item>
        ))}
      </List>
    </div>
  )
}
