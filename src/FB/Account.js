import React, { useContext } from 'react'
import { MyContext } from '../App'

export default function Account() {
  const { user } = useContext(MyContext)
  console.log(user);
  return (
    <div>
      hai
    </div>
  )
}
