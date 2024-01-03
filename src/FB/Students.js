import React, { useEffect, useState } from 'react'
import { ref, onValue, set, push } from "firebase/database";
import { Button, Input } from 'semantic-ui-react';
import { db } from './conf';

export default function Students() {
  const studentRef = ref(db, 'students');

  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      const newData = Object.entries(data)
      setList(newData);
    });
  }, [])

  function addItem() {
    const newKey = push(studentRef);
    set(newKey, { name, age });
  }

  return (
    <div>
      <Input value={name} onChange={e => setName(e.target.value)} />
      <Input value={age} onChange={e => setAge(e.target.value)} />
      <Button onClick={addItem}>ADD Student</Button>
      <ul>
        {
          list.map((item) => (<li>{item[1].name}</li>))
        }
      </ul>
    </div>
  )
}
