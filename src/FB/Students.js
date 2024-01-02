import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { Button, Input } from 'semantic-ui-react';

const firebaseConfig = {
  apiKey: "AIzaSyD5fdKt-aeJGVxa5lEZxuye4tSIZKkfy-0",
  authDomain: "newone-55b3f.firebaseapp.com",
  databaseURL: "https://newone-55b3f-default-rtdb.firebaseio.com",
  projectId: "newone-55b3f",
  storageBucket: "newone-55b3f.appspot.com",
  messagingSenderId: "269884942787",
  appId: "1:269884942787:web:32fcb04cbcd5e4e767b576"
};

export default function Students() {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)
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

    // const newPostKey = push(child(ref(db), 'students')).key
    // set(ref(db, '/students/' + newPostKey), { name, age })
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
