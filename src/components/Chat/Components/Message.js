import React, { useEffect, useRef } from 'react'
import Moment from 'react-moment';


function Message({msg, user1}) {
  const scrollRef = useRef();

  useEffect(()=>{

    scrollRef.current?.scrollIntoView({ behaviour : "smooth"});
  },[msg])
  return (
    <div className={`message_wrapper ${msg.from == user1 ? "own" : ""}`} ref={scrollRef}>
   <p className={msg.from == user1 ? "me":"friend"}> {msg.text}</p>
   <br/>
   <small>
    <Moment fromNow>{msg.CreatedAt.toDate()}</Moment>
   </small>
   </div>
  )
}

export default Message;