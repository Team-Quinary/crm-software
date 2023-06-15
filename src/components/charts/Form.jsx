import React , {useState, useReducer} from 'react'
import './Form.css';

const formReducer = (state, event) => {
 return {
   ...state,
    [event.name]: event.value
 }
}

function Form() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

   const handleSubmit = event => {
   event.preventDefault();
   setSubmitting(true);
   setTimeout(() =>{
    setSubmitting(false);
   },3000)

 }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
     value: isCheckbox ? event.target.checked : event.target.value,
    });
  }

  return(
    <div className="wrapper">
      <h5> Monthly Customer Feedback Survey Generation Form</h5>
      {submitting && 
        <div>You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
        </div>}
      <form onSubmit={handleSubmit}>


        <fieldset>
          <label>
            <p className='tag'>1.Company Name</p>
            <input name="name" onChange={handleChange} />
          </label>
        </fieldset>



        <fieldset>
         <label>
           <p className='tag'>2.Indicate your level of satisfaction with our product/service</p>
           <select name="satisfaction" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="Very_Dissatisfied">Very Dissatisfied</option>
               <option value="Dissatisfied">Dissatisfied</option>
               <option value="Neutral">Neutral</option>
               <option value="Satisfied">Satisfied</option>
               <option value="Very_Satisfied">Very Satisfied</option>
           </select>
         </label>
         </fieldset>


         <fieldset>
         <label>
            <p className='tag'>3.On a scale of 1 to 5, please rate the service you received</p>
           <select name="rate" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
           </select>
         </label>
         </fieldset>

            <fieldset>
            <label>
           <p className='tag'>4.Overall satisfaction with the survey process</p>
           <input type="checkbox" name="gift-wrap" onChange={handleChange} />
         </label>
         </fieldset>


        
       

        <div className='sub_button'>
            <button type="submit">Submit</button>
        </div>
        
      </form>
    </div>
  )
}

export default Form

