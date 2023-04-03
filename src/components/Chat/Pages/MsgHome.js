import React,{useEffect, useState} from "react";
import { db,auth } from '../../../firebase';
import { collection,query,where,onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import User from "../Components/User";
import MessageForm from "../Components/MessageForm";
import Message from "../Components/Message";
function MsgHome(){
    const [users,setusers] = useState([])
    const [userName,setUserName] = useState("")
    const [text,setText] = useState("");
    const [msgs,setMsgs] = useState([])

    const user1 = auth.currentUser.uid
    useEffect(()=>{
     //create query object
     const q = query(collection(db,"user"),where("uid", "not-in",[auth.currentUser.uid] ))
   
     //execute query
     const unsub = onSnapshot(q,querySnapshot=>{
        let users = []
        querySnapshot.forEach(doc =>{
            users.push(doc.data())
        });
        setusers(users);
     });
     return () => unsub();
    
 },[])
    

    const selectUser = async (user) =>{
        setUserName(user)
        
        const user2 = user.uid
        const userId = user1 > user2 ? `${user1+user2}` : `${user2+user1}`
        
        const msgsRef = collection(db,'messages',userId,'chat')
        const q = query(collection(db,'messages',userId,'chat'),orderBy('CreatedAt','asc'))
        
        onSnapshot(q, querySnapshot => {
            let Msgs = [];
            querySnapshot.forEach(doc => {
              Msgs.push(doc.data());
            });
            setMsgs(Msgs)
            console.log(msgs)
        },
        error=>{
            console.log("hello")
        })

        const docSnap = await getDoc(doc(db,'LastMsg',userId));
        if(docSnap.data() && docSnap.data()?.from !== user1){
            await updateDoc(doc(db,'LastMsg',userId),{unread:false});
        }

    
    };
    
    const handleSubmit = async e =>{
        e.preventDefault();
        
        const user2 = userName.uid;
        const userId = user1 > user2 ? `${user1+user2}` : `${user2+user1}`
        await addDoc(collection(db,'messages',userId,'chat'),{
            text,
            from:user1,
            to:user2,
            CreatedAt:Timestamp.fromDate(new Date())
        })

        await setDoc(doc(db,'LastMsg',userId),{
            text,
            from:user1,
            to:user2,
            CreatedAt:Timestamp.fromDate(new Date()),
            unread:true,
        })
        setText("")
       

    }
    return(
    <div className="home_container">
        <div className="users_container">
            {users.map((user) => (<User key={user.id} user={user} selectuser={selectUser} user1={user1} userName={userName}/>))}
            
        </div>
        <div className="messages_container">
            
            {userName? 
            <>
            <div className="messages_user">
                <h3>{userName.name}</h3>
                </div>
                <div className="messages">
                    {msgs.length ? msgs.map((msg,i) => <Message key={i} msg={msg} user1={user1}/>): ""}
                    </div>
                <div>
                    <MessageForm handleSubmit={handleSubmit} text={text} setText = {setText}/>
                    </div>
              </>  :
            <h3 className="no_conv">Select a User to chat</h3>}

            
        </div>
    </div>    
    );
}

export default MsgHome;