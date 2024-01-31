import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from './conf'
import { onValue, push, ref, set } from 'firebase/database'
import { MyContext } from '../App'
import { Button, Input, List, Modal, ModalHeader, ModalDescription, ModalContent, ModalActions } from 'semantic-ui-react'
import { signOut } from 'firebase/auth'

export default function MyTodoList() {
  const { user } = useContext(MyContext)
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [editText, setEditText] = useState('')
  const [editKey, setEditKey] = useState(null)
  const [list, setList] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    if (user) {
      onValue(ref(db, 'mytodos/' + user?.uid),
        (snapshot) => {
          const res = snapshot.val();
          let newData = []
          if (res) {
            setData(res)
            newData = Object.entries(res)
          } else {
            console.log('No data found');
          }
          setList(newData);
        }
      )
    }
  }, [user])

  function addItem() {
    const newKey = push(ref(db, 'mytodos/' + user?.uid))
    set(newKey, text)
    setText('')
  }
  function deleteItem(key) {
    set(ref(db, `mytodos/${user?.uid}/${key}`), null)
    // set(ref(db, 'mytodos/' + user?.uid + '/' + key), null)
  }
  function editItem(key) {
    setEditText(data[key])
    setEditKey(key)
    setOpen(true)
  }
  function saveItem() {
    set(ref(db, `mytodos/${user?.uid}/${editKey}`), editText)
    setOpen(false)
    setEditText('')
    setEditKey(null)
  }
  function doLogout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
    });

  }
  return (
    <div>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={addItem}>Add</Button>
      <Button color='red' onClick={doLogout}>Logout</Button>
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

      <hr />

      <List>
        {list.map((item) =>
          <List.Item>
            <List.Content floated='right'>
              <Button color='blue' onClick={() => editItem(item[0])}>Edit</Button>
              <Button color='red' onClick={() => deleteItem(item[0])}>Delete</Button>
            </List.Content>
            <List.Content>{item[1]}</List.Content>


          </List.Item>
        )}
      </List>
    </div>
  )
}
