import React from 'react';


function Message({onClick, onChange, children}) {

 

  return (
    <div >
      <input placeholder="your message..." onChange={onChange}/>
      <button onClick={onClick}>Send message</button>
      <h1>Message: </h1>
      <h5>{children}</h5>
    </div>
  )
}

export default Message
