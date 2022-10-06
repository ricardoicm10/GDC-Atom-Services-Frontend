import React ,{ useState } from "react"
import FormInput from "../../common/FormInput/FormInput"
import NavBar from "../../common/Navbar/Navbar"
import "./Results.css"

function Results(){
    const [file,setFile] = useState()
    const [values,setValues] = useState({
        config:"",
        file:""
    })
   const inputs = [
    {
        id:1,
        type:"file",
        name:"file",
        label:"file",
        errorMessage:"Add file",
        required:true,
        accept:".xlsx, .csv"
       },
       {
        id:2,
        name:"config",
        select:true,
        label:"config",
        options:["Basic","Run 2 Run"],
        errorMessage:"Enter option",
        required:"true"
       }  
   ] 

   const onChange = (e) => {
        if(e.target.name === "file"){
            setFile(e.target.files[0])
        }
        setValues({...values,[e.target.name]:e.target.value})
   }

   const handleSubmit = (e) => {
    e.preventDefault()
  
}

    return(
        <div className="Results">
            <NavBar/>
            <div className="content">
                <form nSubmit={handleSubmit}>
                    {inputs.map((input)=>(
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                    ))}
                    <button className="btn-submit">Get results</button>
                </form> 
            </div>
        </div>
    )
}

export default Results