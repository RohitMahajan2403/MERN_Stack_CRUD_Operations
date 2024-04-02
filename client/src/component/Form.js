import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const Form = ({handleSubmit,handleOnchange,handleClose,rest}) => {
    return (
        <div className="addContainer">
          
        <form onSubmit={handleSubmit}>
          <div className="close-btn" onClick={handleClose}>
            <MdClose/>
          </div>

          <label  htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" onChange={handleOnchange} value={rest.name}/>
          
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" onChange={handleOnchange} value={rest.email}/>
          
          <label htmlFor="mobile">Mobile No. : </label>
          <input type="number" id="mobile" name="mobile" onChange={handleOnchange} value={rest.mobile} />
          
          <button className="btn" type="submit" >Submit</button>
        </form>

      </div>
    )
}

export default Form
