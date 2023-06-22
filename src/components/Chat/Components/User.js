import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import img from '../Images/avatar.png'

const User = ({user,selectuser,user1,userName})=> {
  const user2 = user?.uid;
  const [data,setData] = useState('')
  useEffect(()=>{
    const userId = user1 > user2 ? `${user1+user2}` : `${user2+user1}`
    let unsub = onSnapshot(doc(db,'LastMsg',userId), (doc) =>{
      console.log(userId)
      setData(doc.data())
    });
    return () => unsub() 
   },[])
  return (
    <div className={`user_wrapper ${userName.name === user.name? 'selected_user':""}`} onClick={() => selectuser(user)}>
        <div className='user_info'>
            <div className='user_detail'>
                <img src={img} alt="avatar" className='avatar'/>
                <h4>{user.name}</h4>
                {data?.from !== user1 && data?.unread && (
                  <small className='unread'>New</small>
                )}
            </div>
            <div className={`user_status ${user.isOnline ? 'online':'offline'}`}>

            </div>
        </div>
        {data && (
          <>
              <p className='truncate'>
              <strong>{data.from === user1 ? "Me:":null}</strong>
              {data.text}</p>
          </>
              )}
    </div>
  )
}

export default User