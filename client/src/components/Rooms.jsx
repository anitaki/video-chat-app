import React from 'react'

function Rooms({onClick, onChange}) {
  return (
    <div>
      <input placeholder="Room Number..." onChange={onChange}/>
      <button onClick={onClick}>Join Room</button>
    </div>
  )
}

export default Rooms