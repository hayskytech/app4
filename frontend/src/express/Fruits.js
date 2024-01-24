import React, { useEffect, useState } from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
  FormField,
  Form,
  List,
  Container,
} from 'semantic-ui-react'

export default function Fruits() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [editId, setEditId] = useState(null)
  const [box, setBox] = useState(false)
  const [box2, setBox2] = useState(false)


  useEffect(() => {
    getItems()
  }, [refresh])

  async function getItems() {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let response = await fetch("http://localhost:4000/api/fruits/", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    setList(data);

  }

  async function addItem() {
    if (name === '' || price === '') {
      return
    }
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "name": name,
      "price": price
    });

    let response = await fetch("http://localhost:4000/api/fruits/", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    setName('')
    setPrice('')
    setRefresh(!refresh)
    setBox(false)
  }

  async function deleteItem(id) {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let response = await fetch("http://localhost:4000/api/fruits/" + id, {
      method: "DELETE",
      headers: headersList
    });

    let data = await response.text();
    console.log(data);
    setRefresh(!refresh)
  }

  async function editItem(id) {
    setBox(true)
    setEditId(id)
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }
    let response = await fetch("http://localhost:4000/api/fruits/" + id, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    setName(data[0].name);
    setPrice(data[0].price);

  }

  async function saveItem() {
    if (name === '' || price === '') {
      return
    }
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "name": name,
      "price": price
    });

    let response = await fetch("http://localhost:4000/api/fruits/" + editId, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.text();
    console.log(data);
    setName('')
    setPrice('')
    setRefresh(!refresh)
    setBox(false)
  }

  function closeBox() {
    setBox(false)
    setName('')
    setPrice('')
    setEditId(null)
  }

  async function deleteAllItems() {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let response = await fetch("http://localhost:4000/api/fruits/", {
      method: "DELETE",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    setBox2(false)
    setRefresh(!refresh)

  }

  return (
    <div>
      <Container>
        <Button onClick={() => setBox(true)} color='green'>ADD NEW</Button>
        <Button onClick={() => setBox2(true)} color='red'>Delete All</Button>
        <Modal
          size='mini'
          open={box}
          onOpen={() => setBox(true)}
          onClose={closeBox}
          closeIcon
        >
          <Modal.Header>Add New Fruit</Modal.Header>
          <Modal.Content>
            <Form>
              <FormField>
                <label>Fruit Name:</label>
                <input value={name} onChange={e => setName(e.target.value)} />
              </FormField>

              <FormField>
                <label>Price</label>
                <input value={price} onChange={e => setPrice(e.target.value)} />
              </FormField>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {editId ?
              <Button onClick={saveItem} color='blue'>Save</Button>
              :
              <Button onClick={addItem} color='green'>ADD</Button>
            }
          </Modal.Actions>
        </Modal>

        <Modal
          open={box2}
          onOpen={() => setBox2(true)}
          onClose={() => setBox2(false)}
        >
          <Modal.Header>Do you want to delete all?</Modal.Header>
          <Modal.Actions>
            <Button color='red' onClick={deleteAllItems}>Delete All</Button>
            <Button onClick={() => setBox2(false)}>No</Button>
          </Modal.Actions>
        </Modal>

        <hr />

        <List divided verticalAlign='middle'>
          {
            list.map((item) =>

              <List.Item>

                <List.Content floated='right'>
                  <Button color='red' onClick={() => deleteItem(item.id)}>Delete</Button>
                  <Button color='blue' onClick={() => editItem(item.id)}>Edit</Button>
                </List.Content>


                <List.Content>{item.name} - {item.price} -</List.Content>
              </List.Item>



            )
          }
        </List>
      </Container>
    </div>
  )
}
