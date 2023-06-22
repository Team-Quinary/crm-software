import React,{useContext} from "react";  
import { Link, Navigate } from "react-router-dom";
import {auth, db} from '../firebase';
import { signOut } from "firebase/auth";
import { updateDoc,doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const Navigate = useNavigate()
    const {user} = useContext(AuthContext);
    const handleSignOut = async () =>{
        
        await updateDoc(doc(db,'user',auth.currentUser.uid),{
            isOnline:false,
        });
        await signOut(auth);
        Navigate("/login")
    };
    return(
        <nav>
            <h3>
                <Link to="/">Messenger</Link>
            </h3>
            <div>
            {user ? (
                <>
                {/* <h2>{auth.currentUser.name}</h2> */}
                <Link to="/profile">Profile</Link>
                <button className="btn" onClick={handleSignOut}>Log out</button>
                
                </>
            ):(
                <>
                 <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                
                
                </>
            ) }
            

            </div>
        </nav>
    );
}

export default Navbar;