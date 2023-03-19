import React from "react";
import Header from './Header';
import MainBody from './MainBody';
import Template from './Template'

function Home(){
    return(
        <div>
            <Header/>
            <Template/>
            <MainBody/>  
        </div>
    );
}
export default Home;