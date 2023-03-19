import React, { useState } from "react";

import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BsTrash} from 'react-icons/bs';
import { IconButton, MenuItem, Typography } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import {BsFileText} from 'react-icons/bs';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import {FcRightUp} from 'react-icons/fc';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RadioIcon from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"
import  DragIndicatorIcon  from "@material-ui/icons/DragIndicator";
import './Question_Form.css';

function Question_form(){
    const [questions,setQuestions] = useState(
        [{questionText:'What is the Capital of Sri Lanka?',
         questionType:'radio',
         options:[
            {optionText:"Kandy"},
            {optionText:"Colombo"},
            {optionText:"Jaffna"},
            {optionText:"Galle"},
         ],
         open:true,
         required:false
        }])
    
    function changeQuestion(text,i){
        var newQuestion=[...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        console.log(newQuestion);
    }    

    function addQuestionType(i,type){
        let newType=[...questions];
        newType[i].questionType = type;
        setQuestions(newType);
        console.log(type);
    }
    function changeOptionValue(value,i,j){
        var newValue =[...questions];
        newValue[i].options[j].optionText=value;
        setQuestions(newValue);
        console.log(value);
    }
    function removeoption(i,j){
        var remove=[...questions];
        if(remove[i].options.length>1){
            remove[i].options.splice(j,1);
            setQuestions(remove);
        }
    }
    function Add_option(i){
        var newOption=[...questions];
        if(newOption[i].options.length < 5){
            newOption[i].options.push({optionText:"Option "+(newOption[i].options.length + 1)})
            console.log("hello")
            
        }
        else{
            console.log("Max limit reached");
        }
        setQuestions(newOption)
        
    }
    function RequiredQues(i){
        var reqQues = [...questions];
        reqQues[i].required = !reqQues[i].required
        setQuestions(reqQues)

    }
    function copyQues(i){
        ExpandCLoseAll();
        let copyques=[... questions];
        var newques = copyques[i];
        setQuestions([...questions,newques]);
        console.log(...questions)

    }
    function deleteQues(i){
        let deleteques=[...questions];
      if(questions.length > 1){
        deleteques.splice(i,1)
      }
        setQuestions(deleteques)
    }
    function addQuestion_Field(){
        ExpandCLoseAll();
        setQuestions([...questions,{questionText:'Question Title',
        questionType:'radio',
        options:[
           {optionText:"Option 1"},
        ],
        open:true,
        required:false}]);
    }
    function onDragEnd(result){
        if(!result.destination){
            return;
        }
        var itemgg = [...questions];
        const itemF= reorder(
            itemgg,
            result.source.index,
            result.destination.index
        );
        setQuestions(itemF);
    }

    const reorder = (list,startIndex,endIndex)=>{
        const result = Array.from(list);
        const [removed] = removed.splice(startIndex,1);
        result.splice(endIndex,0,removed);
        return result;
    };
    function ExpandCLoseAll(){
        let qs=[...questions];
        for(let j=0;j<qs.length;j++){
            qs[j].open = false;
            console.log("in expandclose")
        }

        setQuestions(qs);
        console.log("in expandclose2")
    }
    function HandleExpand(i){
        let qs=[...questions];
        for(let j=0;j<qs.length;j++){
            if(i==j){
                qs[i].open = true;
            }
            else{
                qs[i].open = false;
            }
        }
        setQuestions(qs);
    }

    function QuestionUi(){
        return questions.map((ques,i)=>(
            <Draggable key={i} draggableId={i+'id'} index={i}>
                {(provided,snapshot)=>(
                    <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                        <div>
                            <div style={{marginBottom:"0px"}}>
                                <div style={{width:"100%",marginBottom:'0px'}}>
                                    <DragIndicatorIcon style={{transform:'rotate(-90deg)',color:'#DAE0E2',position:'relative',left:'300px'}}
                                    fontSize="small"/>
                                </div>
                                <div key={i}>
                <Accordion expanded={questions.open} onChange={()=>{HandleExpand(i)}} className ={questions[i].open ? 'add Border' : ""}>
                    
                    <AccordionSummary aria-controls="panella-content" id ="panella-header" elevation={1} style={{width:'100%'}}>
                    {questions[i].open?(

                        <div className="saved_questions">
                        <Typography style={{fontSize:'15px',fontWeight:'400',letterSpacing:'.1px',lineHeight:'24px',paddingBottom:'8px'}}>
                            {i+1}.{questions[i].questionText}</Typography>

                        {ques.options.map((op,j)=>(
                            <div key={j}>
                                <div style={{display:'flex'}}>
                                    <FormControlLabel 
                                    style={{marginLeft:'5px',marginBottom:'5px'}} 
                                    disabled control ={<input type={ques.questionType} 
                                    color="primary" style={{marginRight:'3px'}} 
                                    required={ques.type}/>}
                                    label={<Typography 
                                        style={{fontFamily:'Roboto,Arial,Sans-serif',
                                        fontSize:'13px',
                                        fontWeight:'400',
                                        letterSpacing:'.2px',
                                        lineHeight:'20px',
                                        color:'#202124'}}>
                                        {ques.options[j].optionText}
                                        </Typography>
                                        }/>
                                </div>
                                </div>
                        ))}
                        </div>
                    ):""}
                    </AccordionSummary>
                    {questions[i].open?(
                    <div className="Question_boxes">
                        <AccordionDetails className="add_questions">
                            <div className="add_question_top">
                                <input type="text" className="question" placeholder="Question" value={ques.questionText} 
                                onChange={(e)=>{changeQuestion(e.target.value,i)}} />
                                
                                <CropOriginalIcon style={{color:'#5f6368'}}/>
                                <Select className="select" style={{color:'#5f6368',fontSize:'130px'}}>
                                    <MenuItem id="text" Value="Text" onClick={()=>{addQuestionType(i,"text")}}> <SubjectIcon style={{marginRight:'10px'}} />Paragraph</MenuItem>
                                    <MenuItem id="checkbox" Value="Checkbox"  onClick={()=>{addQuestionType(i,"checkbox")}}> <CheckBoxIcon style={{marginRight:'10px',color:'#70757a'}}/>Checked</MenuItem> 
                                    <MenuItem id="radio" Value="Radio" onClick={()=>{addQuestionType(i,"Radio")}}> <RadioIcon style={{marginRight:'10px',color:'#70757a'}} />Multiple Choice</MenuItem>
                                </Select>
                                <p>hello</p>
                            </div>
                            {ques.options.map((op,j)=>(
                            <div className="add_question_body" key={j}> 
                                { (ques.questionType !== "Text")?
                                    <input type={ques.questionType} style={{marginRight:"10px",}} value="text"/>:
                                        <ShortTextIcon style={{marginRight:"10px"}}/>
                                        
                                }
                                <div>
                                    <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText} onChange={(e)=>{changeOptionValue(e.target.value,i,j)}}/><br/>
                                    
                                
                                </div> 

                                <CropOriginalIcon style={{color:"#5f6368"}}/>
                                <IconButton aria-label="delete">
                                    <CloseOutlinedIcon onClick={()=>{removeoption(i,j)}}/>
                                </IconButton>
                            </div>
                             ))} 
                            {ques.options.length <5 ?(
                                <div className="add_question_body">
                                    <FormControlLabel disabled control={
                                        (ques.questionType!="text")?
                                        <input type={ques.questionType} color="primary" inputprops={{'aria-label':'secondary checkbox'}}
                                            style={{marginLeft:'10px',marginRight:'10px'}} disabled/>:
                                            <ShortTextIcon style={{marginRight:'10px'}}/>
                                    } label={
                                        <div>
                                            <input type="text" className="text_input" style={{fontSize:'13px', width:'60px'}} placeholder="Add Other" readOnly/>
                                            <Button size="small" onClick={()=>{Add_option(i)}} style={{textTransform:'none',color:'#4285f4',fontSize:'13px',fontWeight:'600'}} >Add Option</Button>
                                            </div>
                                    }/>
                            
                                </div>
                            ):""}
                             
                            
                        <div className="question_edit">
                            <AddCircleOutlineIcon className="edit" onClick={()=>{addQuestion_Field()}}/>
                            <OndemandVideoIcon className="edit"/>
                            <CropOriginalIcon className="edit"/>
                            <TextFieldsIcon className="edit"/>
                        </div>
                        </AccordionDetails>
                        <div className="add_footer">
                            
                            <div className="add_question_bottom_left">
                                <Button size="small" style={{textTransform:'none',color:'#4285f4',fontSize:'13px',fontWeight:'600'}}>
                                    <FcRightUp style={{border:'2px solid #4285f4',padding:'2px',marginRight:'8px'}}/>Answer Key
                                </Button>
                            </div>
                            <div className="add_question_bottom">
                                <IconButton aria-label="copy" onClick={()=>{copyQues(i)}}>
                                    <FilterNoneIcon/>
                                </IconButton>
                                <IconButton aria-label="delete" onClick={()=>{deleteQues(i)}}>
                                    <BsTrash/>
                                </IconButton>
                                <span style={{color:'#5f6368',fontSize:'13px'}}>Required</span><Switch name ="checkedA" color="primary" checked="" onClick={()=>{RequiredQues(i)}}/> 
                                
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            </div>
                        </div>
                   
                    </div>
                   ):""} 
                </Accordion>
            </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
           
        ))
        
    }
    return(
        <div className="question_form">
            <br/>
            <div className="section">
                <div className="question_title_section">
                    <div className="question_form_top">
                    
                        <input type="text" className="question_form_top_name" style={{color:'black'}} placeholder="Untitled Document"/>
                        <input type="text" className="question_form_top_desc" placeholder="Form Description"/>
                        
                    </div>
                </div>
                <DragDropContext onDragEnd = {onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided,snapshot)=>(
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef} >
                            {QuestionUi()}
                            {provided.placeholder}
                        </div>
                    )}
                  </Droppable>
                </DragDropContext>
                
            </div>

        </div>
        );
}

export default Question_form;