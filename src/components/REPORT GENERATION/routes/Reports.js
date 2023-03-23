import "./Reports.style.css"
import { useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    username: 'default',
    email: 'default@gmail.com',
    TypeProject: 'Project X',
    TypeReport: 'Report01',
    // languages: ['html'],
  })

  const onChangeHandler = (event) => {

    console.log(event)
    if (event.target.name === 'languages') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.languages.push(event.target.value)
      } else {
        copy.languages = copy.languages.filter(el => el !== event.target.value)
      }

      setFormData(copy)

    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formData)
  }
  return (
    
    <div className="App">
      <div className='texr01'>
        <h1>Report Genaration</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">User Name</label>
          <input className="form-control" name="username" onChange={onChangeHandler} value={formData.username} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input className="form-control" name="email" onChange={onChangeHandler} value={formData.email} />
        </div>
        <div className="form-group">
          <label htmlFor="TypeProject" className="form-label">Project Name</label>
          <select className="form-select" name="TypeProject" onChange={onChangeHandler} value={formData.TypeProject}>
            <option value="project01">Project X</option>
            <option value="project02">Project Y</option>
            <option value="project03">Project Z</option> 
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="TypeReport" className="form-label">Report Type</label>
          <div>
            <div>
              <input type="radio" name="TypeReport" value="Report01" onChange={onChangeHandler} checked={formData.TypeReport === 'Report01'} />
              <label htmlFor="Report01">Current Report</label>
            </div>
            <div>
              <input type="radio" name="TypeReport" value="Report02" onChange={onChangeHandler} checked={formData.TypeReport === 'Report02'} />
              <label htmlFor="Report01">Full Report</label>
            </div>
            {/* <div>
              <input type="radio" name="TypeReport" value="other" onChange={onChangeHandler} checked={formData.TypeReport === 'other'} />
              <label htmlFor="other">Other</label>
            </div> */}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">Languages</label>
          {/* <div>
            <div>
              <input type="checkbox" name="languages" value="html" onChange={onChangeHandler} checked={formData.languages.indexOf('html') !== -1} />
              <label htmlFor="html">HTML</label>
            </div>
            <div>
              <input type="checkbox" name="languages" value="css" onChange={onChangeHandler} checked={formData.languages.indexOf('css') !== -1} />
              <label htmlFor="css">CSS</label>
            </div>
            <div>
              <input type="checkbox" name="languages" value="javascript" onChange={onChangeHandler} checked={formData.languages.indexOf('javascript') !== -1} />
              <label htmlFor="javascript">Javascript</label>
            </div>
          </div> */}
        </div>
        <div className="form-group">
          <button className="btn" type="submit" >Genarate Report</button>
        </div>
      </form>
    </div>
  );
}

export default App;
