import React, { useEffect, useState } from 'react'
import { Button, Input, Form, List, Container, Modal } from 'semantic-ui-react'

export default function Students() {
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [refresh, setRefresh] = useState(true)
  const [box, setBox] = useState(false)
  const [conf, setConf] = useState(false)
  const [editId, setEditId] = useState(null)

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  // getting all students from DB
  useEffect(() => {
    // console.log('loading...');
    fetch('http://localhost:4000/students')
      .then(res => res.json())
      .then(json => setList(json))
  }, [refresh])

  function addItem(e) {
    e.preventDefault()

    let bodyContent = JSON.stringify({
      "name": name,
      "phone": phone
    });

    fetch("http://localhost:4000/students/", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setName('')
        setPhone('')
        setRefresh(!refresh)
        setBox(false)
      })

  }

  function deleteItem(id) {
    fetch("http://localhost:4000/students/" + id, {
      method: "DELETE",
      headers: headersList
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setRefresh(!refresh)
      })
  }
  function deleteAll() {
    fetch("http://localhost:4000/students/", {
      method: "DELETE",
      headers: headersList
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setRefresh(!refresh)
        setConf(false)
      })
  }

  async function editItem(id) {

    setEditId(id)
    let response = await fetch("http://localhost:4000/students/" + id, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    setName(data.name)
    setPhone(data.phone)
    setBox(true)

  }

  async function saveItem() {

    let bodyContent = JSON.stringify({
      "name": name,
      "phone": phone
    });

    let response = await fetch("http://localhost:4000/students/" + editId, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.text();
    console.log(data);
    setBox(false)
    setRefresh(!refresh)
    setName('')
    setPhone('')

  }

  return (
    <Container>
      <h3>Students</h3>
      {/* <h3>{refresh ? 'true' : 'false'}</h3> */}
      <Modal
        open={box}
        onOpen={() => setBox(true)}
        onClose={() => setBox(false)}
        closeIcon
      >
        <Modal.Content>
          <Form onSubmit={editId ? saveItem : addItem}>
            <Input label="Name" type='text' value={name} onChange={e => setName(e.target.value)} />
            <br />

            <Input label='Phone' type='text' value={phone} onChange={e => setPhone(e.target.value)} />
            <br />
            <Button color='blue'>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Modal
        open={conf}
        onOpen={() => setConf(true)}
        onClose={() => setConf(false)}
        closeIcon
        size='mini'
      >
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Actions>
          <Button color='red' onClick={deleteAll}>Delete</Button>
          <Button color='black' onClick={() => setConf(false)}>Cancel</Button>
        </Modal.Actions>
      </Modal>

      <Button color='green' onClick={() => setBox(true)}>Add</Button>
      <Button color='red' onClick={() => setConf(true)}>Delete All</Button>

      <List divided verticalAlign='middle'>
        {
          list.map((item) =>
            <List.Item>
              <List.Content floated='right'>
                <Button color='blue' onClick={() => editItem(item.id)}>Edit</Button>
                <Button color='red' onClick={() => deleteItem(item.id)}>Delete</Button>
              </List.Content>
              <List.Content>{item.name}</List.Content>
              <List.Content>{item.phone}</List.Content>
            </List.Item>
          )
        }
      </List>



    </Container>
  )
}
