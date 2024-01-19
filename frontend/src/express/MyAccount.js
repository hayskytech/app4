import React, { useContext, useState } from 'react'
import { MyContext } from '../App'
import { Button, Container, Form, Input } from 'semantic-ui-react'

export default function MyAccount() {
  const { token, setToken } = useContext(MyContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function doLogin() {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "username": username,
      "password": password
    });

    let response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.text();
    console.log(data);
    localStorage.setItem('token', JSON.stringify(data));
    setToken(data)
  }

  function doLogout() {
    setToken(null)
    localStorage.setItem('token', '');
  }

  return (
    <Container>
      {token ?
        <>
          User is logged in
          <Button onClick={doLogout}>Logout</Button>
        </>
        :
        <>
          <h2>Login Form</h2>
          <Form>
            <Form.Input label="Username"
              value={username} onChange={e => setUsername(e.target.value)} />
            <Form.Input label="Password" type='password'
              value={password} onChange={e => setPassword(e.target.value)} />
            <Button color='blue' onClick={doLogin}>Login</Button>
          </Form>
        </>
      }

    </Container>
  )
}
