import {createContext,useState,useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Loading from '../Components/Loading';

export const AuthContext = createContext();

const AuthProvider = ({ children })=>{
    const [user,setuser] = useState(null);
    const [loading,setloading] = useState(true);

    useEffect(()=>{
        onAuthStateChanged(auth,(users)=>{
            setuser(users);
            setloading(false)
        });
    },[]);


    if(loading){
        return <Loading/>;
    }    
  return <AuthContext.Provider value={{ user }}> {children} </AuthContext.Provider>
};

export default AuthProvider;
