import React from 'react';

export default function Users({ users }) {
  console.log('users', users);
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <h4>{user.username}</h4>
          <div className="imageBox">
            <img src={user.avatar} alt="User Avatar" />
          </div>
        </div>
      ))}
    </>
  );
}
