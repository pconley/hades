import React from "react"
import uuid from "uuid"
import UserCard from './components/UserCard';

const Users = props => {
 
  const users = [
    { id: uuid.v4(), name: "Pat", email: 'pconley312@gmail.com', rating: 50 },
    { id: uuid.v4(), name: "Tim", email: 'tconley1428@gmail.com', rating: 100 },
    { id: uuid.v4(), name: "Other", email: 'other@gmail.com', rating: 20 },
  ]

  return (
    <div>
      <h2 className="header">Users</h2>
      <div className="card-group">
        {users.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  )
}

export default Users
