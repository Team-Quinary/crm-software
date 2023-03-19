import React from "react";
import FormHeader from "./FormHeader";
import Question_Form from "./Question_Form";
import CenterTabs from "./Tabs";
import QuestionUi from "./Test";
function Forms(){
    return(
        <div>
            <FormHeader/>
          <CenterTabs/>
          <Question_Form/>
        </div>
    );
}

export default Forms;