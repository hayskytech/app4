import React, { useContext } from 'react'
import { MyContext } from '../App'

export default function Account() {
  const { user } = useContext(MyContext)
  return (
    <div>
      {user?.phoneNumber}
    </div>
  )
}
